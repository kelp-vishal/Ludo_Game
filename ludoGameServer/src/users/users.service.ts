
import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  createUser(arg0: string, hashedPassword: any, arg2: string) {
      throw new Error('Method not implemented yet');
  }
  private readonly users = [
    {
      userId: 1,
      username: 'Vishal',
      password: '123456789',
    },
    {
      userId: 2,
      username: 'Sagar',
      password: '23456789',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
