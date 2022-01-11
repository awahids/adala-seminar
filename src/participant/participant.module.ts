import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeminarEntity } from 'src/seminar/models/seminar.entity';
import { SeminarService } from 'src/seminar/service/seminar.service';
import { ParticipantController } from './controllers/participant.controller';
import { ParticipantEntity } from './models/participant.entity';
import { ParticipantService } from './service/participant.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipantEntity, SeminarEntity])],
  providers: [ParticipantService, SeminarService],
  controllers: [ParticipantController],
})
export class ParticipantModule {}
