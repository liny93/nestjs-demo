import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateNoteReq } from "../dto/local.dto";
import { LocalNote, LocalNoteDocument } from "../schemas/local.schema";


@Injectable()
export class LocalNoteService {
    constructor(
        @InjectModel(LocalNote.name) private localNoteModel: Model<LocalNoteDocument>
    ) { }

    async findAll(): Promise<LocalNote[]> {
        return this.localNoteModel.find().exec()
    }

    async addNote(create: CreateNoteReq): Promise<LocalNote> {
        const createdCat = new this.localNoteModel(create);
        return createdCat.save();
    }

    async getNoteByGroup(group: string) {
        return this.localNoteModel.find({
            group: group
        })
    }
}