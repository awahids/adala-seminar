import { SeminarEntity } from 'src/seminar/models/seminar.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ParticipantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  seminarId: number;

  @ManyToOne(() => SeminarEntity, (seminar) => seminar.listAudience, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  seminar: SeminarEntity;

  @ManyToOne(() => UserEntity, (user) => user.registeredSeminar, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;
}
