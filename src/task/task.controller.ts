import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateTaskDto } from './dto/create-task';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Types } from 'mongoose'

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // method get that is in profile/id
  // for response only task from user
  // especified or logged

  @ApiTags('tasks')
  @ApiUnauthorizedResponse({description: 'Informacion like a token or something else is missing'})
  @ApiResponse({status: 201, description: 'Updated successfully all items, but also was added a new item'})
  @UseGuards(JwtAuthGuard)
  @Post()
  saveNewTask(@Body() task: CreateTaskDto) {
    return this.taskService.create(task);
  }

  @ApiOkResponse({description: 'Task deleted successfully'})
  @ApiUnauthorizedResponse({description: 'Informacion like a token or something else is missing'})
  @ApiTags('tasks')
  @UseGuards(JwtAuthGuard)
  @Delete('delete-task/:id')
  deleteTask(@Param('id') id: ObjectId) {
    return this.taskService.deleteTask(id);
  }

  @ApiUnauthorizedResponse({description: 'Informacion like a token or something else is missing'})
  @ApiResponse({status: 201, description: 'Updated successfully all items, but also was added a new item'})
  @ApiOkResponse({description: 'Updated successfully all elements'})
  @ApiTags('tasks')
  @UseGuards(JwtAuthGuard)
  @Put('edit-task/:id')
  updatetask(@Param('id') id, @Body() body: CreateTaskDto) {
    this.taskService.editTask(body, id);
    return { text: 'Task Modified Successfully' };
  }
}
