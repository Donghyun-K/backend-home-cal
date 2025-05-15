import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FamilyMember } from '../family-members/family-member.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date', nullable: true })
  endDate: string;

  @Column({ nullable: true })
  memo: string;

  @ManyToOne(() => FamilyMember, (familyMember) => familyMember.events)
  familyMember: FamilyMember;
} 