import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { HttpStatus } from '@nestjs/common';

const fakeUsers = [
    {
      id: 1,
      name: 'Primeiro post do blog',
      password: 'Apenas um teste.',
      username: true,
      email: 'jh.tavares.jh@gmail.com',
    },
    {
      id: 2,
      name: 'Primeiro post do blog',
      password: 'Apenas um teste.',
      username: true,
      email: 'jh.tavares.jh@gmail.com',
    },
    {
      id: 3,
      name: 'Primeiro post do blog',
      password: 'Apenas um teste.',
      username: true,
      email: 'jh.tavares.jh@gmail.com',
    },
  ];

  const prismaMock = {
    users: {
      create: jest.fn().mockReturnValue(fakeUsers[0]),
      findMany: jest.fn().mockResolvedValue(fakeUsers),
      findUnique: jest.fn().mockResolvedValue(fakeUsers[0]),
      update: jest.fn().mockResolvedValue(fakeUsers[0]),
      delete: jest.fn(),
    },
  };


describe("AuthService", () => {
    let authService : AuthService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, PrismaService, JwtService, UserService]
        }).compile()

        authService = module.get<AuthService>(AuthService)
    })

    it('should be defined', () => {
        expect(authService).toBeDefined();
      });
})

describe('PostsService', () => {
    let service: UserService;
    let prisma: PrismaService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            UserService,PrismaService,
          { provide: PrismaService, useValue: prismaMock },
        ],
      }).compile();
  
      service = module.get<UserService>(UserService);
      prisma = module.get<PrismaService>(PrismaService);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('findAll', () => {
      it(`should return an array of posts`, async () => {
        const response = await service.getAllUser();
  
        expect(response).toEqual(fakeUsers);
         expect(prisma.users.findMany).toHaveBeenCalledTimes(1);
        expect(prisma.users.findMany).toHaveBeenCalledWith(/* nothing */);
      });
    });
  
 

    });
  
