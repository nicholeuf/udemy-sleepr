import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';
import { Role, User } from '@app/common';
import { RoleRepository } from './role.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUser(createUserDto);

    const roles: Role[] = await Promise.all(
      createUserDto.roles?.map(async (roleDto): Promise<Role> => {
        let role: Role;

        if (!!roleDto.name) {
          role = await this.roleRepository.findOne({ name: roleDto.name });
        }

        if (!role) {
          role = new Role(roleDto);
        }

        return role;
      }),
    );

    const user = new User({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      roles,
    });
    return this.usersRepository.create(user);
  }

  private async validateCreateUser(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
    } catch (err) {
      // If user is not found, return immediately to allow user to be created
      return;
    }

    throw new UnprocessableEntityException('Email already exists.');
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto, { roles: true });
  }
}
