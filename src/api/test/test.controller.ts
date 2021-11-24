import { Body, Controller, Delete, Get, HttpException, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@src/common/guard/auth.guard";
import { query } from "express";
import { TestService } from "./test.service";

@Controller('test')

export class TestController {
    constructor(
        private readonly testService: TestService
    ) { }

    @Get()
    private test() {
        return this.testService.test()
    }

    @Post()
    private testPost() {
        return "test post"
    }

    @Put()
    private testPut() {
        return "test put"
    }

    @Delete()
    private testDelete() {
        return "test delete"
    }

    @Get('exception')
    private exception() {
        throw new HttpException('http exception', 400)
    }

    @Get('config')
    private config() {
        return this.testService.config()
    }

    @Get('redis')
    @UseGuards(new AuthGuard())
    private async redisTest() {
        return await this.testService.redisTest()
    }

    /**
     * 可以指定参数
     * @param arg 
     */
    @Post('post2')
    private async postTest2(@Body('arg') arg) {
        return `get arg: ${arg}`
    }
}