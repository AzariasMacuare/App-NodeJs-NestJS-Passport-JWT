import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task';
import { TaskService } from './task.service'

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
    
    // method get is in profile/id
    // for response only task from user 
    // especified or logged
    
    @UseGuards(JwtAuthGuard)
    @Post()
        saveNewTask(@Body() task: CreateTaskDto, @Req() req) {
            return this.taskService.create(task)
        }

    @Delete('delete-task/:id')
        deleteTask(@Param('id') id) {
            return this.taskService.deleteTask(id)
        }

    @Put('edit-task/:id')
        updatetask(@Param('id') id, @Body() body) {
            this.taskService.editTask(body, id)
            return {text: 'Task Modified Successfully'} 
        }
}
