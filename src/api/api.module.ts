import { Module } from "@nestjs/common";
import TestModule from "./test/test.module";

@Module({
    imports: [
        TestModule
    ],
    controllers: [],
    providers: []
})
export default class ApiModule { }