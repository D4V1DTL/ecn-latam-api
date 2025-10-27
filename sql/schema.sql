-- ==========================================
-- DB: Plataforma de Cursos Virtuales
-- Autor: David Jesús Lázaro Torres
-- Arquitectura: Clean + Escalable (TypeORM Ready)
-- ==========================================

DROP DATABASE IF EXISTS ecn_latan_dev;
CREATE DATABASE ecn_latan_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecn_latan_dev;

-- ==========================================
-- USUARIOS, ROLES, PREFERENCIAS
-- ==========================================
CREATE TABLE roles (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,        -- admin, teacher, student
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ✅ Corregido: user_roles
CREATE TABLE user_roles (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  UNIQUE KEY uq_user_role (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- ✅ Corregido: user_notification_settings
CREATE TABLE user_notification_settings (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE,
  email_enabled TINYINT(1) DEFAULT 1,
  push_enabled TINYINT(1) DEFAULT 0,
  notify_expiring_subscription TINYINT(1) DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==========================================
-- ESCUELAS, CURSOS, CLASES, MATERIALES
-- ==========================================
CREATE TABLE schools (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  logo VARCHAR(255),
  is_active TINYINT(1) DEFAULT 1,
  created_by BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE courses (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  school_id BIGINT,
  teacher_id BIGINT,
  created_by BIGINT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) DEFAULT 0.00,
  is_published TINYINT(1) DEFAULT 0,
  thumbnail VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE SET NULL,
  FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_courses_school (school_id),
  INDEX idx_courses_teacher (teacher_id)
);

CREATE TABLE course_classes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  course_id BIGINT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_url VARCHAR(255),
  zoom_link VARCHAR(255),
  starts_at DATETIME NULL,
  duration_minutes INT DEFAULT 0,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_class_course (course_id)
);

CREATE TABLE course_materials (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  class_id BIGINT NOT NULL,
  title VARCHAR(255) NOT NULL,
  type ENUM('pdf', 'link', 'other') DEFAULT 'link',
  url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES course_classes(id) ON DELETE CASCADE
);

-- ==========================================
-- BUNDLES
-- ==========================================
CREATE TABLE bundles (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  is_active TINYINT(1) DEFAULT 1,
  created_by BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE bundle_items (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  bundle_id BIGINT NOT NULL,
  item_type ENUM('school','course') NOT NULL,
  school_id BIGINT NULL,
  course_id BIGINT NULL,
  UNIQUE KEY uq_bundle_item (bundle_id, item_type, school_id, course_id),
  FOREIGN KEY (bundle_id) REFERENCES bundles(id) ON DELETE CASCADE,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- ==========================================
-- PLANES Y SUSCRIPCIONES
-- ==========================================
CREATE TABLE plans (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  duration_months INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  is_active TINYINT(1) DEFAULT 1,
  trial_days INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plan_entitlements (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  plan_id BIGINT NOT NULL,
  target_type ENUM('platform','school','course','bundle') NOT NULL,
  target_id BIGINT NULL,
  UNIQUE KEY uq_plan_target (plan_id, target_type, target_id),
  FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
);

CREATE TABLE subscriptions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  plan_id BIGINT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active TINYINT(1) DEFAULT 1,
  auto_renew TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE,
  INDEX idx_sub_user (user_id),
  INDEX idx_sub_active (is_active, end_date)
);

CREATE TABLE subscription_entitlements (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  subscription_id BIGINT NOT NULL,
  target_type ENUM('platform','school','course','bundle') NOT NULL,
  target_id BIGINT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  UNIQUE KEY uq_sub_target (subscription_id, target_type, target_id),
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE CASCADE
);

-- ==========================================
-- PAGOS
-- ==========================================
CREATE TABLE payments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  payer_id BIGINT NOT NULL,
  subscription_id BIGINT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  status ENUM('pending','completed','failed','refunded') DEFAULT 'pending',
  payment_method VARCHAR(50),
  transaction_ref VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (payer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL
);

CREATE TABLE payment_items (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  payment_id BIGINT NOT NULL,
  item_type ENUM('plan','bundle','course','event') NOT NULL,
  item_id BIGINT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  quantity INT DEFAULT 1,
  line_total DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE CASCADE,
  INDEX idx_pi_payment (payment_id)
);

CREATE TABLE purchase_entitlements (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  payment_item_id BIGINT NOT NULL,
  target_type ENUM('school','course','bundle','event') NOT NULL,
  target_id BIGINT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NULL,
  UNIQUE KEY uq_user_purchase_target (user_id, target_type, target_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (payment_item_id) REFERENCES payment_items(id) ON DELETE CASCADE
);

-- ==========================================
-- REFERIDOS
-- ==========================================
CREATE TABLE referral_configs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  default_max_referrals INT DEFAULT 10,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE referral_policies (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  scope ENUM('global','plan','product_type','product') NOT NULL,
  plan_id BIGINT NULL,
  product_type ENUM('course','bundle','event') NULL,
  product_id BIGINT NULL,
  first_month_user_pct DECIMAL(5,2) NOT NULL DEFAULT 90.00,
  next_months_user_pct DECIMAL(5,2) NOT NULL DEFAULT 10.00,
  include_events TINYINT(1) DEFAULT 0,
  active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
);

CREATE TABLE referrals (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  referrer_id BIGINT NOT NULL,
  referred_id BIGINT NOT NULL,
  active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deactivated_at TIMESTAMP NULL,
  UNIQUE (referrer_id, referred_id),
  FOREIGN KEY (referrer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (referred_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ✅ Corregido: referral_slots
CREATE TABLE referral_slots (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE,
  max_slots INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE referral_commissions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  referrer_id BIGINT NOT NULL,
  referred_id BIGINT NOT NULL,
  payment_id BIGINT NOT NULL,
  period_month DATE NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  phase ENUM('first_month','next_month') NOT NULL,
  status ENUM('pending','payable','paid','canceled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (referrer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (referred_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE CASCADE,
  INDEX idx_comm_referrer_period (referrer_id, period_month),
  INDEX idx_comm_referred_period (referred_id, period_month)
);

-- ==========================================
-- NOTIFICACIONES
-- ==========================================
CREATE TABLE notifications (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  title VARCHAR(255),
  message TEXT,
  type ENUM('system','subscription','referral','event','payment') DEFAULT 'system',
  is_read TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==========================================
-- EVENTOS
-- ==========================================
CREATE TABLE events (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) DEFAULT 0.00,
  event_date DATETIME,
  zoom_link VARCHAR(255),
  is_active TINYINT(1) DEFAULT 1,
  created_by BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE event_registrations (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  event_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  payment_item_id BIGINT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (event_id, user_id),
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (payment_item_id) REFERENCES payment_items(id) ON DELETE SET NULL
);

CREATE TABLE user_sessions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id int NOT NULL,
  refresh_token VARCHAR(255) NOT NULL,
  user_agent VARCHAR(255),
  ip_address VARCHAR(100),
  expires_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);