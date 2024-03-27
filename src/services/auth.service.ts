import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from 'src/dtos/user/auth-credentials.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(authCredential: AuthCredentialDto): Promise<User> {
    const { username, password } = authCredential;

    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
    // try {
    //   return await this.userRepository.save(newUser);
    // } catch (error) {
    //   if (error.code === '23505') {
    //     throw new ConflictException('Username already exists');
    //   }
    // }
  }
  async signIn(authCredential: AuthCredentialDto, res: Response) {
    try {
      const { username, password } = authCredential;
      const user = await this.userRepository.findOne({ where: { username } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Incorrect credentials');
      }
      const accessToken = await this.jwtService.sign(username);
      return res.status(200).json({ message: accessToken });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
}
