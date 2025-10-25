import { DataSource } from "typeorm";
import { PerceptionCatalog } from "../../entities/catalogs/perception-catalog.entity.js";
import { TaxCatalog } from "../../entities/catalogs/tax-catalog.entity.js";
import { DetractionCatalog } from "../../entities/catalogs/detraction-catalog.entity.js";
import { CreditNoteReason } from "../../entities/documents/credit-note-reason.entity.js";

export async function seedBaseCatalogs(dataSource: DataSource) {
    const perceptionRepo = dataSource.getRepository(PerceptionCatalog);
    const taxRepo = dataSource.getRepository(TaxCatalog);
    const detractionRepo = dataSource.getRepository(DetractionCatalog);
    const creditReasonRepo = dataSource.getRepository(CreditNoteReason);

    await perceptionRepo.insert([
        { code: "01", description: "Percepción a combustibles líquidos", active: true },
        { code: "02", description: "Percepción a bienes", active: true },
        { code: "03", description: "Percepción a servicios", active: true },
    ]);

    await taxRepo.insert([
        { code: "1000", description: "IGV - Impuesto General a las Ventas", active: true },
        { code: "2000", description: "ISC - Impuesto Selectivo al Consumo", active: true },
        { code: "7152", description: "ICBPER - Impuesto al consumo de bolsas plásticas", active: true },
        { code: "9999", description: "Otros tributos", active: true },
    ]);

    await detractionRepo.insert([
        { code: "019", description: "Servicio de transporte de bienes", active: true },
        { code: "020", description: "Servicios diversos (consultoría, mantenimiento, etc.)", active: true },
        { code: "021", description: "Arrendamiento de bienes", active: true },
        { code: "030", description: "Venta de oro y minerales", active: true },
    ]);

    await creditReasonRepo.insert([
        { code: "01", description: "Anulación de la operación", active: true },
        { code: "02", description: "Anulación por error en el RUC", active: true },
        { code: "03", description: "Corrección por error en la descripción", active: true },
        { code: "06", description: "Descuento global", active: true },
    ]);
}
