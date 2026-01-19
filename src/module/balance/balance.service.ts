import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/client';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { Transaction } from 'src/dto/balance/transaction.dto';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class BalanceService {

    constructor(
        private prisma: PrismaService,
        @InjectRedis()
        private readonly redis: Redis
    ) { }

    async userBalance(id: number) {
        const userStr = await this.redis.get(id.toString())

        if (userStr) {
            return JSON.parse(userStr)
        } else {
            const user = await this.prisma.user.findUnique({
                where: { id: id },
                select: {
                    endingBalance: true
                }
            })
            await this.redis.set(id.toString(), JSON.stringify(user), 'EX', 3600)
            return user
        }
    }

    async userTransaction(params: Transaction) {
        const userMap = new Map<number, Decimal>()

        const { checkBalance, transactions } = params
        const userIds = transactions.map((transaction) => {
            userMap.set(transaction.userId, transaction.amount)
            return transaction.userId
        })

        const users = await this.prisma.user.findMany({
            where: {
                id: { in: userIds }
            },
            select: {
                id: true,
                endingBalance: true
            }
        })

        const faills: number[] = []
        for (let i = 0; i < users.length; i++) {
            const amount = userMap.get(users[i].id) as Decimal
            const endingBalance = users[i].endingBalance.plus(amount)
            if (checkBalance) {
                if (endingBalance.comparedTo(0) > 0) {
                    await this.batch(users[i].id, amount, endingBalance, true)
                } else {
                    faills.push(users[i].id)
                }
            } else {
                const res = await this.batch(users[i].id, amount, endingBalance, false)
                if (!res) {
                    faills.push(users[i].id)
                }
            }
        }

        return faills
    }

    async batch(id: number, amount: Decimal, endingBalance: Decimal, checkBalance: boolean) {
        try {
            await Promise.all([
                this.prisma.user.update({
                    where: { id: id },
                    data: { endingBalance }
                }),
                this.prisma.balance.create({
                    data: {
                        checkBalance: checkBalance,
                        endingBalance,
                        userId: id,
                        amount
                    }
                })
            ])
            const user = {
                endingBalance
            }
            await this.redis.set(id.toString(), JSON.stringify(user), 'EX', 3600)
            return true
        } catch (error) {
            return false
        }
    }

}