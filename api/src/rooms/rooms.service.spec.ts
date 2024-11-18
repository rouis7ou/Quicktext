import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import * as fs from 'fs/promises';

jest.mock('fs/promises');

describe('RoomsService', () => {
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsService],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });


  it(' paginated rooms', async () => {
    const mockData = [
      { id: 1, name: 'Room 1' },
      { id: 2, name: 'Room 2' },
      { id: 3, name: 'Room 3' },
      { id: 4, name: 'Room 4' },
      { id: 5, name: 'Room 5' },
    ];

    (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockData));

    const page = 1;
    const limit = 2;

    const rooms = await service.getAllRooms(page, limit);

    expect(rooms).toEqual([
      { id: 1, name: 'Room 1' },
      { id: 2, name: 'Room 2' },
    ]);
  });

  it(' pagination for multiple pages', async () => {
    const mockData = [
      { id: 1, name: 'Room 1' },
      { id: 2, name: 'Room 2' },
      { id: 3, name: 'Room 3' },
      { id: 4, name: 'Room 4' },
      { id: 5, name: 'Room 5' },
    ];

    (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockData));

    const page = 2;  // Page 2
    const limit = 2; // 2 éléments par page

    const rooms = await service.getAllRooms(page, limit);

    expect(rooms).toEqual([
      { id: 3, name: 'Room 3' },
      { id: 4, name: 'Room 4' },
    ]);
  });

  it('get room by id', async () => {
    const mockData = [
      { id: 1, name: 'Room 1' },
      { id: 2, name: 'Room 2' },
      { id: 3, name: 'Room 3' },
    ];

    (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockData));

    const id = 2;

    const room = await service.getRoomById(id);

    expect(room).toEqual({ id: 2, name: 'Room 2' });
  });

  it('room is not found', async () => {
    const mockData = [
      { id: 1, name: 'Room 1' },
      { id: 2, name: 'Room 2' },
      { id: 3, name: 'Room 3' },
    ];

    (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockData));

    const id = 0;

    await expect(service.getRoomById(id)).rejects.toThrow('Room Not Found');
  });
});

