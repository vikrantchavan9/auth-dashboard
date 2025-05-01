// src/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
     type: 'postgres',
     host: 'localhost', // replace with your DB host
     port: 5432, // replace with your DB port
     username: 'postgres', // replace with your DB username
     password: 'root', // replace with your DB password
     database: 'auth_dashboard', // replace with your DB name
     entities: [__dirname + '/**/*.entity{.ts,.js}'],
     synchronize: true, // auto-create database schema (useful in development)
};
