import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TestService {
    private readonly logger = new Logger(TestService.name)

    constructor(
        private readonly configService: ConfigService
    ) { }

    public test() {
        return 'Hello World! 8899'
    }

    public config() {
        return this.configService.get('global')
    }


}