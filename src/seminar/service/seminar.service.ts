import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { ParticipantEntity } from 'src/participant/models/participant.entity';
import { Repository } from 'typeorm';
import { SeminarEntity } from '../models/seminar.entity';
import { Seminar } from '../models/seminar.interface';

@Injectable()
export class SeminarService {
  constructor(
    @InjectRepository(SeminarEntity)
    private readonly seminarRepository: Repository<SeminarEntity>,
    @InjectRepository(ParticipantEntity)
    private readonly participantRepository: Repository<ParticipantEntity>,
  ) {}

  create(seminar: Seminar): Promise<Seminar> {
    return this.seminarRepository.save(seminar);
  }

  async findOne(condition: any): Promise<Seminar> {
    return this.seminarRepository.findOne(condition);
  }

  async findAll(): Promise<Seminar[]> {
    return this.seminarRepository.find();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Seminar>> {
    return paginate<Seminar>(this.seminarRepository, options);
  }

  async deleteOne(id: number): Promise<any> {
    return this.seminarRepository.delete(id);
  }

  async updateOne(id: number, seminar: Seminar): Promise<any> {
    return this.seminarRepository.update(id, seminar);
  }

  async countAudience(condition: any): Promise<number> {
    return this.participantRepository.count(condition);
  }
}
