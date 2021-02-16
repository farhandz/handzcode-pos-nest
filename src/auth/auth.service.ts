import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Observable, of, from } from 'rxjs';
import bcrypt = require('bcrypt');
import { User } from 'src/user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  generateJwt(user): Observable<string> {
    // console.log(user);
    return from(
      this.jwtService.signAsync({
        name: user.name,
        id: user._id,
        email: user.email,
        role: user.role,
        level: user.level,
      }),
    );
  }
  hasPasword(password: string): Observable<string> {
    console.log(password);
    return from<string>(bcrypt.hash(password, 12));
  }

  comparePassword(password: string, hasPassword: string): Observable<any> {
    return from(bcrypt.compare(password, hasPassword));
  }
  refreshTokenVerify(user: User): Observable<string> {
    return from(
      this.jwtService.signAsync(
        { nama: user.nama, email: user.email, role: user.role },
        {
          secret: 'JWT_REFRESH',
          expiresIn: '365d',
        },
      ),
    );
  }
  verifyTokenRefresh(token: any): Observable<any> {
    return from(
      this.jwtService.verifyAsync(token.token, {
        secret: 'JWT_REFRESH',
      }),
    );
  }
}
