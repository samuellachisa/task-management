import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from 'src/dtos/user/auth-credentials.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(authCredential: AuthCredentialDto): Promise<User> {
    const { username, password } = authCredential;
    const newUser = this.userRepository.create({ username, password });
    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        console.log('error', 'duplication');
      }
    }
  }
}
