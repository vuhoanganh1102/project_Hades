import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { usersDto } from 'src/users/dto/users.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    usersDto: usersDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findOne(usersDto.username);
    if (user?.password !== usersDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.accessTokenKey,
        expiresIn: '60s',
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.accessTokenKey,
        expiresIn: '7d',
      }),
    };
  }
}
