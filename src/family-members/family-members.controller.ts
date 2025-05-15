import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { FamilyMembersService } from './family-members.service';
import { FamilyMember } from './family-member.entity';

@Controller('family-members')
export class FamilyMembersController {
  constructor(private readonly familyMembersService: FamilyMembersService) {}

  @Get()
  findAll(): Promise<FamilyMember[]> {
    return this.familyMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FamilyMember> {
    return this.familyMembersService.findOne(+id);
  }

  @Post()
  create(@Body() familyMember: FamilyMember): Promise<FamilyMember> {
    return this.familyMembersService.create(familyMember);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() familyMember: FamilyMember,
  ): Promise<FamilyMember> {
    return this.familyMembersService.update(+id, familyMember);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.familyMembersService.remove(+id);
  }
} 