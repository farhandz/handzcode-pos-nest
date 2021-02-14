import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  getData(): Observable<User[]> {
    return from(this.userModel.find()).pipe(
      map((dt: User[]) => {
        return dt;
      }),
      catchError((e) => {
        throw new HttpException(e.message, 500);
      }),
    );
  }

  getById(id: string): Observable<User> {
    return from(this.userModel.findById({ _id: id })).pipe(
      map((user: User) => {
        return user;
      }),
      catchError((e) => {
        throw new HttpException(e.message, 500);
      }),
    );
  }

  registerNewUser(user: User): Observable<User | any> {
    return from(this.authService.hasPasword(user.password)).pipe(
      switchMap((pass: string) => {
        user.nama = user.nama;
        user.password = pass;
        user.email = user.email;
        user.saldo = user.saldo;
        return from(this.userModel.create(user)).pipe(
          map((user: User) => {
            delete user.password;
            return user;
          }),
        );
      }),
    );
  }

  deleteUser(id: string): Observable<User | any> {
    return from(this.userModel.deleteOne({ _id: id })).pipe(
      map((user: any) => {
        return user;
      }),
      catchError((e) => {
        throw new HttpException(e.message, 500);
      }),
    );
  }

  editUser(id: string, user: User): Observable<User> {
    return from(this.userModel.findByIdAndUpdate(id, user, { new: true })).pipe(
      map((user: User) => {
        return user;
      }),
      catchError((e) => {
        throw new HttpException(e.message, 500);
      }),
    );
  }

  loginUSer(user: User): Observable<User | any> {
    return from(this.validateUser(user)).pipe(
      switchMap((dt: boolean) => {
        return from(this.userModel.findOne({ email: user.email })).pipe(
          switchMap((userFind: User) => {
            if (user.email === userFind.email && dt) {
              return from(this.authService.generateJwt(userFind)).pipe(
                switchMap((token: string) => {
                  if (!userFind.refreshToken) {
                    return from(
                      this.authService.refreshTokenVerify(userFind),
                    ).pipe(
                      switchMap((refreshToken: string) => {
                        return from(
                          this.userModel.findOneAndUpdate(
                            { email: userFind.email },
                            { refreshToken: refreshToken },
                          ),
                        ).pipe(
                          map((dt: any) => {
                            return {
                              token: token,
                              refreshToken: refreshToken,
                              message: 'berhasil login pertama kali',
                            };
                          }),
                        );
                      }),
                    );
                  } else {
                    return of({
                      token: token,
                      refreshToken: userFind.refreshToken,
                      message: 'berhasil login',
                    });
                  }
                }),
              );
            } else {
              return of({
                message: 'username / password salah',
              });
            }
          }),
          catchError((e) => {
            throw new HttpException(e.message, 500);
          }),
        );
      }),
      catchError((e) => {
        throw new HttpException(e.message, 500);
      }),
    );
  }

  validateUser(user: User): Observable<boolean> {
    return from(this.userModel.findOne({ email: user.email })).pipe(
      switchMap((findUser: User) => {
        return from(
          this.authService.comparePassword(user.password, findUser.password),
        ).pipe(
          map((data: boolean) => {
            return data;
          }),
          catchError((e) => {
            throw new HttpException(e.message, 500);
          }),
        );
      }),
      catchError((e) => {
        throw new HttpException(e.message, 500);
      }),
    );
  }

  refreshToken(user: string): Observable<string | any> {
    return from(this.authService.verifyTokenRefresh(user)).pipe(
      switchMap((userVerif: User) => {
        return from(this.userModel.findOne({ email: userVerif.email })).pipe(
          switchMap((userFind: User) => {
            return from(this.authService.generateJwt(userFind)).pipe(
              map((token: string) => {
                return {
                  token: token,
                  message: 'berhasil refresh Token',
                };
              }),
            );
          }),
        );
      }),
    );
  }
  getByRefsehToken(refreshToken: string): Observable<User> {
    return from(this.userModel.findOne({ refreshToken: refreshToken })).pipe(
      map((user: User) => {
        return user;
      }),
      catchError((e) => {
        throw new HttpException(e.message, 500);
      }),
    );
  }
}
