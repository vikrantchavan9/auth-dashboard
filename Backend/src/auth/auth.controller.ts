import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../auth/dto/login.dto';

@Controller('auth')
export class AuthController {
     constructor(
          private readonly authService: AuthService,
          private readonly usersService: UsersService,
     ) { }

     @Post('login')
     async login(@Body() loginDto: LoginDto) {
          const user = await this.usersService.validateUser(loginDto.email, loginDto.password);

          if (!user) {
               throw new UnauthorizedException('Invalid credentials');
          }

          const token = await this.authService.generateToken(user);

          return {
               message: 'Login successful',
               token,
               user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
               },
          };
     }
}
