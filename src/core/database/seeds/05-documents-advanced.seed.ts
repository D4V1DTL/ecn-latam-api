import { DataSource } from "typeorm";
import { Document } from "../../entities/documents/document.entity.js";
import { DocumentItem } from "../../entities/documents/document-item.entity.js";
import { DocumentTax } from "../../entities/documents/document-tax.entity.js";
import { DocumentDetraction } from "../../entities/documents/document-detraction.entity.js";
import { DocumentPerception } from "../../entities/documents/document-perception.entity.js";
import { DocumentRetention } from "../../entities/documents/document-retention.entity.js";
import { DocumentRelated } from "../../entities/documents/document-related.entity.js";
import { CreditNoteReason } from "../../entities/documents/credit-note-reason.entity.js";
import { Installment } from "../../entities/payments/installment.entity.js";
import { Anticipation } from "../../entities/payments/anticipation.entity.js";
import { DocumentAnticipation } from "../../entities/payments/document-anticipation.entity.js";
import { ShippingGuide } from "../../entities/documents/shipping-guide.entity.js";
import { ShippingDetail } from "../../entities/documents/shipping-detail.entity.js";
import { DocumentLegend } from "../../entities/documents/document-legend.entity.js";

import { getSeedRef } from "./seed-map.js";
import { SEED_REFS } from "./enums/seed-refs.js";

