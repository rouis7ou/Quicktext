import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async getAllRooms(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    const rooms = await this.roomsService.getAllRooms(page, limit);
    return rooms;
  }

  @Get(':id')
  async getRoomById(@Param('id') id: number) {
    const item = await this.roomsService.getRoomById(id);
    return item || { message: 'Élément non trouvé' };
  }
}
