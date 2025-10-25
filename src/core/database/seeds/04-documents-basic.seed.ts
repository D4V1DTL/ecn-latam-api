import { DataSource } from "typeorm";
import { Document } from "../../entities/documents/document.entity.js";
import { DocumentItem } from "../../entities/documents/document-item.entity.js";
import { DocumentTax } from "../../entities/documents/document-tax.entity.js";
import { DocumentLegend } from "../../entities/documents/document-legend.entity.js";
import { DocumentAllowanceCharge } from "../../entities/documents/document-allowance-charge.entity.js";
import { getSeedRef } from "./seed-map.js";
import { SEED_REFS } from "./enums/seed-refs.js";

export async function seedDocumentsBasic(dataSource: DataSource) {
    const docRepo = dataSource.getRepository(Document);
    const itemRepo = dataSource.getRepository(DocumentItem);
    const taxRepo = dataSource.getRepository(DocumentTax);
    const legendRepo = dataSource.getRepository(DocumentLegend);
    const allowRepo = dataSource.getRepository(DocumentAllowanceCharge);

    // ============================================================
    // FACTURA 1 - Servicios gravados (IGV 18%) con descuento global
    // ============================================================
    const factura1 = await docRepo.save(
        docRepo.create({
            company: { id: getSeedRef(SEED_REFS.COMPANY.SOLUCIONES) },
            establishment: { id: getSeedRef(SEED_REFS.ESTABLISHMENT.LIMA) },
            customer: { id: getSeedRef(SEED_REFS.CUSTOMERS.CONSTRUCTORA) },
            series: { id: getSeedRef(SEED_REFS.SERIES.FACTURA) },
            type: "01",
            number: 1001,
            issueDate: new Date(),
            currency: "PEN",
            paymentMethod: "contado",
            taxableAmount: 2500.0,
            igvAmount: 450.0,
            totalAmount: 2950.0,
        })
    );

    await itemRepo.save([
        itemRepo.create({
            document: factura1,
            description: "Consultoría de software empresarial",
            quantity: 1,
            unitValue: 1500.0,
            unitPrice: 1770.0,
            subtotal: 1500.0,
            igvAmount: 270.0,
            total: 1770.0,
        }),
        itemRepo.create({
            document: factura1,
            description: "Mantenimiento y soporte técnico",
            quantity: 1,
            unitValue: 1000.0,
            unitPrice: 1180.0,
            subtotal: 1000.0,
            igvAmount: 180.0,
            total: 1180.0,
        }),
    ]);

    await taxRepo.save(
        taxRepo.create({
            document: factura1,
            taxType: "1000",
            baseAmount: 2500.0,
            taxAmount: 450.0,
            percentage: 18.0,
        })
    );

    await allowRepo.save(
        allowRepo.create({
            document: factura1,
            isCharge: false,
            reason: "Descuento por volumen 5%",
            amount: 125.0,
            factor: 0.05,
            affectsTaxable: true,
        })
    );

    await legendRepo.save(
        legendRepo.create({
            document: factura1,
            code: "1000",
            value: "DOS MIL NOVECIENTOS CINCUENTA CON 00/100 SOLES",
        })
    );

    // ============================================================
    // BOLETA 1 - Productos gravados + ISC (cerveza)
    // ============================================================
    const boleta1 = await docRepo.save(
        docRepo.create({
            company: { id: getSeedRef(SEED_REFS.COMPANY.SOLUCIONES) },
            establishment: { id: getSeedRef(SEED_REFS.ESTABLISHMENT.AREQUIPA) },
            customer: { id: getSeedRef(SEED_REFS.CUSTOMERS.JUAN_PEREZ) },
            series: { id: getSeedRef(SEED_REFS.SERIES.BOLETA) },
            type: "03",
            number: 1501,
            issueDate: new Date(),
            currency: "PEN",
            paymentMethod: "contado",
            taxableAmount: 400.0,
            igvAmount: 72.0,
            iscAmount: 40.0,
            totalAmount: 512.0,
        })
    );

    await itemRepo.save(
        itemRepo.create({
            document: boleta1,
            description: "Pack de cerveza artesanal 24u",
            quantity: 1,
            unitValue: 400.0,
            unitPrice: 472.0,
            subtotal: 400.0,
            igvAmount: 72.0,
            iscAmount: 40.0,
            total: 512.0,
        })
    );

    await taxRepo.save([
        taxRepo.create({
            document: boleta1,
            taxType: "1000",
            baseAmount: 400.0,
            taxAmount: 72.0,
            percentage: 18.0,
        }),
        taxRepo.create({
            document: boleta1,
            taxType: "2000",
            baseAmount: 400.0,
            taxAmount: 40.0,
            percentage: 10.0,
        }),
    ]);

    await legendRepo.save(
        legendRepo.create({
            document: boleta1,
            code: "1000",
            value: "QUINIENTOS DOCE CON 00/100 SOLES",
        })
    );

    // ============================================================
    // FACTURA 2 - Venta mixta (exonerada + gravada)
    // ============================================================
    const factura2 = await docRepo.save(
        docRepo.create({
            company: { id: getSeedRef(SEED_REFS.COMPANY.SOLUCIONES) },
            establishment: { id: getSeedRef(SEED_REFS.ESTABLISHMENT.LIMA) },
            customer: { id: getSeedRef(SEED_REFS.CUSTOMERS.CONSTRUCTORA) },
            series: { id: getSeedRef(SEED_REFS.SERIES.FACTURA) },
            type: "01",
            number: 1002,
            issueDate: new Date(),
            currency: "PEN",
            paymentMethod: "contado",
            taxableAmount: 500.0,
            exoneratedAmount: 300.0,
            igvAmount: 90.0,
            totalAmount: 890.0,
        })
    );

    await itemRepo.save([
        itemRepo.create({
            document: factura2,
            description: "Licencia de software (gravado)",
            quantity: 1,
            unitValue: 500.0,
            unitPrice: 590.0,
            subtotal: 500.0,
            igvAmount: 90.0,
            total: 590.0,
        }),
        itemRepo.create({
            document: factura2,
            description: "Servicio educativo (exonerado)",
            quantity: 1,
            unitValue: 300.0,
            unitPrice: 300.0,
            subtotal: 300.0,
            total: 300.0,
            igvType: "20",
        }),
    ]);

    await taxRepo.save(
        taxRepo.create({
            document: factura2,
            taxType: "1000",
            baseAmount: 500.0,
            taxAmount: 90.0,
            percentage: 18.0,
        })
    );

    await legendRepo.save(
        legendRepo.create({
            document: factura2,
            code: "1000",
            value: "OCHOCIENTOS NOVENTA CON 00/100 SOLES",
        })
    );

    console.log("✅ Documentos básicos creados correctamente");
}
