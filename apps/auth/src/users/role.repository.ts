import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class RoleRepository extends AbstractRepository<Role> {
  protected readonly logger = new Logger(RoleRepository.name);

  constructor(
    @InjectRepository(Role) usersRepository: Repository<Role>,
    entityManager: EntityManager,
  ) {
    super(usersRepository, entityManager);
  }
}
