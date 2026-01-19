import { ApiProperty } from "@nestjs/swagger";
import { BalanceDto } from "./balance.dto";

export class Transaction {

    @ApiProperty({
        example: true
    })
    checkBalance: boolean

    @ApiProperty({
        example: [{
            userId: 1,
            amount: 0
        }]
    })
    transactions: BalanceDto[]
}