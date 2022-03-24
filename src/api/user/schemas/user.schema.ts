import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
    collection: "user",
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
})
export class User {
    _id: string

    @Prop({ unique: true })
    username: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    roles: string[]
}

const schema = SchemaFactory.createForClass(User);

export const UserSchema = schema;