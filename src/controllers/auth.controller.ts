import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthCredentialDto } from 'src/dtos/user/auth-credentials.dto';
import { AuthService } from 'src/services/auth.service';
import { Response } from 'express';
@Controller('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  createUser(@Body() user: AuthCredentialDto) {
    return this.authService.createUser(user);
  }
  @Post('/signIn')
  async signIn(
    @Body() authCredential: AuthCredentialDto,
    @Res() res: Response,
  ) {
    return await this.authService.signIn(authCredential, res);
  }
}
