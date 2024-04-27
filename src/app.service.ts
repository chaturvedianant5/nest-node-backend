import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';

@Injectable()
export class AppService {
  constructor(private readonly userService: UsersService) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(
    name: string,
    email: string,
    organization: string,
    pass: string,
  ): Promise<User> {
    const user = {
      name,
      email,
      organization,
      password: pass,
    };
    return this.userService.createUser(user);
  }
}
