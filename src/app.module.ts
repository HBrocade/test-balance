import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './module/balance/balance.module';
import { UserModule } from './module/user/user.module';
import { PrismaModule } from './module/prisma/prisma.module';
// import { RedisModule } from '@nestjs-labs/nestjs-redis'
import { RedisModule } from '@nestjs-modules/ioredis';


@Module({
  imports: [
    // PrismaModule.forRoot(),
    RedisModule.forRoot({
      type: 'single',
      url: process.env.REDIS_HOST,
    }),
    BalanceModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
