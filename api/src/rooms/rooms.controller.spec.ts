import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { NotFoundException } from '@nestjs/common';

const mockRoomsService = {
  getAllRooms: jest.fn(),
  getRoomById: jest.fn(),
};

describe('RoomsController', () => {
  let controller: RoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        { provide: RoomsService, useValue: mockRoomsService },
      ],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
  });

  it('get paginated rooms', async () => {
    const mockData = [
      { id: 1, name: 'Room 1' },
      { id: 2, name: 'Room 2' },
    ];
    mockRoomsService.getAllRooms.mockResolvedValue(mockData);

    const result = await controller.getAllRooms(1, 2);
    expect(result).toEqual(mockData);
  });

  it('get room by id', async () => {
    const mockData = { id: 2, name: 'Room 2' };
    mockRoomsService.getRoomById.mockResolvedValue(mockData);

    const result = await controller.getRoomById(2);
    expect(result).toEqual(mockData);
  });

  it('room  not found', async () => {
    mockRoomsService.getRoomById.mockRejectedValue(new NotFoundException('Room Not Found'));

    try {
      await controller.getRoomById(999);
    } catch (e) {
      expect(e.response.message).toBe('Room Not Found');
    }
  });
});
