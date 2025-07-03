import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userSchema: Model<User>,
  ) { }

  async login(dto: LoginDto) {
    const user = await this.userSchema.findOne({ email: dto.email });

    const isSamePassword = await bcrypt.compare(dto.password, user.password);

    if (!user || !isSamePassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user._id,
      email: user.email
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async getProfile(user: { userId: string, email: string }) {
    const loggedUser = await this.userSchema.findOne({ email: user.email });

    return loggedUser
  }
}
