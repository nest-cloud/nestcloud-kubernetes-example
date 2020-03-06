import { Injectable } from '@nestjs/common';
import { Get } from '@nestcloud/http';
import { Loadbalanced } from '@nestcloud/loadbalance';

@Injectable()
@Loadbalanced('nestcloud-kubernetes-example')
export class UserClient {
  @Get('/users')
  async getUsers(): Promise<any> {
  }
}
