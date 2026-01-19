import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
// import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    forwardRef(() => PrismaModule)
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
