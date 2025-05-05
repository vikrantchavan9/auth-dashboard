// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module'; // ✅ Import UsersModule
import { AuthModule } from './auth/auth.module';     // ✅ Import AuthModule

@Module({
     imports: [
          TypeOrmModule.forRoot({
               type: 'postgres',
               host: 'localhost',
               port: 5432,
               username: 'postgres',
               password: 'root',
               database: 'auth_dashboard',
               entities: [User],
               synchronize: true,
          }),
          UsersModule,   // ✅ Register feature modules
          AuthModule,    // ✅ Register AuthModule
          JwtModule.register({
               secret: 'your-secret-key',
               signOptions: { expiresIn: '1h' },
          }),
     ],
})
export class AppModule { }
