import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

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
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('organization') organization: string,
    @Headers('Authorization') basicAuth: string,
  ): Promise<User> {
    const string = Buffer.from(basicAuth.split(' ')[1], 'base64').toString(
      'ascii',
    );
    console.log('String: ' + string);
    const pass = string.split(':')[1];

    return this.appService.createUser(name, email, organization, pass);
  }

  @UseGuards(AuthGuard)
  @Get('/dashboard')
  getDashboard(): string {
    return 'Dashboard!';
  }
}
