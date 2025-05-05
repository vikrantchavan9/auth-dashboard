
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
     @PrimaryGeneratedColumn()
     id: number;

     @Column({ unique: true })
     username: string;

     @Column({ unique: true })
     email: string;

     @Column()
     password: string;

     @Column({ default: 'customer' }) // Possible values: 'admin', 'customer', etc.
     role: string;
}
