import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, public jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
         const user = await this.usersService.findOne(username);
         if (!user) {
             return null
         }

         const isMatchPassword = await bcrypt.compare(password, user.password)
         
         if (user && isMatchPassword) {
             const { password, ...result } = user;
             return result;
         }
         return null
    }

    async login(user: any, req) {
        const payload = { username: user.username, sub: user.password};
        const result = await this.validateUser(payload.username, payload.sub)
        if(result == null) {
            return null
        }
        return [
            {access_token: this.jwtService.sign(result)},
            {id: result._doc._id}
        ]
    }

}
