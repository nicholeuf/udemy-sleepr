import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, User, Role } from '@app/common';
import { UsersRepository } from './users.repository';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
