import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { uid } from 'rand-token'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    public jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return null;
    }
    
    const isMatchPassword = await bcrypt.compare(password, user._doc.password);

    if (user && isMatchPassword) {
      const { password, ...result } = user;
      console.log(result._doc)
      return result;
    }
    return null;
  }
  
  async login(user: any) {
    const payload = { username: user.username, sub: user.password };
    const result = await this.validateUser(payload.username, payload.sub);
    if (result == null) {
      return null;
    }
    
    const refreshToken = uid(256, payload.username)
    
    return [
      { access_token: this.jwtService.sign(result) },
      { id: result._doc._id },
      {refreshToken}
    ];
  }
}
