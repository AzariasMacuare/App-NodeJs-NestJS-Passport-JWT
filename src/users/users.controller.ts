import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('users')
  @ApiCreatedResponse({description: 'New User Created successfully'})
  @Post()
  createNewUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
