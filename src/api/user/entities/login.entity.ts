import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('login_record')
export class LoginRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    token: string;

    @Column()
    time: Date;
}