import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class RoomsService {
  async getAllRooms(page: number, limit: number): Promise<any[]> {
    const filePath = 'src/rooms/data/room.json';
    const data = await fs.readFile(filePath, 'utf8');

    if (!data) {
      throw new Error('No such data');
    }

    const rooms = JSON.parse(data);

    // Pagination logic
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRooms = rooms.slice(startIndex, endIndex);

    return paginatedRooms;
  }

  async getRoomById(id: number) {
    const filePath = 'src/rooms/data/room.json';
    const data = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);

    const item = jsonData.find((item) => item.id == id);

    if (!item) throw new Error('Room Not Found');

    return item;
  }
}
