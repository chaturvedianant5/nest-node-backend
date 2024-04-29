import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';

@Injectable()
export class AppService {
  constructor(private readonly userService: UsersService) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  findUserByName(name: string) {
    return this.userService.findOne(name);
  }
}
