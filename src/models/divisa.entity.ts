import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('divisas')
export class Divisa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    monedaOrigen: string;

    @Column({ nullable: false })
    monedaDestino: string;

    @Column({ nullable: false })
    tipo: string;

    @Column({ nullable: false })
    fecha: Date;

    @Column({ type: 'decimal', precision: 5, scale: 3, default: 0, nullable: false})
    tipoCambio: number;
}