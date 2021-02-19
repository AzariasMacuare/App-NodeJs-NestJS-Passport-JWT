import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user-schema';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<any | undefined> {
    const user = await this.UserModel.find({ username });
    return user[0];
  }

  async create(user: CreateUserDto) {
    const userExist = await this.UserModel.find({ username: user.username });
    if (!(userExist[0] || userExist[0] === null || userExist[0] === null)) {
          const salt = 10;
          const hash = await bcrypt.hash(user.password, salt);
          const { password, ...remaining } = user;
          const newUser = {
            name: remaining.name,
            username: remaining.username,
            password: hash,
      };

      const createdUser = await new this.UserModel(newUser);
      return createdUser.save();
    }
    return null;
  }
}

// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(user.password, salt, function(err, hash) {
//         if (err) return console.error(err);

//         const {password, ...result} = user;
//                 newUser = {
//                 result,
//                 password: hash
//                 }
//         });
// });
