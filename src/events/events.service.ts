import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventsRepository.find({
      relations: ['familyMember'],
    });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({
      where: { id },
      relations: ['familyMember'],
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  create(event: Event): Promise<Event> {
    return this.eventsRepository.save(event);
  }

  async update(id: number, event: Event): Promise<Event> {
    const exists = await this.findOne(id);
    await this.eventsRepository.update(id, event);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const exists = await this.findOne(id);
    await this.eventsRepository.delete(id);
  }
} 