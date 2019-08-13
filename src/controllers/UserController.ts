import { Controller, Get, Query, Req } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  async getUsers(@Query('remote') isRemote: boolean, @Req() req) {
    return [{ id: 1, name: 'John' }, { id: 2, name: 'Sarah' }];
  }
}
