import { Controller, Get, Post, Request, UseGuards, Logger, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseDTO } from 'src/dto/response.dto';

@Controller('auth')
export class AuthController {
  logger: Logger;
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: LoginUserDto): Promise<any> {
    try {
      this.logger.log('Login Endpoint');
      const response = await this.authService.generateJwtToken(req);
      return new ResponseDTO(HttpStatus.OK, 'User Authenticated', response);
    } catch (error) {
      // throw error;
       throw new HttpException(error.message, error.status ||
        HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('viewProfile')
  async getUser(@Request() req): Promise<any> {  
    this.logger.log('View Profile Endpoint');
    const {_id, name, email} = req.user
    return new ResponseDTO(HttpStatus.OK, 'User Retrieved Successfully', {_id, name, email});
  }
}