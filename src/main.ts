import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { setupAdmin } from './admin/admin.setup.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // Esto hará que /uploads/* sea público
  });

  const expressApp = app.getHttpAdapter().getInstance();
  await setupAdmin(expressApp);
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 API corriendo en http://localhost:${port}`);
  console.log(`🧑‍💻 AdminJS en http://localhost:${port}/admin`);
  console.log(`📁 Archivos servidos desde http://localhost:${port}/uploads`);
}
bootstrap();
