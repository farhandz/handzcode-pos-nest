import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../guard/jwt-guard';
import { JwtStrategy } from 'src/guard/jwt-strategy';
// import { JwtStrategy } from '';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: 'manis',
        signOptions: { expiresIn: '1000s' },
      }),
    }),
  ],
  providers: [JwtAuthGuard, AuthService, ConfigService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
