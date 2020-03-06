import { Injectable } from '@nestjs/common';
import { Get } from '@nestcloud/http';

@Injectable()
export class ArticleClient {
  @Get('https://api.apiopen.top/recommendPoetry')
  getArticles() {
  }
}
