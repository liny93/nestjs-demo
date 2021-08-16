import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class LogService {
    private readonly logger = new Logger(LogService.name)

    constructor(
    ) { }

    public test() {
        return 'test role'
    }
}