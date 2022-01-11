import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ParticipantService } from 'src/participant/service/participant.service';
import { User } from 'src/user/models/user.interface';

@Injectable()
export class UserIsOrganizerGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => ParticipantService))
    private participantService: ParticipantService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await context.switchToHttp().getRequest();
    const params = request.params;
    const user: User = request.user.user;

    const checkUser = await this.participantService.findOne({
      seminarId: Number(params.id),
    });

    let hasPermission = false;
    if (checkUser.userId === user.id) {
      hasPermission = true;
    }

    if (hasPermission === false) {
      throw new UnauthorizedException('Only organizer can manage the Seminar');
    }

    return hasPermission;
  }
}
