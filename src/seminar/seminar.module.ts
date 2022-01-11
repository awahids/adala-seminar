import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantEntity } from 'src/participant/models/participant.entity';
import { ParticipantService } from 'src/participant/service/participant.service';
import { SeminarEntity } from './models/seminar.entity';
import { SeminarController } from './seminar/seminar.controller';
import { SeminarService } from './service/seminar.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeminarEntity, ParticipantEntity])],
  providers: [SeminarService, ParticipantService],
  controllers: [SeminarController],
})
export class SeminarModule {}
