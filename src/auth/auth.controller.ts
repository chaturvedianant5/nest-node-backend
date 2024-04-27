import { Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  loginUser(@Headers('Authorization') basicAuth: string): Promise<any> {
    const string = Buffer.from(basicAuth.split(' ')[1], 'base64').toString(
      'ascii',
    );
    console.log('String: ' + string);
    const [email, pass] = string.split(':');

    return this.authService.signIn(email, pass);
  }
}
