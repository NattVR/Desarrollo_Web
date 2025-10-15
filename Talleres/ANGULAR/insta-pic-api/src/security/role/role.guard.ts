import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CommonGuard } from '../common/common.guard';


@Injectable()
export class RoleGuard extends CommonGuard implements CanActivate {

  constructor(jwtService: JwtService) {
    super(jwtService);
  }

  canActivate(context: ExecutionContext): boolean {
    super.canActivate(context);
   
    const request = context.switchToHttp().getRequest();
    const userPayload = request.user;

    if (!userPayload) {

      throw new ForbiddenException('User information not found');
    }

    if (request.body?.userId && request.body.userId === userPayload.id) {
      throw new ForbiddenException('Same user action not allowed');
    }

    return true;
  }
}
