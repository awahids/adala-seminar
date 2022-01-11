import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { SeminarService } from 'src/seminar/service/seminar.service';
import { ParticipantService } from '../service/participant.service';

@Controller('participant')
export class ParticipantController {
  constructor(
    private participantService: ParticipantService,
    private seminarService: SeminarService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body('seminarId') seminarId: number, @Request() req) {
    try {
      const seminar = await this.seminarService.findOne({ id: seminarId });

      if (!seminar) {
        throw new NotFoundException();
      }

      const checkQuota = await this.seminarService.countAudience({ seminarId });

      if (seminar.quota <= checkQuota) {
        throw new BadRequestException(
          'You cannot join the seminar, because the audience already full',
        );
      }

      if (seminar.status === 'Ended') {
        throw new BadRequestException('Seminar has Ended');
      }

      const participant = await this.participantService.create({
        seminarId,
        userId: req.user.user.id,
      });

      return { seminar, participant };
    } catch (error) {
      throw error;
    }
  }
}
