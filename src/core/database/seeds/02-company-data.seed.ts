import { DataSource } from "typeorm";
import { Company } from "../../entities/core/company.entity.js";
import { Establishment } from "../../entities/core/establishment.entity.js";
import { setSeedRef } from "./seed-map.js";
import { SEED_REFS } from "./enums/seed-refs.js";

export async function seedCompanyData(dataSource: DataSource) {
    const companyRepo = dataSource.getRepository(Company);
    const estabRepo = dataSource.getRepository(Establishment);

    // Empresa principal
    const company = companyRepo.create({
        ruc: "20601234567",
        taxRegime: "GENERAL",
        legalName: "SOLUCIONES DIGITALES S.A.C.",
        comercialName: "Soluciones SAC",
        address: "Av. La Molina 123, Lima",
        email: "facturacion@soluciones.pe",
        phone: "999888777",
        logoUrl: "/logos/soluciones.png",
        certificatePath: "/certs/soluciones.pfx",
        certificatePassword: "clave123",
    });

    await companyRepo.save(company);
    setSeedRef(SEED_REFS.COMPANY.SOLUCIONES, company.id);

    // Establecimientos
    const estabLima = estabRepo.create({
        company,
        code: "001",
        address: "Av. La Molina 123, Lima",
        ubigeo: "150113",
        department: "LIMA",
        province: "LIMA",
        district: "LA MOLINA",
    });

    const estabArequipa = estabRepo.create({
        company,
        code: "002",
        address: "Av. Los Héroes 890, Arequipa",
        ubigeo: "040101",
        department: "AREQUIPA",
        province: "AREQUIPA",
        district: "CERCADO",
    });

    await estabRepo.save([estabLima, estabArequipa]);
    setSeedRef(SEED_REFS.ESTABLISHMENT.LIMA, estabLima.id);
    setSeedRef(SEED_REFS.ESTABLISHMENT.AREQUIPA, estabArequipa.id);

    console.log("Empresa y establecimientos insertados");
}
