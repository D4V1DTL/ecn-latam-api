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
        },
    },
    {
        resource: Role,
        options: {
            navigation: { name: 'Usuarios y Roles', icon: 'Shield' },
        },
    },
    {
        resource: UserRole,
        options: {
            navigation: { name: 'Usuarios y Roles', icon: 'Users' },
        },
    },
    {
        resource: UserNotificationSetting,
        options: {
            navigation: { name: 'Usuarios y Roles', icon: 'Bell' },
        },
    },

    // =======================
    // 🏫 ESCUELAS Y CURSOS
    // =======================
    {
        resource: School,
        options: {
            navigation: { name: 'Escuelas y Cursos', icon: 'GraduationCap' },
        },
    },
    {
        resource: Course,
        options: {
            navigation: { name: 'Escuelas y Cursos', icon: 'BookOpen' },
        },
    },
    {
        resource: CourseClass,
        options: {
            navigation: { name: 'Escuelas y Cursos', icon: 'Video' },
        },
    },
    {
        resource: CourseMaterial,
        options: {
            navigation: { name: 'Escuelas y Cursos', icon: 'FileText' },
        },
    },

    // =======================
    // 📦 BUNDLES
    // =======================
    {
        resource: Bundle,
        options: {
            navigation: { name: 'Bundles', icon: 'Package' },
        },
    },
    {
        resource: BundleItem,
        options: {
            navigation: { name: 'Bundles', icon: 'Layers' },
        },
    },

    // =======================
    // 💳 PLANES Y SUSCRIPCIONES
    // =======================
    {
        resource: Plan,
        options: {
            navigation: { name: 'Planes y Suscripciones', icon: 'CreditCard' },
        },
    },
    {
        resource: PlanEntitlement,
        options: {
            navigation: { name: 'Planes y Suscripciones', icon: 'Puzzle' },
        },
    },
    {
        resource: Subscription,
        options: {
            navigation: { name: 'Planes y Suscripciones', icon: 'Repeat' },
        },
    },
    {
        resource: SubscriptionEntitlement,
        options: {
            navigation: { name: 'Planes y Suscripciones', icon: 'Layers' },
        },
    },

    // =======================
    // 💰 PAGOS Y COMPRAS
    // =======================
    {
        resource: Payment,
        options: {
            navigation: { name: 'Pagos y Compras', icon: 'DollarSign' },
        },
    },
    {
        resource: PaymentItem,
        options: {
            navigation: { name: 'Pagos y Compras', icon: 'ShoppingCart' },
        },
    },
    {
        resource: PurchaseEntitlement,
        options: {
            navigation: { name: 'Pagos y Compras', icon: 'Gift' },
        },
    },

    // =======================
    // 👥 REFERIDOS
    // =======================
    {
        resource: ReferralConfig,
        options: {
            navigation: { name: 'Referidos', icon: 'Settings' },
        },
    },
    {
        resource: ReferralPolicy,
        options: {
            navigation: { name: 'Referidos', icon: 'Sliders' },
        },
    },
    {
        resource: Referral,
        options: {
            navigation: { name: 'Referidos', icon: 'Users' },
        },
    },
    {
        resource: ReferralSlot,
        options: {
            navigation: { name: 'Referidos', icon: 'Database' },
        },
    },
    {
        resource: ReferralCommission,
        options: {
            navigation: { name: 'Referidos', icon: 'Percent' },
        },
    },

    // =======================
    // 🎥 EVENTOS
    // =======================
    {
        resource: Event,
        options: {
            navigation: { name: 'Eventos', icon: 'Calendar' },
        },
    },
    {
        resource: EventRegistration,
        options: {
            navigation: { name: 'Eventos', icon: 'ClipboardList' },
        },
    },

    // =======================
    // 🔔 NOTIFICACIONES
    // =======================
    {
        resource: Notification,
        options: {
            navigation: { name: 'Notificaciones', icon: 'Bell' },
        },
    },
];
