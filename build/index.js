import { readFileSync, existsSync } from 'node:fs';
import { parse } from 'dotenv';
import { resolve } from 'node:path';

// 动态获取环境文件逻辑
export function loadEnv() {
  // 查找命令行参数中 --dotenv 后面的文件名
  const argIndex = process.argv.indexOf('--dotenv');
  const envFile = argIndex !== -1 ? process.argv[argIndex + 1] : '.env';
  const envPath = resolve(process.cwd(), envFile);

  if (existsSync(envPath)) {
    console.log(`[Config] 正在从 ${envFile} 加载环境变量`);
    const config = parse(readFileSync(envPath));
    // 将变量注入 process.env 供 Nuxt 内部读取
    for (const key in config) {
      process.env[key] = config[key];
    }
    return config;
  }
  return {};
}
