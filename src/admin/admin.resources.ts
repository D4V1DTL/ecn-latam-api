import { ResourceWithOptions } from 'adminjs';
import {
    Bundle,
    BundleItem,
    Course,
    CourseClass,
    CourseMaterial,
    Event,
    EventRegistration,
    Notification,
    Payment,
    PaymentItem,
    Plan,
    PlanEntitlement,
    Referral,
    ReferralCommission,
    ReferralConfig,
    ReferralPolicy,
    ReferralSlot,
    PurchaseEntitlement,
    Role,
    School,
    Subscription,
    SubscriptionEntitlement,
    User,
    UserNotificationSetting,
    UserRole,
} from '../core/entities/index.js';

// ==========================================
// 🧩 Agrupación de recursos por módulo
// ==========================================
export const adminResources: ResourceWithOptions[] = [
    // =======================
    // 👤 USUARIOS Y ROLES
    // =======================
    {
        resource: User,
        options: {
            navigation: { name: 'Usuarios y Roles', icon: 'User' },
            listProperties: ['id', 'name', 'email', 'isActive', 'createdAt'],
            properties: { password: { type: 'password' } },
            titleProperty: 'name',
        },
    },
    {
        resource: Role,
        options: {
            navigation: { name: 'Usuarios y Roles', icon: 'Shield' },
            listProperties: ['id', 'name', 'description', 'createdAt'],
            titleProperty: 'name',
        },
    },
    {
        resource: UserRole,
        options: {
            navigation: { name: 'Usuarios y Roles', icon: 'Users' },
            listProperties: ['user', 'role'],
            titleProperty: 'user',
        },
    },
    {
        resource: UserNotificationSetting,
        options: {
            navigation: { name: 'Usuarios y Roles', icon: 'Bell' },
            listProperties: ['user', 'emailEnabled', 'pushEnabled'],
            titleProperty: 'user',
        },
    },

    // =======================
    // 🏫 ESCUELAS Y CURSOS
    // =======================
    {
        resource: School,
        options: {
            navigation: { name: 'Escuelas y Cursos', icon: 'GraduationCap' },
            listProperties: ['id', 'name', 'isActive', 'createdAt'],
            titleProperty: 'name',
        },
    },
    {
        resource: Course,
        options: {
            navigation: { name: 'Escuelas y Cursos', icon: 'BookOpen' },
            listProperties: ['id', 'title', 'price', 'isPublished', 'teacher'],
            titleProperty: 'title',
        },
    },
    {
        resource: CourseClass,
        options: {
            navigation: { name: 'Escuelas y Cursos', icon: 'Video' },
            listProperties: ['id', 'title', 'startsAt', 'durationMinutes'],
            titleProperty: 'title',
        },
    },
    {
        resource: CourseMaterial,
        options: {
            navigation: { name: 'Escuelas y Cursos', icon: 'FileText' },
            listProperties: ['id', 'title', 'type', 'url'],
            titleProperty: 'title',
        },
    },

    // =======================
    // 📦 BUNDLES
    // =======================
    {
        resource: Bundle,
        options: {
            navigation: { name: 'Bundles', icon: 'Package' },
            listProperties: ['id', 'name', 'price', 'isActive'],
            titleProperty: 'name',
        },
    },
    {
        resource: BundleItem,
        options: {
            navigation: { name: 'Bundles', icon: 'Layers' },
            listProperties: ['bundle', 'itemType', 'school', 'course'],
            titleProperty: 'bundle',
        },
    },

    // =======================
    // 💳 PLANES Y SUSCRIPCIONES
    // =======================
    {
        resource: Plan,
        options: {
            navigation: { name: 'Planes y Suscripciones', icon: 'CreditCard' },
            listProperties: ['id', 'name', 'price', 'durationMonths', 'isActive'],
            titleProperty: 'name',
        },
    },
    {
        resource: PlanEntitlement,
        options: {
            navigation: { name: 'Planes y Suscripciones', icon: 'Puzzle' },
            listProperties: ['plan', 'targetType', 'targetId'],
            titleProperty: 'targetType',
        },
    },
    {
        resource: Subscription,
        options: {
            navigation: { name: 'Planes y Suscripciones', icon: 'Repeat' },
            listProperties: ['id', 'user', 'plan', 'startDate', 'endDate', 'isActive'],
            titleProperty: 'id',
        },
    },
    {
        resource: SubscriptionEntitlement,
        options: {
            navigation: { name: 'Planes y Suscripciones', icon: 'Layers' },
            listProperties: ['subscription', 'targetType', 'startDate', 'endDate'],
            titleProperty: 'targetType',
        },
    },

    // =======================
    // 💰 PAGOS Y COMPRAS
    // =======================
    {
        resource: Payment,
        options: {
            navigation: { name: 'Pagos y Compras', icon: 'DollarSign' },
            listProperties: ['id', 'payer', 'amount', 'status', 'createdAt'],
            titleProperty: 'id',
        },
    },
    {
        resource: PaymentItem,
        options: {
            navigation: { name: 'Pagos y Compras', icon: 'ShoppingCart' },
            listProperties: ['payment', 'itemType', 'itemId', 'lineTotal'],
            titleProperty: 'itemType',
        },
    },
    {
        resource: PurchaseEntitlement,
        options: {
            navigation: { name: 'Pagos y Compras', icon: 'Gift' },
            listProperties: ['user', 'targetType', 'targetId', 'startDate', 'endDate'],
            titleProperty: 'targetType',
        },
    },

    // =======================
    // 👥 REFERIDOS
    // =======================
    {
        resource: ReferralConfig,
        options: {
            navigation: { name: 'Referidos', icon: 'Settings' },
            listProperties: ['id', 'defaultMaxReferrals', 'createdAt'],
            titleProperty: 'id',
        },
    },
    {
        resource: ReferralPolicy,
        options: {
            navigation: { name: 'Referidos', icon: 'Sliders' },
            listProperties: ['id', 'scope', 'plan', 'productType', 'active'],
            titleProperty: 'scope',
        },
    },
    {
        resource: Referral,
        options: {
            navigation: { name: 'Referidos', icon: 'Users' },
            listProperties: ['referrer', 'referred', 'active', 'createdAt'],
            titleProperty: 'referrer',
        },
    },
    {
        resource: ReferralSlot,
        options: {
            navigation: { name: 'Referidos', icon: 'Database' },
            listProperties: ['user', 'maxSlots'],
            titleProperty: 'user',
        },
    },
    {
        resource: ReferralCommission,
        options: {
            navigation: { name: 'Referidos', icon: 'Percent' },
            listProperties: ['referrer', 'referred', 'commissionAmount', 'phase', 'status'],
            titleProperty: 'referrer',
        },
    },

    // =======================
    // 🎥 EVENTOS
    // =======================
    {
        resource: Event,
        options: {
            navigation: { name: 'Eventos', icon: 'Calendar' },
            listProperties: ['id', 'title', 'eventDate', 'price', 'isActive'],
            titleProperty: 'title',
        },
    },
    {
        resource: EventRegistration,
        options: {
            navigation: { name: 'Eventos', icon: 'ClipboardList' },
            listProperties: ['event', 'user', 'paymentItem', 'createdAt'],
            titleProperty: 'event',
        },
    },

    // =======================
    // 🔔 NOTIFICACIONES
    // =======================
    {
        resource: Notification,
        options: {
            navigation: { name: 'Notificaciones', icon: 'Bell' },
            listProperties: ['user', 'type', 'title', 'isRead', 'createdAt'],
            titleProperty: 'title',
        },
    },
];
