import { Injectable } from '@nestjs/common';
import { Task, TaskDocument } from './task/schema/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
