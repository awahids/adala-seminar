import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class UserIsUserGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await context.switchToHttp().getRequest();
    const params = request.params;
    const user: User = request.user.user;

    let hasPermission = false;
    if (user.id === Number(params.id)) {
      hasPermission = true;
    }

    if (hasPermission === false) {
      throw new UnauthorizedException('You cant modify another user data');
    }

    return hasPermission;
  }
}
