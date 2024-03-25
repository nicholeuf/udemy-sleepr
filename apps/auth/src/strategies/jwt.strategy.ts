import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // Passport automatically creates a user object, based on the value
  // we return from the validate() method, and assigns it to the Request object as req.user.
  async validate({ userId }: TokenPayload) {
    return this.usersService.getUser({ id: userId });
  }
}

// HTTP requests contain the JWT in the cookies
// Microservice requests contain the JWT in the request
const cookieExtractor = (request: any) => {
  return (
    request?.cookies?.Authentication ||
    request?.Authentication ||
    request?.headers?.Authentication
  );
};