export async function seedDocumentsAdvanced(dataSource: DataSource) {
    const docRepo = dataSource.getRepository(Document);
    const itemRepo = dataSource.getRepository(DocumentItem);
    const taxRepo = dataSource.getRepository(DocumentTax);
    const detractionRepo = dataSource.getRepository(DocumentDetraction);
    const perceptionRepo = dataSource.getRepository(DocumentPerception);
    const retentionRepo = dataSource.getRepository(DocumentRetention);
    const relatedRepo = dataSource.getRepository(DocumentRelated);
    const reasonRepo = dataSource.getRepository(CreditNoteReason);
    const installmentRepo = dataSource.getRepository(Installment);
    const anticipationRepo = dataSource.getRepository(Anticipation);
    const docAntRepo = dataSource.getRepository(DocumentAnticipation);
    const guideRepo = dataSource.getRepository(ShippingGuide);
    const shipRepo = dataSource.getRepository(ShippingDetail);
    const legendRepo = dataSource.getRepository(DocumentLegend);

    // ============================================================
    // FACTURA CON DETRACCIÓN (12%)
    // ============================================================
    const facturaDetr = await docRepo.save(
        docRepo.create({
            company: { id: getSeedRef(SEED_REFS.COMPANY.SOLUCIONES) },
            establishment: { id: getSeedRef(SEED_REFS.ESTABLISHMENT.LIMA) },
            customer: { id: getSeedRef(SEED_REFS.CUSTOMERS.TRANSPORTES) },
            series: { id: getSeedRef(SEED_REFS.SERIES.FACTURA) },
            type: "01",
            number: 1003,
            issueDate: new Date(),
            currency: "PEN",
            paymentMethod: "contado",
            taxableAmount: 5000,
            igvAmount: 900,
            totalAmount: 5900,
        })
    );

    await itemRepo.save(
        itemRepo.create({
            document: facturaDetr,
            description: "Servicio de transporte de minerales",
            quantity: 1,
            unitValue: 5000,
            unitPrice: 5900,
            subtotal: 5000,
            igvAmount: 900,
            total: 5900,
        })
    );

    await taxRepo.save(
        taxRepo.create({
            document: facturaDetr,
            taxType: "1000",
            baseAmount: 5000,
            taxAmount: 900,
            percentage: 18,
        })
    );

    await detractionRepo.save(
        detractionRepo.create({
            document: facturaDetr,
            detractionCatalog: { code: "020" },
            percentage: 12,
            detractionAmount: 708,
            accountNumber: "000-222333444",
        })
    );

    await legendRepo.save(
        legendRepo.create({
            document: facturaDetr,
            code: "1000",
            value: "CINCO MIL NOVECIENTOS CON 00/100 SOLES",
        })
    );

    // ============================================================
    // FACTURA CON PERCEPCIÓN (2%)
    // ============================================================
    const facturaPerc = await docRepo.save(
        docRepo.create({
            company: { id: getSeedRef(SEED_REFS.COMPANY.SOLUCIONES) },
            establishment: { id: getSeedRef(SEED_REFS.ESTABLISHMENT.LIMA) },
            customer: { id: getSeedRef(SEED_REFS.CUSTOMERS.CONSTRUCTORA) },
            series: { id: getSeedRef(SEED_REFS.SERIES.FACTURA) },
            type: "01",
            number: 1004,
            issueDate: new Date(),
            currency: "PEN",
            paymentMethod: "contado",
            taxableAmount: 1000,
            igvAmount: 180,
            totalAmount: 1180,
            hasPerception: true,
            perceptionBase: 1180,
            perceptionPercentage: 2,
            perceptionAmount: 23.6,
        })
    );

    await itemRepo.save(
        itemRepo.create({
            document: facturaPerc,
            description: "Venta de combustible diesel",
            quantity: 1,
            unitValue: 1000,
            unitPrice: 1180,
            subtotal: 1000,
            igvAmount: 180,
            total: 1180,
        })
    );

    await perceptionRepo.save(
        perceptionRepo.create({
            document: facturaPerc,
            perceptionCatalog: { code: "01" },
            percentage: 2,
            amount: 23.6,
            baseAmount: 1180,
        })
    );

    await legendRepo.save(
        legendRepo.create({
            document: facturaPerc,
            code: "1000",
            value: "MIL CIENTO OCHENTA CON 00/100 SOLES",
        })
    );

    // ============================================================
    // FACTURA CON RETENCIÓN (3%)
    // ============================================================
    const facturaRet = await docRepo.save(
        docRepo.create({
            company: { id: getSeedRef(SEED_REFS.COMPANY.SOLUCIONES) },
            establishment: { id: getSeedRef(SEED_REFS.ESTABLISHMENT.LIMA) },
            customer: { id: getSeedRef(SEED_REFS.CUSTOMERS.TRANSPORTES) },
            series: { id: getSeedRef(SEED_REFS.SERIES.FACTURA) },
            type: "01",
            number: 1005,
            issueDate: new Date(),
            currency: "PEN",
            paymentMethod: "contado",
            taxableAmount: 3000,
            igvAmount: 540,
            totalAmount: 3540,
        })
    );

    await itemRepo.save(
        itemRepo.create({
            document: facturaRet,
            description: "Servicio de mantenimiento de flota",
            quantity: 1,
            unitValue: 3000,
            unitPrice: 3540,
            subtotal: 3000,
            igvAmount: 540,
            total: 3540,
        })
    );

    await retentionRepo.save(
        retentionRepo.create({
            document: facturaRet,
            retentionPercentage: 3,
            retainedAmount: 106.2,
            paymentAmount: 3433.8,
        })
    );

    await legendRepo.save(
        legendRepo.create({
            document: facturaRet,
            code: "1000",
            value: "TRES MIL QUINIENTOS CUARENTA CON 00/100 SOLES",
        })
    );

    // ============================================================
    // FACTURA CON ANTICIPO APLICADO
    // ============================================================
    const anticipo = await anticipationRepo.save(
        anticipationRepo.create({
            company: { id: getSeedRef(SEED_REFS.COMPANY.SOLUCIONES) },
            customer: { id: getSeedRef(SEED_REFS.CUSTOMERS.CONSTRUCTORA) },
            issueDate: new Date(),
            totalAmount: 1000,
            balanceAmount: 1000,
            reference: "Anticipo de proyecto web",
            currency: "PEN",
            paymentMethod: "TRANSFERENCIA",
        })
    );

    const facturaAnt = await docRepo.save(
        docRepo.create({
            company: { id: getSeedRef(SEED_REFS.COMPANY.SOLUCIONES) },
            establishment: { id: getSeedRef(SEED_REFS.ESTABLISHMENT.LIMA) },
            customer: { id: getSeedRef(SEED_REFS.CUSTOMERS.CONSTRUCTORA) },
            series: { id: getSeedRef(SEED_REFS.SERIES.FACTURA) },
            type: "01",
            number: 1006,
            issueDate: new Date(),
            currency: "PEN",
            paymentMethod: "contado",
            taxableAmount: 2000,
            igvAmount: 360,
            totalAmount: 2360,
            anticipationAmount: 1000,
        })
    );

    await docAntRepo.save(
        docAntRepo.create({
            document: facturaAnt,
            anticipation: anticipo,
            appliedAmount: 1000,
        })
    );

    // ============================================================
    // FACTURA CON CRÉDITO Y CUOTAS
    // ============================================================
    const facturaCred = await docRepo.save(
        docRepo.create({
            company: { id: getSeedRef(SEED_REFS.COMPANY.SOLUCIONES) },
            establishment: { id: getSeedRef(SEED_REFS.ESTABLISHMENT.LIMA) },
            customer: { id: getSeedRef(SEED_REFS.CUSTOMERS.CONSTRUCTORA) },
            series: { id: getSeedRef(SEED_REFS.SERIES.FACTURA) },
            type: "01",
            number: 1007,
            issueDate: new Date(),
            currency: "PEN",
            paymentMethod: "credito",
            taxableAmount: 4000,
            igvAmount: 720,
            totalAmount: 4720,
        })
    );

    await installmentRepo.save([
        installmentRepo.create({
            document: facturaCred,
            installmentNumber: 1,
            dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            amount: 2360,
        }),
        installmentRepo.create({
            document: facturaCred,
            installmentNumber: 2,
            dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
            amount: 2360,
        }),
    ]);

    // ============================================================
    // NOTA DE CRÉDITO (Anulación de Factura)
    // ============================================================
    const reason = await reasonRepo.findOneBy({ code: "01" });

    const notaCredito = await docRepo.save(
        docRepo.create({
            company: { id: getSeedRef(SEED_REFS.COMPANY.SOLUCIONES) },
            establishment: { id: getSeedRef(SEED_REFS.ESTABLISHMENT.LIMA) },
            customer: { id: getSeedRef(SEED_REFS.CUSTOMERS.CONSTRUCTORA) },
            series: { id: getSeedRef(SEED_REFS.SERIES.NOTA_CREDITO) },
            type: "07",
            number: 10,
            issueDate: new Date(),
            currency: "PEN",
            paymentMethod: "contado",
            totalAmount: -4720,
        })
    );

    await relatedRepo.save(
        relatedRepo.create({
            document: notaCredito,
            relatedDocument: facturaCred,
            relationType: "NC",
            reason: "Anulación total de la operación",
            reasonCode: reason?.code ?? "01",
        })
    );

    // ============================================================
    // GUÍA DE REMISIÓN
    // ============================================================
    const guia = await docRepo.save(
        docRepo.create({
            company: { id: getSeedRef(SEED_REFS.COMPANY.SOLUCIONES) },
            establishment: { id: getSeedRef(SEED_REFS.ESTABLISHMENT.LIMA) },
            customer: { id: getSeedRef(SEED_REFS.CUSTOMERS.TRANSPORTES) },
            series: { id: getSeedRef(SEED_REFS.SERIES.GUIA) },
            type: "01",
            number: 1008,
            issueDate: new Date(),
            currency: "PEN",
            totalAmount: 0,
        })
    );

    await guideRepo.save(
        guideRepo.create({
            document: guia,
            guideNumber: "T001-000021",
            guideType: "09",
        })
    );

    await shipRepo.save(
        shipRepo.create({
            document: guia,
            modeOfTransport: "Transporte privado",
            transporterRuc: "20445566779",
            transporterName: "TRANSPORTES ANDINOS S.R.L.",
            vehiclePlate: "BHZ-985",
            driverLicense: "E12345678",
            startAddress: "Av. Industrial 890 - Trujillo",
            arrivalAddress: "Av. Grau 456 - Arequipa",
            packages: 20,
            shipmentDate: new Date(),
        })
    );

    console.log("✅ Documentos avanzados creados correctamente");
}
