import { Module } from '@nestjs/common';
import { BootModule } from '@nestcloud/boot';
import { ConfigModule } from '@nestcloud/config';
import { FeignModule } from '@nestcloud/feign';
import { ScheduleModule } from '@nestcloud/schedule';
import { NEST_BOOT, components, NEST_KUBERNETES } from '@nestcloud/common';
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
    LoggerModule.register(),
    ScheduleModule.register(),
    BootModule.register(resolve(__dirname, '../configs'), 'config.yaml'),
    ConfigModule.register({ dependencies: [NEST_KUBERNETES, NEST_BOOT] }),
    FeignModule.register(),
    ProxyModule.register({ dependencies: [NEST_BOOT] }),
    KubernetesModule.register({ dependencies: [NEST_BOOT] }),
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
