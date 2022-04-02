import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class AddLog {
    @ApiProperty()
    @IsString()
    shopId: string

    @ApiProperty()
    @IsString()
    platform: string

    @ApiProperty()
    @IsString()
    type: string

    @ApiProperty()
    @IsString()
    event: string

    @ApiProperty()
    @IsString()
    message: string

    @ApiProperty()
    @IsString()
    data: string

    @ApiProperty()
    @IsString()
    time: string
}