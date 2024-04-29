import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { CreateUserDto } from './users/user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  getHealth(): string {
    return 'App is running!';
  }

  @Post('/signup')
  createUser(
    @Body() createUserDto: CreateUserDto,
    // @Body('name') name: string,
    // @Body('email') email: string,
    // @Body('organization') organization: string,
    @Headers('Authorization') basicAuth: string,
  ): Promise<User> {
    const string = Buffer.from(basicAuth.split(' ')[1], 'base64').toString(
      'ascii',
    );
    console.log('String: ' + string);
    const pass = string.split(':')[1];

    const user: User = {
      name: createUserDto.name,
      email: createUserDto.email,
      organization: createUserDto.organization,
      password: pass,
    };

    return this.appService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Get('/dashboard')
  async getDashboard(@Request() req): Promise<any> {
    console.log(req.user.username);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await this.appService.findUserByName(
      req.user.username,
    );
    console.log(result);
    return result;
  }
}
