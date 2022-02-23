import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocalNoteDocument = LocalNote & Document;

@Schema({
    collection: "local_note",
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
})
export class LocalNote {
    @Prop({ required: true })
    group: string

    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    content: string

    @Prop()
    type: string
}

const schema = SchemaFactory.createForClass(LocalNote);

export const LocalNoteSchema = schema;