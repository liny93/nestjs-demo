import { Module } from "@nestjs/common";
import RoleModule from "./role/role.module";
import TestModule from "./test/test.module";

@Module({
    imports: [
        TestModule,
        RoleModule,
    ],
    controllers: [],
    providers: []
})
export default class ApiModule { }