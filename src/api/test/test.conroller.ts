import { Controller, Delete, Get, HttpException, Post, Put, Query } from "@nestjs/common";
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
        return this.testService.test()
    }

    @Put()
    private testPut() {
        return this.testService.test()
    }

    @Delete()
    private testDelete() {
        return this.testService.test()
    }

    @Get('exception')
    private exception() {
        throw new HttpException('http exception', 400)
    }

    @Get('config')
    private config() {
        return this.testService.config()
    }
}