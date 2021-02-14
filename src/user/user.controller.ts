import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Observable, of, from } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user.interface';
// import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('')
  getOne(): Observable<User[]> {
    return from(this.userService.getData());
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    return from(this.userService.getById(id));
  }
  @Get('/get-one-by-refresh/:refresh')
  getOneByRefresh(@Param('refresh') refresh: string): Observable<User> {
    return from(this.userService.getByRefsehToken(refresh));
  }

  @Post('')
  registerUser(@Body() user: User): Observable<User | any> {
    return from(this.userService.registerNewUser(user));
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Observable<any> {
    return from(this.userService.deleteUser(id));
  }
  @Put(':id')
  editUser(@Param('id') id: string, @Body() user: User): Observable<User> {
    return from(this.userService.editUser(id, user));
  }

  // login user
  @Post('login')
  loginUser(@Body() user: User): Observable<User | any> {
    return from(this.userService.loginUSer(user));
    // return from(this.userService.validateUser(user));
  }

  @Post('refresh-token')
  refreshTokeN(@Body() token: string): Observable<string> {
    return from(this.userService.refreshToken(token));
  }
}
