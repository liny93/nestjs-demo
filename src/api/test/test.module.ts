import { Module } from "@nestjs/common";
import { TestController } from "./test.conroller";
import { TestService } from "./test.service";


@Module({
    imports: [],
    controllers: [TestController],
    providers: [TestService]
})
export default class TestModule { }