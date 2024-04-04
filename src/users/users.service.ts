import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findOne(username: string): Promise<Users | null> {
    const query = this.usersRepository.findOneBy({ username });

    if ((await query).username === username) {
      return query;
    }
    throw new HttpException('User dont exist.', HttpStatus.NOT_FOUND);
  }
}
