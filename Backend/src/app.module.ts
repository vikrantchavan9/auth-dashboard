import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
     imports: [
          // Correct database configuration
          TypeOrmModule.forRoot({
               type: 'postgres',  // Replace with your DB type (e.g., mysql, postgres)
               host: 'localhost',  // DB host
               port: 5432,         // DB port
               username: 'postgres',  // DB username
               password: 'root',  // DB password
               database: 'auth_dashboard',  // DB name
               entities: [User],  // Specify your entities
               synchronize: true,  // Set to true in development for auto migrations
          }),
          TypeOrmModule.forFeature([User]),  // Make sure you register the User entity
          JwtModule.register({
               secret: 'your-secret-key',  // Use a secret for signing JWT tokens
               signOptions: { expiresIn: '1h' },  // Token expiration time
          }),
     ],
     controllers: [UsersController],
     providers: [UsersService],
})
export class AppModule { }
