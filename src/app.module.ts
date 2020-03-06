import { Module } from '@nestjs/common';
import { BootModule } from '@nestcloud/boot';
import { ConfigModule } from '@nestcloud/config';
import { HttpModule } from '@nestcloud/http';
import { ScheduleModule } from '@nestcloud/schedule';
import { BOOT, components, KUBERNETES, LOADBALANCE } from '@nestcloud/common';
import { TypeOrmHealthIndicator, TerminusModule, TerminusModuleOptions } from '@nestjs/terminus';
import { ProxyModule } from '@nestcloud/proxy';

import * as controllers from './controllers';
import * as services from './services';
import * as clients from './clients';
import { LoggerModule } from '@nestcloud/logger';
import { resolve } from 'path';
import { KubernetesModule } from '@nestcloud/kubernetes';

const getTerminusOptions = (db: TypeOrmHealthIndicator): TerminusModuleOptions => ({
  endpoints: [
    {
      url: '/health',
      healthIndicators: [
        async () => db.pingCheck('database', { timeout: 300 }),
      ],
    },
  ],
});

@Module({
  imports: [
    LoggerModule.forRoot(),
    ScheduleModule.forRoot(),
    BootModule.forRoot({ filePath: resolve(__dirname, 'config.yaml') }),
    ConfigModule.forRootAsync({ inject: [KUBERNETES, BOOT] }),
    HttpModule.forRoot(),
    ProxyModule.forRootAsync({ inject: [BOOT] }),
    KubernetesModule.forRootAsync({ inject: [BOOT] }),
    TerminusModule.forRootAsync({
      inject: [TypeOrmHealthIndicator],
      useFactory: db => getTerminusOptions(db as TypeOrmHealthIndicator),
    }),
  ],
  controllers: components(controllers),
  providers: components(services, clients),
})
export class AppModule {
}
