/**
 * PM2 监控脚本
 * 特点：支持多收件人、防邮件轰炸、兼容 Windows 路径、进程异常与退出双监控
 */
const pm2 = require('pm2');
const nodemailer = require('nodemailer');

const CONFIG = {
  // 邮件服务器配置 (以 QQ 邮箱为例)
  smtp: {
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
      user: '771734186@qq.com', // 你的发件人地址
      pass: 'wosabulncodbbaic', // 你的 SMTP 授权码
    },
  },
  // 收发件详情
  mail: {
    from: '"PM2 系统监控" <771734186@qq.com>',
    // 收件人列表，支持多个地址（英文逗号隔开）
    to: '771734186@qq.com,hwm@gzhtedu.cn',
    subjectPrefix: '【服务器告警】',
  },
  // 监控频率控制（毫秒）
  throttle: 60000, // 60秒内同一个进程只发一封报警邮件，防止死循环导致被封号
};

// 记录各进程上次告警时间
const notificationLog = {};
// 创建邮件发送器
const transporter = nodemailer.createTransport(CONFIG.smtp);
// 存储每个 App 的锁状态
const lockStatus = {};

function shouldNotify(appName) {
  const now = Date.now();
  const lastTime = notificationLog[appName] || 0;

  if (now - lastTime < CONFIG.throttle) {
    return false;
  }

  // 集群并发锁：如果当前已经在处理该 App 的发送任务，直接拦截
  if (lockStatus[appName]) {
    return false;
  }
  lockStatus[appName] = true;

  setTimeout(() => {
    lockStatus[appName] = false;
  }, 1000 * 20);

  return true;
}

/**
 * 邮件发送函数
 */
async function sendAlert(subject, appName, message) {
  const now = Date.now();

  // 防轰炸校验
  if (!shouldNotify(appName)) {
    console.log(`[已跳过] 进程 ${appName} 告警过于频繁，仍在节流期内。`);
    return;
  }

  const mailOptions = {
    from: CONFIG.mail.from,
    to: CONFIG.mail.to,
    subject: `${CONFIG.mail.subjectPrefix}${subject} - [${appName}]`,
    html: `
        <div style="font-family: sans-serif; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
            <h2 style="color: #d9534f; border-bottom: 2px solid #d9534f; padding-bottom: 10px;">PM2 进程状态异常告警</h2>
            <p><strong>异常程序：</strong> <span style="color: #000;">${appName}</span></p>
            <p><strong>异常类型：</strong> <span style="color: #d9534f;">${subject}</span></p>
            <p><strong>详细信息：</strong></p>
            <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #ccc; font-family: monospace; white-space: pre-wrap;">${message}</div>
            <hr style="margin-top: 20px; border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #888;">
                报警时间：${new Date().toLocaleString()}<br/>
                监控平台：Node.js 服务器
            </p>
        </div>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    notificationLog[appName] = now;
    console.log(`[发送成功] 已向收件人发送关于 ${appName} 的告警。`);
  } catch (err) {
    console.error(`[邮件发送失败 ${new Date().toLocaleString()}]`, err);
  }
}

// 启动 PM2 监听
pm2.connect((err) => {
  if (err) {
    console.error('无法连接 PM2 守护进程:', err);
    process.exit(2);
  }

  console.log('✅ PM2 监控脚本已连接。正在持续监听进程事件...');

  pm2.launchBus((err, bus) => {
    if (err) return console.error('监听总线失败:', err);

    // 1. 监听未捕获的运行时异常
    bus.on('process:exception', (data) => {
      const appName = data.process.name;
      const errorMsg =
        data.data && data.data.message ? data.data.message : '具体错误请查看 PM2 日志';
      sendAlert('运行时崩溃 (Exception)', appName, errorMsg);
    });

    // 2. 监听进程状态事件 (exit 表示进程停止运行)
    bus.on('process:event', (data) => {
      const appName = data.process.name;
      const pmId = data.process.pm_id; //实例ID
      const event = data.event;

      console.log(
        `[日志${new Date().toLocaleString()}] 进程 ${appName} (实例ID: ${pmId}) 触发事件: ${event}`,
      );

      // 过滤：只有该脚本本身以外的进程才报警
      if (appName === 'pm2-monitor') return;

      if (event === 'exit') {
        sendAlert(
          '进程意外停止 (Exit)',
          appName,
          `系统检测到进程已停止运行，请确认是否为正常下线。`,
        );
      }
      if (event === 'restart') {
        console.log(
          `[日志${new Date().toLocaleString()}] 进程 ${appName} (实例ID: ${pmId}) 正在重启...`,
        );
      }
    });
  });
});
