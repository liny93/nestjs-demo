import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DevelopNoteDocument = DevelopNote & Document;

@Schema({
    collection: "develop_note",
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
})
export class DevelopNote {
    @Prop({ required: true })
    shopId: string
}

const schema = SchemaFactory.createForClass(DevelopNote);

export const DevelopNoteSchema = schema;