import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shipping_details')
export class ShippingDetail extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'mode_of_transport', length: 50, nullable: true })
    modeOfTransport?: string;

    @Column({ name: 'transporter_ruc', length: 20, nullable: true })
    transporterRuc?: string;

    @Column({ name: 'transporter_name', length: 255, nullable: true })
    transporterName?: string;

    @Column({ name: 'vehicle_plate', length: 20, nullable: true })
    vehiclePlate?: string;

    @Column({ name: 'driver_license', length: 50, nullable: true })
    driverLicense?: string;

    @Column({ name: 'start_ubigeo', length: 6, nullable: true })
    startUbigeo?: string;

    @Column({ name: 'start_address', length: 255, nullable: true })
    startAddress?: string;

    @Column({ name: 'arrival_ubigeo', length: 6, nullable: true })
    arrivalUbigeo?: string;

    @Column({ name: 'arrival_address', length: 255, nullable: true })
    arrivalAddress?: string;

    @Column({ name: 'gross_weight', type: 'decimal', precision: 10, scale: 3, nullable: true })
    grossWeight?: number;

    @Column({ type: 'int', nullable: true })
    packages?: number;

    @Column({ name: 'shipment_date', type: 'date', nullable: true })
    shipmentDate?: Date;

    @ManyToOne('documents', (doc: any) => doc.shippingDetails, { onDelete: 'CASCADE' })
    document!: any;
}
