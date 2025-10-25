import 'dotenv/config';
import AdminJS from 'adminjs';
import * as AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/typeorm';
import express from 'express';
import { AppDataSource } from '../core/functions/data-source.js';
import { adminResources } from './admin.resources.js';
import { adminOptions } from './admin.options.js';

AdminJS.registerAdapter({ Database, Resource });

const DEFAULT_ADMIN = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
};

export async function setupAdmin(appExpress: express.Express) {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    const admin = new AdminJS({
        ...adminOptions,
        resources: adminResources,
        databases: [AppDataSource],
    });

    const router = AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate: async (email, password) => {
                if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
                    return Promise.resolve(DEFAULT_ADMIN);
                }
                return null;
            },
            cookiePassword: process.env.ADMIN_COOKIE || 'cookie-secret',
        },
        null,
        {
            resave: false,
            saveUninitialized: true,
            secret: process.env.SESSION_SECRET || 'secret',
        },
    );

    appExpress.use(admin.options.rootPath, router);
}
