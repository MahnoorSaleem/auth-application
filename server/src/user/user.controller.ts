import { Controller, Post, Logger, ConflictException, Body, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseDTO } from 'src/dto/response.dto';

@Controller('user')
export class UserController {
  logger: Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger(UserController.name);
  }

  @Post('create')
  async create(@Body() req: CreateUserDto) {
    const newUser = req;
    try {
      const query = { email: newUser.email };
      const isUser = await this.userService.findOne(query);
      if (isUser) return new ResponseDTO(HttpStatus.OK, 'User Already Exist');
      const user = await this.userService.create(newUser);
      return user;
    } catch (error) {
      this.logger.error('Something went wrong in signup:', error);
      throw new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong. Please Try Again!', {}, error.message)
    }
  }
}