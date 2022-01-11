import { ParticipantEntity } from 'src/participant/models/participant.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(
    () => ParticipantEntity,
    (participantEntity) => participantEntity.seminar,
  )
  listAudience: ParticipantEntity[];
}
