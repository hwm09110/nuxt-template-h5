module.exports = {
  apps: [
    {
      name: 'HT-OS-PC',
      exec_mode: 'cluster', // 开启集群模式
      instances: 'max', // 利用所有 CPU 核心
      // script: '/opt/htweb/static/ht-official-website-pc/server/index.mjs', // Nuxt 4 默认打包入口
      script: './.output/server/index.mjs', // Nuxt 4 默认打包入口
      watch: false, // 生产环境务必关闭监听,避免上传大文件夹时频繁触发重启导致进程死锁
      max_memory_restart: '1G', // 单个实例占用内存超过1G则重启
      autorestart: true, // 开启自动重启（默认已开启）
      max_restarts: 20, // 异常连续重启次数上限（防止无限死循环重启）
      restart_delay: 4000, // 崩溃后延迟 4 秒再重启（避免瞬间冲击 CPU）
      wait_ready: true, // 配合 reload 确保新进程就绪
      listen_timeout: 10000, // 给 Nuxt 足够的启动时间
      kill_timeout: 5000, // 优雅退出的超时时间
      error_file: './logs/err.log', // 专门记录服务端错误日志
      out_file: './logs/out.log', // 记录标准输出日志
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true, // 集群模式下合并所有实例日志到同一个文件
      env: {
        NODE_ENV: 'production',
        NITRO_PORT: 3000,
        NITRO_HOST: '0.0.0.0',
      },
    },
    {
      name: 'pm2-monitor',
      script: './pm2-monitor.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
