import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FamilyMember } from './family-member.entity';

@Injectable()
export class FamilyMembersService {
  constructor(
    @InjectRepository(FamilyMember)
    private familyMembersRepository: Repository<FamilyMember>,
  ) {}

  findAll(): Promise<FamilyMember[]> {
    return this.familyMembersRepository.find();
  }

  async findOne(id: number): Promise<FamilyMember> {
    const member = await this.familyMembersRepository.findOne({ where: { id } });

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
    const exists = await this.findOne(id);
    await this.familyMembersRepository.delete(id);
  }
} 