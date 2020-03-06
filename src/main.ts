import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestLogger } from '@nestcloud/logger';
import { resolve } from 'path';
import { BOOT, IBoot } from '@nestcloud/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new NestLogger({ filePath: resolve(__dirname, 'config.yaml') }),
  });

  process.on('SIGINT', async () => {
    setTimeout(() => process.exit(1), 5000);
    await app.close();
    process.exit(0);
  });

  // kill -15
  process.on('SIGTERM', async () => {
    setTimeout(() => process.exit(1), 5000);
    await app.close();
    process.exit(0);
  });

  const boot = app.get<IBoot>(BOOT);
  await app.listen(boot.get('service.port', 3200));
}

bootstrap();
