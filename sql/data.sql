USE ecn_latan_dev;

-- ===========================================================
-- ROLES
-- ===========================================================
INSERT INTO roles (name, description) VALUES
('admin', 'Administrador del sistema'),
('teacher', 'Profesor o creador de cursos'),
('student', 'Estudiante o aprendiz');

-- ===========================================================
-- USUARIOS
-- ===========================================================
INSERT INTO users (name, email, password, avatar) VALUES
('David Lázaro', 'david@ecnlatam.com', '123456', 'https://i.pravatar.cc/150?img=1'),
('Ana Torres', 'ana@ecnlatam.com', '123456', 'https://i.pravatar.cc/150?img=2'),
('Carlos Vega', 'carlos@ecnlatam.com', '123456', 'https://i.pravatar.cc/150?img=3'),
('Laura Díaz', 'laura@ecnlatam.com', '123456', 'https://i.pravatar.cc/150?img=4'),
('Miguel Rojas', 'miguel@ecnlatam.com', '123456', 'https://i.pravatar.cc/150?img=5'),
('Patricia León', 'patricia@ecnlatam.com', '123456', 'https://i.pravatar.cc/150?img=6'),
('Sofía Campos', 'sofia@ecnlatam.com', '123456', 'https://i.pravatar.cc/150?img=7'),
('José Ramírez', 'jose@ecnlatam.com', '123456', 'https://i.pravatar.cc/150?img=8'),
('Luis Mendoza', 'luis@ecnlatam.com', '123456', 'https://i.pravatar.cc/150?img=9'),
('Andrea Paredes', 'andrea@ecnlatam.com', '123456', 'https://i.pravatar.cc/150?img=10'),
('Marcos Castillo', 'marcos@ecnlatam.com', '123456', 'https://i.pravatar.cc/150?img=11');

-- ===========================================================
-- ROLES POR USUARIO
-- ===========================================================
INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1), (2, 1), (3, 1), (4, 1),  -- admins
(5, 2), (6, 2), (7, 2), (8, 2),  -- teachers
(9, 3), (10, 3), (11, 3);        -- students

-- ===========================================================
-- CONFIGURACIÓN DE NOTIFICACIONES POR USUARIO
-- ===========================================================
INSERT INTO user_notification_settings (user_id, email_enabled, push_enabled, notify_expiring_subscription) VALUES
(9, 1, 1, 1),
(10, 1, 0, 1),
(11, 0, 1, 0);

-- ===========================================================
-- ESCUELAS
-- ===========================================================
INSERT INTO schools (name, description, logo, created_by) VALUES
('Escuela de Programación Full Stack', 'Aprende desarrollo web moderno con Node.js, React y NestJS.', 'https://placehold.co/200x200?text=FS', 1),
('Escuela de Diseño UX/UI', 'Formación completa en diseño de experiencia de usuario.', 'https://placehold.co/200x200?text=UX', 2),
('Escuela de Marketing Digital', 'Domina SEO, redes sociales y analítica web.', 'https://placehold.co/200x200?text=MKT', 3);

-- ===========================================================
-- CURSOS (solo 3 por escuela para brevedad)
-- ===========================================================
INSERT INTO courses (school_id, teacher_id, created_by, title, description, price, is_published, thumbnail) VALUES
(1, 5, 1, 'JavaScript Moderno', 'Domina JS desde cero hasta avanzado.', 49.90, 1, 'https://placehold.co/400x200?text=JS'),
(1, 6, 1, 'NestJS Avanzado', 'Arquitectura limpia y APIs escalables.', 59.90, 1, 'https://placehold.co/400x200?text=Nest'),
(1, 7, 1, 'React con TypeScript', 'Desarrollo profesional frontend.', 69.90, 1, 'https://placehold.co/400x200?text=React'),

