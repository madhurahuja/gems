import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    console.log(authCredentialsDto);
    return this.authService.signup(authCredentialsDto);
  }
}