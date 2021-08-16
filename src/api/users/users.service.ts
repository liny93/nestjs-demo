import { Injectable, Logger } from "@nestjs/common";
import User from "@src/entities/user.entity";

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name)
    private readonly users: User[]

    constructor(
    ) { }

    public test() {
        return 'test role'
    }
}