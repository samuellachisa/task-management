import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialDto } from 'src/dtos/user/auth-credentials.dto';
import { AuthService } from 'src/services/auth.service';

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
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredential);
  }
}
