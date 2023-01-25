import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users_s4') private readonly userModel: Model<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: id });
  }

  async create(createUserInput: CreateUserInput) {
    const user = await new this.userModel(createUserInput);
    return user.save();
  }

  async update(updateUserInput: UpdateUserInput) {
    await this.userModel.updateOne({ _id: updateUserInput.id }, updateUserInput);
  }
  
  async remove(id: string) {
    await this.userModel.deleteOne({ _id: id });
  }
}
