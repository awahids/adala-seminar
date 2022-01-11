import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantController } from './controllers/participant.controller';
import { ParticipantEntity } from './models/participant.entity';
import { ParticipantService } from './service/participant.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipantEntity])],
  providers: [ParticipantService],
  controllers: [ParticipantController],
})
export class ParticipantModule {}
