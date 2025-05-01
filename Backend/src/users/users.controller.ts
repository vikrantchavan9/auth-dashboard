// src/users/users.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UnauthorizedException } from '@nestjs/common';

@Controller('Users')
export class UsersController {
     constructor(private readonly usersService: UsersService) { }

     @Post('register')
     async register(@Body() body: { username: string; email: string; password: string }) {
          const { username, email, password } = body;

          if (!email || !username || !password) {
               throw new BadRequestException('Username, email, and password are required');
          }

          return this.usersService.registerUser(username, email, password);
     }


     @Post('login')
     async login(@Body() body: { email: string, password: string }) {
          try {
               const token = await this.usersService.loginUser(body.email, body.password);
               return { message: 'Login successful', token };
          } catch (error) {
               throw new UnauthorizedException('Invalid credentials');
          }
     }
}