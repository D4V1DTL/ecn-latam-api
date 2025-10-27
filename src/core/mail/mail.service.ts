import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailTemplates } from './enum/email-templates.enum.js';


@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) { }

  async sendMailTemplate(
    template: EmailTemplates,
    to: string,
    context: any,
  ): Promise<void> {
    const mailOptions = this.getMailOptions(template);
    context['website'] = this.configService.get<string>('FRONTEND_URL');
    context['year'] = new Date().getFullYear();
    context['logo'] = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fecnlatamapp.com%2F&psig=AOvVaw3SzTKleaL7fYcBdqnRgfd3&ust=1761607798053000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPj5pMuCw5ADFQAAAAAdAAAAABAE';
    await this.mailerService.sendMail({
      to,
      from: mailOptions.from,
      subject: mailOptions.subject,
      template, // nombre del archivo sin extensión
      context, // datos para la plantilla
    });
  }

  private getMailOptions(type: EmailTemplates): any {
    switch (type) {
      case EmailTemplates.RECOVERY_PASSWORD:
        return {
          from: this.configService.get<string>('EMAIL_USER'),
          subject: 'RECUPERACIÓN DE CONTRASEÑA',
        };
      case EmailTemplates.VALIDATE_SESSION_CODE:
        return {
          from: this.configService.get<string>('EMAIL_USER'),
          subject: 'CODIGO DE VALIDACIÓN SESIÓN',
        };
      case EmailTemplates.CHANGE_PASSWORD:
        return {
          from: this.configService.get<string>('EMAIL_USER'),
          subject: 'CAMBIO DE CONTRASEÑA',
        };
      case EmailTemplates.ININT_SESSION:
        return {
          from: this.configService.get<string>('EMAIL_USER'),
          subject: 'INICIO DE SESIÓN DETECTADO',
        };
      default:
        throw new Error('Tipo de correo no soportado');
    }
  }
}
