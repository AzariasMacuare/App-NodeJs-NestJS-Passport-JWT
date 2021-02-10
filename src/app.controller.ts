import { Body, Controller, Get, Param, Post, Render, Req, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { TaskService } from './task/task.service'

@Controller('api/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private taskService: TaskService
    ) {}

  @Post('auth/login')
    async login(@Body() user, @Req() req) {
    return this.authService.login(user, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
    getTaskForUser(@Param('id') id, @Req() req) {
      return this.taskService.findAll(id)
    }
}
