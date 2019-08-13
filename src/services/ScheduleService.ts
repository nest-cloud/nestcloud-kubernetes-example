import { Injectable, Logger } from '@nestjs/common';
import { NestSchedule, Interval } from '@nestcloud/schedule';
import { InjectLogger } from '@nestcloud/logger';
import { BootValue } from '@nestcloud/boot';
import { ConfigValue } from '@nestcloud/config';

@Injectable()
export class ScheduleService extends NestSchedule {
  @BootValue('service.name', 'default service name')
  private readonly serviceName: string;

  @ConfigValue('data.test', 'default custom data')
  private readonly configMapData: string;

  public constructor(
    @InjectLogger() private readonly logger: Logger,
  ) {
    super();
  }

  @Interval(2000)
  intervalBootJob() {
    this.logger.log('interval get service name from boot: ' + this.serviceName);
  }

  @Interval(2000)
  intervalConsulConfigJob() {
    this.logger.log('interval get data from k8s configMap: ' + this.configMapData);
  }
}
