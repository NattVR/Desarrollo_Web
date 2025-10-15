import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getToken } from '../utils/token-utils';

@Injectable()
export class CommonGuard implements CanActivate { 

  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean  {

    let request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']// Bearer <token>  // extraer el token del header
    //console.log(request); // revision de la info que llega en el request y headers
    console.log('Authorization Header:', token);
   
    if(!token) {
      throw new ForbiddenException("No token provided");
    }

    try {
     
      const payload = this.jwtService.verify(getToken(token)); // con el payload puedo validar el id del usuario
      request.user = payload;

    } catch (error) {
      console.log(error)
      throw new ForbiddenException("Session expired");
    }
    return true; 
  }


}


