import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './schemas/blog.schema';

@Controller('posts')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get('test')
  getTestMessage(): Record<string, string> {
    return { message: 'NestJS BlogsController test route is working!' };
  }

  @Get()
  async getAllPosts(): Promise<Blog[]> {
    return this.blogsService.findAll();
  }

  @Get('proxy/users')
  async getUserProfiles() {
    return this.blogsService.fetchUserProfiles();
  }

  @Post('proxy/users')
  async postUserProfile(@Body() userData: any): Promise<any> {
    return this.blogsService.postUserProfile(userData);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.findById(id);
  }

  @Post()
  async createPost(@Body() blogData: Blog): Promise<Blog> {
    return this.blogsService.create(blogData);
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() blogData: Blog,
  ): Promise<Blog> {
    return this.blogsService.update(id, blogData);
  }
}
