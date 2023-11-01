import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'bigint',
        unsigned: true
    })
    chat_id?: number;

    @Column({
        type: 'varchar',
        length: 128
    })
    name?: string;

    @Column({
        type: 'varchar',
        length: 128
    })
    username?: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}