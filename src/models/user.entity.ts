import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100, nullable: false })
    name: string

    @Column({ name:'last_name', length: 100, nullable: true })
    lastName: string
    
    @Column({ length: 100, unique: true, nullable: false })
    email: string

    @Column({ length: 100, nullable: false })
    password: string

    @Column({ name: 'is_active', default: true })
    isActive: boolean

    @Column({ name: 'refresh_token', nullable: true })
    refreshToken: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date
}