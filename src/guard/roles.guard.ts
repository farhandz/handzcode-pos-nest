import {
  Injectable,
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/user.interface';
import { UserService } from 'src/user/user.service';
import { map } from 'rxjs/operators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user.user;
    return this.userService.getById(user.id).pipe(
      map((data: any) => {
        let hasPermision = false;
        if (data.level === 'admin') {
          hasPermision = true;
        }
        return hasPermision;
      }),
    );
  }
}
