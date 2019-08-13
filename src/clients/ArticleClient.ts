import { Injectable } from '@nestjs/common';
import { Get } from '@nestcloud/feign';

@Injectable()
export class ArticleClient {
  @Get('https://api.apiopen.top/recommendPoetry')
  getArticles() {
  }
}
