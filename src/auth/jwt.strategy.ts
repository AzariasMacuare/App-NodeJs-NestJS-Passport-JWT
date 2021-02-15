import { ExtractJwt, Strategy,  } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });

  }

  // Form most scalably, store inside the method validate() in global variable,
  // the information from payload._doc._id o .username o .name, etc.

  async validate(payload: any): Promise<any> {
    
    return { userId: payload.sub, username: payload.username };
  }
}
