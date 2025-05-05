export class CreateUserDto {
     username: string;
     email: string;
     password: string;
     role?: string; // optional, defaults to "customer"
}