(2, 8, 2, 'Diseño de Interfaces', 'Principios visuales y diseño adaptable.', 39.90, 1, 'https://placehold.co/400x200?text=UI'),
(2, 6, 2, 'Prototipado con Figma', 'Crea wireframes y prototipos interactivos.', 49.90, 1, 'https://placehold.co/400x200?text=Figma'),
(2, 7, 2, 'UX Research', 'Entrevistas, flujos y validaciones.', 59.90, 1, 'https://placehold.co/400x200?text=UX'),

(3, 5, 3, 'SEO Profesional', 'Posicionamiento orgánico avanzado.', 49.90, 1, 'https://placehold.co/400x200?text=SEO'),
(3, 8, 3, 'Publicidad en Meta Ads', 'Estrategias efectivas para Facebook e Instagram.', 59.90, 1, 'https://placehold.co/400x200?text=ADS'),
(3, 6, 3, 'Email Marketing', 'Automatización y conversión.', 29.90, 1, 'https://placehold.co/400x200?text=Email');

-- ===========================================================
-- CLASES Y MATERIALES
-- ===========================================================
INSERT INTO course_classes (course_id, title, description, video_url, duration_minutes, order_index) VALUES
(1, 'Introducción', 'Conceptos iniciales de JS.', 'https://cdn.videos/js1', 20, 1),
(1, 'Funciones', 'Uso de funciones y objetos.', 'https://cdn.videos/js2', 30, 2),
(4, 'Tipografía y Color', 'Principios visuales.', 'https://cdn.videos/ui1', 25, 1),
(7, 'SEO Técnico', 'Analiza tu sitio con herramientas.', 'https://cdn.videos/seo1', 35, 1);

INSERT INTO course_materials (class_id, title, type, url) VALUES
(1, 'Slides - JS Intro', 'pdf', 'https://cdn.materials/js_intro.pdf'),
(2, 'Ejemplo Funciones', 'link', 'https://github.com/demo/js'),
(4, 'Guía UX Colors', 'pdf', 'https://cdn.materials/colors.pdf');

-- ===========================================================
-- BUNDLES
-- ===========================================================
INSERT INTO bundles (name, description, price, is_active, created_by) VALUES
('Pack Full Stack', 'Incluye todos los cursos de programación.', 129.90, 1, 1),
('Pack Diseño Completo', 'Cubre diseño UI, UX y prototipado.', 99.90, 1, 2),
('Pack Marketing Digital', 'SEO, Ads y Email Marketing.', 89.90, 1, 3);

-- ===========================================================
-- ITEMS DE BUNDLE
-- ===========================================================
INSERT INTO bundle_items (bundle_id, item_type, school_id, course_id) VALUES
(1, 'school', 1, NULL),
(2, 'school', 2, NULL),
(3, 'school', 3, NULL);

-- ===========================================================
-- PLANES
-- ===========================================================
INSERT INTO plans (name, duration_months, price, description, trial_days) VALUES
('Mensual Premium', 1, 29.90, 'Acceso a toda la plataforma durante 1 mes.', 7),
('Anual Premium', 12, 249.90, 'Acceso ilimitado durante 12 meses.', 14);

INSERT INTO plan_entitlements (plan_id, target_type, target_id) VALUES
(1, 'platform', NULL),
(2, 'platform', NULL);

-- ===========================================================
-- SUSCRIPCIONES Y PAGOS DE SUSCRIPCIONES
-- ===========================================================
INSERT INTO subscriptions (user_id, plan_id, start_date, end_date, is_active, auto_renew)
VALUES (9, 1, '2025-10-01', '2025-11-01', 1, 1);

INSERT INTO payments (payer_id, subscription_id, amount, currency, status, payment_method, transaction_ref)
VALUES (9, 1, 29.90, 'USD', 'completed', 'stripe', 'TXN001');

INSERT INTO payment_items (payment_id, item_type, item_id, unit_price, quantity, line_total)
VALUES (1, 'plan', 1, 29.90, 1, 29.90);

