import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // Table name is explicitly set to "users"
export class User {
     @PrimaryGeneratedColumn()
     id: number;

     @Column({ nullable: true })  // Allow username to be nullable
     username: string;

     @Column({ nullable: false })
     email: string;

     @Column()
     password: string;

     // Other columns...
}
