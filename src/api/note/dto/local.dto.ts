import { IsOptional, IsString } from "class-validator"

export class CreateNoteReq {
    @IsString()
    group: string

    @IsString()
    title: string

    @IsString()
    content: string

    @IsOptional()
    type: string
}

export class GetNoteByGroupReq {
    @IsString()
    group: string
}