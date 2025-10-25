import "reflect-metadata";
import { AppDataSource } from "../../functions/data-source.js";
import { seedBaseCatalogs } from "./01-base-catalogs.seed.js";
import { seedCompanyData } from "./02-company-data.seed.js";
import { seedCustomersAndSeries } from "./03-customers-series.seed.js";
import { seedDocumentsBasic } from "./04-documents-basic.seed.js";
import { seedDocumentsAdvanced } from "./05-documents-advanced.seed.js";

(async () => {
    await AppDataSource.initialize();
    console.log("🌱 Iniciando Seeders...");

    await seedBaseCatalogs(AppDataSource);
    await seedCompanyData(AppDataSource);
    await seedCustomersAndSeries(AppDataSource);
    await seedDocumentsBasic(AppDataSource);
    await seedDocumentsAdvanced(AppDataSource);

    console.log("✅ Seeders completados con éxito");
    await AppDataSource.destroy();
})();
