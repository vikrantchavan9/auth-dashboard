// src/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
     imports: [
          PassportModule,
          JwtModule.register({
               secret: 'your-secret', // Replace with environment variable in production
               signOptions: { expiresIn: '1d' },
          }),
          forwardRef(() => UsersModule), // ✅ to resolve circular dependency
     ],
     providers: [AuthService, JwtStrategy],
     exports: [AuthService, JwtStrategy], // ✅ allow injection in UsersModule
})
export class AuthModule { }
