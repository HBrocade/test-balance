import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }
    @Get('')
    async test() {
        return this.userService.test()
    }

    @Post()
    async post() {
        return this.userService.add()
    }
}
