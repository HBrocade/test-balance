import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, Balance } from '@prisma/client';
import { RedisService } from '@nestjs-labs/nestjs-redis';

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService
    ) { }

    async test(): Promise<User[]> {
        return this.prisma.user.findMany({})
    }

    async add() {
        const now = new Date().getTime().toString()
        return this.prisma.user.create({
            data: {
                name: 'name',
                account: now.slice(0, 11),
            }
        })
    }
}

