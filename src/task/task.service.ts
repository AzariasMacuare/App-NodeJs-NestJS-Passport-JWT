import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schema/task.schema';
import { CreateTaskDto } from './dto/create-task';
import { verify, decode } from 'jsonwebtoken'
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private TaskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.TaskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(belong): Promise<Task[] | any> {
    return this.TaskModel.find({ belong: belong });
    // return this.TaskModel.find({belong});
  }

  async deleteTask(_id) {
    return this.TaskModel.deleteOne({ _id });
  }

  async editTask(updateTask: CreateTaskDto, idTask) {
    return this.TaskModel.findByIdAndUpdate(
      idTask,
      { $set: updateTask },
      { new: true },
    );
  }
  
}
