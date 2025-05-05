// src/users/users.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
     imports: [
          TypeOrmModule.forFeature([User]),
          AuthModule,
          JwtModule,
     ],
     controllers: [UsersController],
     providers: [UsersService],
     exports: [UsersService],
})
export class UsersModule { }
