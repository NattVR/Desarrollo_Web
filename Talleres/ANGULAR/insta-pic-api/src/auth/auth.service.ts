import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserDto } from './dto/user-auth.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Injectable()
export class AuthService {

  constructor(private readonly userService:UserService, private jwtService: JwtService) {
  }

  async create(loginDto: LoginDto) {
    console.log(loginDto)
    const user = await this.userService.findByUsername(loginDto.username) //// verificar si el usuario existe
    console.log(user)
    if(user && bcrypt.compareSync(loginDto.password, user.password)){
      const payload={ id: user.id, username: user.username} // lo que se va a guardar en el token info que queramos meter se hace referencia donde cargamos la data
      
      return {
        success:true,
        token: await this.jwtService.signAsync(payload), // convertir payload en firma
      }
    }
    throw new NotFoundException("Usuario o contraseña incorrecta");
  }


}
