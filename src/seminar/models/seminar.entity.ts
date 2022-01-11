import { ParticipantEntity } from 'src/participant/models/participant.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SeminarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time without time zone' })
  time: string;

  @Column()
  quota: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimeStamo() {
    this.updatedAt = new Date();
  }

  @OneToMany(
    () => ParticipantEntity,
    (participantEntity) => participantEntity.seminar,
  )
  listAudience: ParticipantEntity[];
}
