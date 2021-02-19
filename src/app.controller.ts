import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TaskService } from './task/task.service';


@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private taskService: TaskService,
  ) {}
  
  @ApiTags('users')
  @ApiUnauthorizedResponse({description: 'Authetication was failed somehow'})
  @ApiCreatedResponse({description: 'Payload from de user created and Authetication completed'})
  @Post('auth/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }
  

  @ApiTags('profile')
  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  @ApiUnauthorizedResponse({description: 'Likely Missing a id from user for access your task own'})
  @ApiOkResponse({status: 200, description: 'User has send your id into the route and a token into headers. Response with all yours tasks'})
  getTaskForUser(@Param('id') id) {
    return this.taskService.findAll(id);
  }
}
