import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './schemas/blog.schema';
import axios from 'axios';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  private laravelApiUrl = 'http://localhost:8000/api/users';
  private staticToken = '123456blogposting';
  async fetchUserProfiles(): Promise<any> {
    try {
      const response = await axios.get(this.laravelApiUrl, {
        headers: {
          Authorization: `Bearer ${this.staticToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        `Error fetching user profiles from Laravel: ${error.message}`,
      );
    }
  }

  async fetchIndividualProfile(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.laravelApiUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.staticToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        `Error fetching individual user profile from Laravel: ${error.message}`,
      );
    }
  }

  async postUserProfile(userData: any): Promise<any> {
    try {
      const response = await axios.post(this.laravelApiUrl, userData, {
        headers: {
          Authorization: `Bearer ${this.staticToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        `Error posting user profile to Laravel: ${error.message}`,
      );
    }
  }
  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findById(id: string): Promise<Blog> {
    return this.blogModel.findById(id).exec();
  }

  async create(blogData: Blog): Promise<Blog> {
    const newPost = new this.blogModel(blogData);
    return newPost.save();
  }

  async update(id: string, blogData: Blog): Promise<Blog> {
    return this.blogModel.findByIdAndUpdate(id, blogData, { new: true }).exec();
  }
}