INSERT INTO subscription_entitlements (subscription_id, target_type, target_id, start_date, end_date)
VALUES (1, 'platform', NULL, '2025-10-01', '2025-11-01');

-- ===========================================================
-- COMPRAS DIRECTAS (Purchase Entitlements)
-- ===========================================================
-- Andrea (id=10) compra el Bundle de Programación
INSERT INTO payments (payer_id, amount, currency, status, payment_method, transaction_ref)
VALUES (10, 129.90, 'USD', 'completed', 'paypal', 'TXN002');

INSERT INTO payment_items (payment_id, item_type, item_id, unit_price, quantity, line_total)
VALUES (2, 'bundle', 1, 129.90, 1, 129.90);

INSERT INTO purchase_entitlements (user_id, payment_item_id, target_type, target_id, start_date, end_date)
VALUES (10, 2, 'bundle', 1, '2025-10-01', NULL);

-- Marcos compra un curso individual
INSERT INTO payments (payer_id, amount, currency, status, payment_method, transaction_ref)
VALUES (11, 59.90, 'USD', 'completed', 'stripe', 'TXN003');

INSERT INTO payment_items (payment_id, item_type, item_id, unit_price, quantity, line_total)
VALUES (3, 'course', 2, 59.90, 1, 59.90);

INSERT INTO purchase_entitlements (user_id, payment_item_id, target_type, target_id, start_date, end_date)
VALUES (11, 3, 'course', 2, '2025-10-01', NULL);

-- ===========================================================
-- REFERIDOS Y POLÍTICAS
-- ===========================================================
INSERT INTO referral_configs (default_max_referrals) VALUES (10);

INSERT INTO referral_policies (scope, plan_id, product_type, product_id, first_month_user_pct, next_months_user_pct, include_events, active)
VALUES
('global', NULL, NULL, NULL, 90.00, 10.00, 1, 1),
('plan', 1, NULL, NULL, 50.00, 20.00, 0, 1),
('product', NULL, 'bundle', 1, 70.00, 15.00, 0, 1);

INSERT INTO referrals (referrer_id, referred_id, active)
VALUES
(9, 10, 1),
(9, 11, 1);

INSERT INTO referral_slots (user_id, max_slots) VALUES (9, 10);

-- Comisión por el pago de Andrea (bundle)
INSERT INTO referral_commissions (referrer_id, referred_id, payment_id, period_month, commission_amount, phase, status)
VALUES
(9, 10, 2, '2025-10-01', 9.00, 'first_month', 'payable');

-- ===========================================================
-- EVENTOS
-- ===========================================================
INSERT INTO events (title, description, price, event_date, zoom_link, created_by)
VALUES
('Masterclass IA Aplicada', 'Cómo usar IA en tus proyectos reales.', 19.90, '2025-11-10 18:00:00', 'https://zoom.us/ai', 1),
('Workshop UX Avanzado', 'Técnicas prácticas de investigación.', 9.90, '2025-11-20 17:00:00', 'https://zoom.us/ux', 2);

-- Registro de usuarios en eventos
INSERT INTO event_registrations (event_id, user_id) VALUES
(1, 9),
(1, 10),
(2, 11);

-- ===========================================================
-- NOTIFICACIONES
-- ===========================================================
INSERT INTO notifications (user_id, title, message, type) VALUES
(9, '¡Bienvenido!', 'Tu suscripción Premium ha comenzado.', 'subscription'),
(9, 'Comisión generada', 'Has recibido una comisión de $9.00 por tu referido Andrea.', 'referral'),
(10, 'Compra confirmada', 'Tu compra del Bundle Full Stack fue exitosa.', 'payment'),
(11, 'Curso disponible', 'Tu curso de NestJS Avanzado ya está activo.', 'system'),
(11, 'Evento recordatorio', 'No olvides tu workshop UX Avanzado el 20/11.', 'event');
