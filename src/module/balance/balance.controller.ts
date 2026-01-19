import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { BalanceDto } from 'src/dto/balance/balance.dto';
import { BalanceService } from './balance.service';
import { Decimal } from '@prisma/client/runtime/client';
import { Transaction } from 'src/dto/balance/transaction.dto';

@Controller('balance')
@ApiTags('balance')
export class BalanceController {

    constructor(
        private balanceService: BalanceService
    ) { }

    @Get('/:id')
    @ApiParam({
        name: 'id',
        required: true,
        description: 'id',
        example: 1
    })
    async userBalance(
        @Param('id') id: string
    ) {
        return this.balanceService.userBalance(+id)
    }

    @Put('users')
    // @ApiParam({})
    @ApiBody({
        type: Transaction,
        description: '交易参数'
    })
    async userTransaction(
        @Body() data: Transaction
    ) {
        return this.balanceService.userTransaction(data)
    }

    @Get('user/:id')
    async getUserBalance(
        @Param('id') id: string
    ) {

    }
}
