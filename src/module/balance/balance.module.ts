import { forwardRef, Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    forwardRef(() => PrismaModule)
  ],
  controllers: [BalanceController],
  providers: [BalanceService]
})
export class BalanceModule { }
