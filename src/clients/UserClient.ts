import { Injectable } from '@nestjs/common';
import { Get, Loadbalanced } from '@nestcloud/feign';

@Injectable()
@Loadbalanced('nestcloud-kubernetes-example')
export class UserClient {
  @Get('/users')
  async getUsers(): Promise<any> {
  }
}
