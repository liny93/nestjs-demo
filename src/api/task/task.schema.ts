import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({
    collection: "task",
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
})
export class Task {
    _id: string

    @Prop()
    shopId: string

    @Prop()
    platform: string

    @Prop()
    type: string

    @Prop()
    event: string

    @Prop()
    message: string

    @Prop()
    data: string

    @Prop()
    time: string
}

const schema = SchemaFactory.createForClass(Task);

export const TaskSchema = schema;