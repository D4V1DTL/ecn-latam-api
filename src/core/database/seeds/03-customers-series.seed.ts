import { DataSource } from "typeorm";
import { Customer } from "../../entities/core/customer.entity.js";
import { Series } from "../../entities/core/series.entity.js";
import { setSeedRef, getSeedRef } from "./seed-map.js";
import { SEED_REFS } from "./enums/seed-refs.js";

export async function seedCustomersAndSeries(dataSource: DataSource) {
    const customerRepo = dataSource.getRepository(Customer);
    const seriesRepo = dataSource.getRepository(Series);
    const companyId = getSeedRef(SEED_REFS.COMPANY.SOLUCIONES);

    // =========================================================
    // CLIENTES
    // =========================================================
    const constructora = await customerRepo.save({
        documentType: "6",
        documentNumber: "20112233445",
        name: "CONSTRUCTORA PERÚ S.A.",
        address: "Av. Grau 456, Arequipa",
        email: "compras@constructora.pe",
    });
    setSeedRef(SEED_REFS.CUSTOMERS.CONSTRUCTORA, constructora.id);

    const juan = await customerRepo.save({
        documentType: "1",
        documentNumber: "47655621",
        name: "Juan Pérez García",
        address: "Mz B Lt 12 Urb. Los Olivos",
        email: "juanperez@gmail.com",
    });
    setSeedRef(SEED_REFS.CUSTOMERS.JUAN_PEREZ, juan.id);

    const transportes = await customerRepo.save({
        documentType: "6",
        documentNumber: "20445566779",
        name: "TRANSPORTES ANDINOS S.R.L.",
        address: "Av. Industrial 890, Trujillo",
    });
    setSeedRef(SEED_REFS.CUSTOMERS.TRANSPORTES, transportes.id);

    const minera = await customerRepo.save({
        documentType: "6",
        documentNumber: "20555444333",
        name: "MINERA LOS INCAS S.A.C.",
        address: "Jr. Junín 1020, Cajamarca",
    });
    setSeedRef(SEED_REFS.CUSTOMERS.MINERA, minera.id);

    // =========================================================
    // SERIES
    // =========================================================
    const seriesFactura = await seriesRepo.save({
        company: { id: companyId },
        type: "01",
        prefix: "F001",
        currentNumber: 100,
    });
    setSeedRef(SEED_REFS.SERIES.FACTURA, seriesFactura.id);

    const seriesBoleta = await seriesRepo.save({
        company: { id: companyId },
        type: "03",
        prefix: "B001",
        currentNumber: 150,
    });
    setSeedRef(SEED_REFS.SERIES.BOLETA, seriesBoleta.id);

    const seriesNotaCredito = await seriesRepo.save({
        company: { id: companyId },
        type: "07",
        prefix: "FC01",
        currentNumber: 10,
    });
    setSeedRef(SEED_REFS.SERIES.NOTA_CREDITO, seriesNotaCredito.id);

    const seriesNotaDebito = await seriesRepo.save({
        company: { id: companyId },
        type: "08",
        prefix: "FD01",
        currentNumber: 5,
    });
    setSeedRef(SEED_REFS.SERIES.NOTA_DEBITO, seriesNotaDebito.id);

    const seriesGuia = await seriesRepo.save({
        company: { id: companyId },
        type: "09",
        prefix: "T001",
        currentNumber: 21,
    });
    setSeedRef(SEED_REFS.SERIES.GUIA, seriesGuia.id);

    console.log("✅ Clientes y series insertadas correctamente");
}
