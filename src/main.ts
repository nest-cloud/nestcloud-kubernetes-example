import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestLogger } from '@nestcloud/logger';
import { NestCloud } from '@nestcloud/core';
import { resolve } from 'path';

// https
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function bootstrap() {
  const app = NestCloud.create(await NestFactory.create(AppModule, {
    logger: new NestLogger({ path: resolve(__dirname, '../configs'), filename: 'config.yaml' }),
  }));

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

  await app.listen(NestCloud.global.boot.get('service.port', 3200));
}

bootstrap();
