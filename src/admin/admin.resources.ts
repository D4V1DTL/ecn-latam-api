import { ResourceWithOptions } from 'adminjs';
import {
    PerceptionCatalog,
    TaxCatalog,
    DetractionCatalog,
    Company,
    Establishment,
    Customer,
    Series,
    Document,
    DocumentItem,
    DocumentTax,
    DocumentLegend,
    DocumentRelated,
    DocumentPerception,
    DocumentDetraction,
    DocumentRetention,
    DocumentStatus,
    DocumentLog,
    DocumentFile,
    DocumentAllowanceCharge,
    ItemAllowanceCharge,
    ShippingGuide,
    ShippingDetail,
    Payment,
    Anticipation,
    DocumentAnticipation,
    Installment,
    DailySummary,
    DailySummaryItem,
    VoidCommunication,
    VoidCommunicationItem,
    DocumentAuditLog,
    Tax,
    DetractionRule,
    Currency,
    SendAttempt,
    SunatResponse,
    CreditNoteReason,
} from '../core/entities/index.js';

// ==========================================
// 🧩 Agrupación de recursos por módulo (en español)
// ==========================================
export const adminResources: ResourceWithOptions[] = [
    // =======================
    // 📚 CATÁLOGOS BASE
    // =======================
    {
        resource: PerceptionCatalog,
        options: { navigation: { name: 'Catálogos Base' }, listProperties: ['code', 'description', 'active'] },
    },
    { resource: TaxCatalog, options: { navigation: { name: 'Catálogos Base' } } },
    { resource: DetractionCatalog, options: { navigation: { name: 'Catálogos Base' } } },

    // =======================
    // 🏢 CORE
    // =======================
    { resource: Company, options: { navigation: { name: 'Empresas y Clientes' } } },
    { resource: Establishment, options: { navigation: { name: 'Empresas y Clientes' } } },
    { resource: Customer, options: { navigation: { name: 'Empresas y Clientes' } } },
    { resource: Series, options: { navigation: { name: 'Empresas y Clientes' } } },

    // =======================
    // 🧾 DOCUMENTOS
    // =======================
    { resource: Document, options: { navigation: { name: 'Documentos Electrónicos' } } },
    { resource: DocumentItem, options: { navigation: { name: 'Documentos Electrónicos' } } },
    { resource: DocumentTax, options: { navigation: { name: 'Documentos Electrónicos' } } },
    { resource: DocumentLegend, options: { navigation: { name: 'Documentos Electrónicos' } } },
    { resource: DocumentRelated, options: { navigation: { name: 'Documentos Electrónicos' } } },
    { resource: CreditNoteReason, options: { navigation: { name: 'Documentos Electrónicos' } } },
    { resource: DocumentPerception, options: { navigation: { name: 'Documentos Electrónicos' } } },
    { resource: DocumentDetraction, options: { navigation: { name: 'Documentos Electrónicos' } } },
    { resource: DocumentRetention, options: { navigation: { name: 'Documentos Electrónicos' } } },
    { resource: DocumentStatus, options: { navigation: { name: 'Documentos Electrónicos' } } },
    { resource: DocumentLog, options: { navigation: { name: 'Documentos Electrónicos' } } },
    { resource: DocumentFile, options: { navigation: { name: 'Documentos Electrónicos' } } },
    { resource: DocumentAllowanceCharge, options: { navigation: { name: 'Documentos Electrónicos' } } },
    { resource: ItemAllowanceCharge, options: { navigation: { name: 'Documentos Electrónicos' } } },
    { resource: ShippingGuide, options: { navigation: { name: 'Documentos Electrónicos' } } },
    { resource: ShippingDetail, options: { navigation: { name: 'Documentos Electrónicos' } } },

    // =======================
    // 💳 PAGOS Y CUOTAS
    // =======================
    { resource: Payment, options: { navigation: { name: 'Pagos y Cuotas' } } },
    { resource: Installment, options: { navigation: { name: 'Pagos y Cuotas' } } },
    { resource: Anticipation, options: { navigation: { name: 'Pagos y Cuotas' } } },
    { resource: DocumentAnticipation, options: { navigation: { name: 'Pagos y Cuotas' } } },

    // =======================
    // 🗓️ SUNAT (RESÚMENES Y BAJAS)
    // =======================
    { resource: DailySummary, options: { navigation: { name: 'SUNAT' } } },
    { resource: DailySummaryItem, options: { navigation: { name: 'SUNAT' } } },
    { resource: VoidCommunication, options: { navigation: { name: 'SUNAT' } } },
    { resource: VoidCommunicationItem, options: { navigation: { name: 'SUNAT' } } },

    // =======================
    // 🔍 AUDITORÍA
    // =======================
    { resource: DocumentAuditLog, options: { navigation: { name: 'Auditoría' } } },

    // =======================
    // ⚙️ CONFIGURACIÓN
    // =======================
    { resource: Tax, options: { navigation: { name: 'Configuración' } } },
    { resource: DetractionRule, options: { navigation: { name: 'Configuración' } } },
    { resource: Currency, options: { navigation: { name: 'Configuración' } } },
    { resource: SendAttempt, options: { navigation: { name: 'Configuración' } } },
    { resource: SunatResponse, options: { navigation: { name: 'Configuración' } } },
];
