import { HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ResponseDTO } from 'src/dto/response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private UserService: UserService,
    private jwtService: JwtService
  ) { }
  
  async validateUser(email: string, pass: string): Promise<any> {
    const query = { email: email };
    const user = await this.UserService.findOne(query);
    if (!user) throw new NotFoundException('Email Does not exist');
    // if (!user) return new ResponseDTO(HttpStatus.OK, 'Email Does not exist');

    
    const isMatched = await this.comparePasswords(pass, user.password);
    if (!isMatched) throw new UnauthorizedException('Invalid Credentials');
    // if (!isMatched) return new ResponseDTO(HttpStatus.OK, 'Invalid Credentials');
    return user;
  }

  async generateJwtToken({user}: any) {
    const payload = {
      email: user.email
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getHashedPassword(password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<any> {
    return bcrypt
      .compare(password, hashedPassword)
      .then((isMatch) => {
        if (isMatch) return true;
        return false;
      })
      .catch((err) => err);
  }
}