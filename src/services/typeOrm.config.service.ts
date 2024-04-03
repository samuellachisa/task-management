import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  createTypeOrmOptions() {
    return {
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
    };
  }
}
