import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserModel } from '../../../databases/models/user.model';
import { LoginWebGuard } from '../../guards/login-web/login-web.guard';
import { AuthService } from '../../services/auth/auth.service';
import { IntendManagerService } from '../../../session-manager/services/intend-manager/intend-manager.service';
import {
  ApiExcludeController,
  ApiHeader,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { LoginPasswordDto } from '../../dtos/login-password/login-password.dto';
import { throwError } from 'rxjs';
import { UnauthorizedInterceptor } from '../../../globals/interceptors/unauthorized-interceptor/unauthorized.interceptor';
import { AuthError } from '../../../globals/exceptions/auth-error/auth-error';
import { constants } from 'os';

@ApiHeader({
  name: 'accept',
  allowEmptyValue: false,
  required: true,
  schema: {
    type: 'string',
    enum: ['application/json'],
  },
})
@ApiTags('Login')
@Controller()
export class LoginController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(UnauthorizedInterceptor)
  @ApiOkResponse({ type: UserModel })
  @ApiProperty()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(ValidationPipe)
  public async login(@Body() userCredential: LoginPasswordDto): Promise<any> {
    const loginUser = await this.authService.validateForPassword(
      userCredential.email,
      userCredential.password,
    );
    if (loginUser === null || loginUser.role === 'admin') {
      throw new AuthError();
    }
    return loginUser;
  }
}
