import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './features/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSourceOptions } from 'ormconfig';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from './infrastructure/common/constant';
import { PostModule } from './features/post/post.module';
import { AuthModule } from './features/auth/auth.module';
import { UserRepository } from './infrastructure/repositories/user.repository';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => dataSourceOptions(configService),
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANTS.secret,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    PostModule,
    AuthModule,
  ],

  controllers: [],
})
export class AppModule { }
