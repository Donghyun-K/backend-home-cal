import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FamilyMember } from './family-member.entity';
import { Event } from '../events/event.entity';

@Injectable()
export class FamilyMembersService {
  constructor(
    @InjectRepository(FamilyMember)
    private familyMembersRepository: Repository<FamilyMember>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  findAll(): Promise<FamilyMember[]> {
    return this.familyMembersRepository.find();
  }

  async findOne(id: number): Promise<FamilyMember> {
    const member = await this.familyMembersRepository.findOne({ 
      where: { id },
      relations: ['events']
    });

    if (!member) {
      throw new NotFoundException(`Family member with ID ${id} not found`);
    }

    return member;
  }

  create(familyMember: FamilyMember): Promise<FamilyMember> {
    return this.familyMembersRepository.save(familyMember);
  }

  async update(id: number, familyMember: FamilyMember): Promise<FamilyMember> {
    const exists = await this.findOne(id);
    await this.familyMembersRepository.update(id, familyMember);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const member = await this.findOne(id);
    
    // 연관된 일정들의 familyMember를 null로 설정
    if (member.events && member.events.length > 0) {
      await this.eventsRepository
        .createQueryBuilder()
        .update(Event)
        .set({ familyMember: () => 'NULL' })
        .where("familyMemberId = :id", { id })
        .execute();
    }

    // 가족 구성원 삭제
    await this.familyMembersRepository.delete(id);
  }
} 