import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipantEntity } from '../models/participant.entity';
import { Participant } from '../models/participant.interface';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(ParticipantEntity)
    private readonly participantRepository: Repository<ParticipantEntity>,
  ) {}

  async create(participant: Participant): Promise<Participant> {
    return this.participantRepository.save(participant);
  }

  async findOne(condition: any): Promise<Participant> {
    return this.participantRepository.findOne(condition);
  }

  async deleteOne(id: number): Promise<any> {
    return this.participantRepository.delete(id);
  }

  async updateOne(id: number, participant: Participant): Promise<any> {
    return this.participantRepository.update(id, participant);
  }
}
