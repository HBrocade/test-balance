import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/client";

export class BalanceDto {
    @ApiProperty({
        example: 1,
        description: 'userId',
        required: true
    })
    userId: number;
    @ApiProperty({
        example: '0',
        description: 'amount',
        required: true
    })
    amount: Decimal;
}
