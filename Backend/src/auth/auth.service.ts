import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
     constructor(private readonly jwtService: JwtService) { }

     async generateToken(user: User): Promise<string> {
          const payload = { sub: user.id, email: user.email, role: user.role };
          return this.jwtService.sign(payload);
     }
}
