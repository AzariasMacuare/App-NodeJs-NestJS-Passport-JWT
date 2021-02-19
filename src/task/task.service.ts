import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schema/task.schema';
import { CreateTaskDto } from './dto/create-task';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private TaskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    console.log(createTaskDto)
    const newTask = createTaskDto;
    const createdTask = await new this.TaskModel(newTask).save();
    console.log(createdTask)
    return createdTask
  }

  async findAll(belong): Promise<Task[] | any> {
    return this.TaskModel.find({ belong: belong });
    // return this.TaskModel.find({belong});
  }

  async deleteTask(_id: ObjectId) {
    const result = await this.TaskModel.deleteOne({ _id });
    return result.n // = 1
  }

  async editTask(updateTask: CreateTaskDto, idTask) {
    const task = await this.TaskModel.findByIdAndUpdate(
      idTask,
      { $set: updateTask },
      { new: true },
      );
      console.log(task)
      return task
  }
  
}
