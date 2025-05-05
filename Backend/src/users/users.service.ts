import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; // Make sure the correct path is used
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';

@Injectable()
export class UsersService {
     constructor(
          @InjectRepository(User) private usersRepository: Repository<User>,
          private jwtService: JwtService,
     ) { }

     // Register User
     async registerUser(username: string, email: string, password: string): Promise<User> {
          const existingUser = await this.usersRepository.findOne({ where: { email } });
          if (existingUser) {
               throw new BadRequestException('Email is already taken');
          }

          const hashedPassword = await bcrypt.hash(password, 10);  // Hash password before saving
          console.log('Hashed password during registration:', hashedPassword);  // Log the hashed password

          const newUser = this.usersRepository.create({ username, email, password: hashedPassword, role: 'customer' });
          return this.usersRepository.save(newUser);
     }

     // Login User
     async loginUser(email: string, password: string): Promise<{ token: string; user: User }> {
          console.log('Login attempt for email:', email);  // Log login attempt

          const user = await this.usersRepository.findOne({ where: { email } });
          if (!user) {
               console.log('User not found');
               throw new UnauthorizedException('Invalid credentials');
          }

          console.log('User found:', user);  // Log user details

          // Compare the entered password with the hashed password stored in the database
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
               console.log('Password mismatch');
               throw new UnauthorizedException('Invalid credentials');
          }

          // If password matches, generate JWT
          const payload = { username: user.username, email: user.email, role: user.role };  // Add role in payload
          const token = this.jwtService.sign(payload);
          console.log('Generated JWT token:', token);

          return { token, user };
     }

     // Validate User credentials for login
     async validateUser(email: string, password: string): Promise<User | null> {
          const user = await this.usersRepository.findOne({ where: { email } });
          if (user && await bcrypt.compare(password, user.password)) {
               return user;
          }
          return null;
     }
}
