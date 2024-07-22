import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { User, UserDocument } from './model/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { ResponseDTO } from 'src/dto/response.dto';

interface UserT {
  _id: string;
  name: string;
  email: string;
  password?: string;
}

@Injectable()
export class UserService {
  logger: Logger;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private AuthService: AuthService,
  ) {
    this.logger = new Logger(UserService.name);
  }

  async findOne(query: Partial<UserT>) {
    this.logger.log('Finding user by Email');
    try {
      const user = await this.userModel
        .findOne(query)
        .select('+password')
        .exec();
      return user;
    } catch (error) {
      this.logger.error('Error finding user:', error.message);
      throw new HttpException(
        'Failed to find user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(user: Partial<UserT>): Promise<any> {
    this.logger.log('Creating user.');
    try {
      const hashedPassword = await this.AuthService.getHashedPassword(
        user.password,
      );
      user.password = hashedPassword;
      this.logger.debug('Creating user details', user);
      const newUser = new this.userModel(user);
      const saveduserInfo = await newUser.save();
      const { name, email, _id } = saveduserInfo;
      
      return new ResponseDTO(HttpStatus.OK, 'User Created Successfully', { name, email, _id });

    } catch (error) {
      this.logger.error('Error creating user:', error.message, error.status);
      throw new HttpException(
        'Failed to create user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}