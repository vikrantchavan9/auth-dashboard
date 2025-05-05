import { Controller, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { LoginDto } from '../auth/dto/login.dto';

@Controller('users')
export class UsersController {
     constructor(
          private readonly usersService: UsersService,
          private readonly authService: AuthService, // this depends on AuthModule being imported correctly
     ) { }

     @Post('register')
     async register(@Body() body: { username: string; email: string; password: string }) {
          const { username, email, password } = body;

          if (!email || !username || !password) {
               throw new BadRequestException('Username, email, and password are required');
          }

          return this.usersService.registerUser(username, email, password);
     }

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
