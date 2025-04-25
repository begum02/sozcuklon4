/* eslint-disable no-undef */
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isWindows = process.platform === 'win32';
    const certificateName = "reactapp5.client";

    const baseFolder = isWindows
        ? path.join(env.APPDATA || '', 'ASP.NET', 'https')
        : path.join(env.HOME || '', '.aspnet', 'https');

    const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
    const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

    const isVercel = !!process.env.VERCEL; // Vercel ortamını kontrol et
    const isDev = !isVercel; // Geliştirme ortamı kontrolü

    // Sertifika oluşturma işlemi yalnızca yerel geliştirme ortamında yapılır
    if (isDev) {
        if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
            try {
                // Sertifika oluşturma işlemi
                require('child_process').execSync(
                    `dotnet dev-certs https --export-path "${certFilePath}" --format Pem --no-password`
                );
            } catch (error) {
                console.warn("Sertifika oluşturulamadı, ancak development dışında bu sorun değildir.");
            }
        }
    }

    const target = env.ASPNETCORE_HTTPS_PORT
        ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
        : env.ASPNETCORE_URLS
            ? env.ASPNETCORE_URLS.split(';')[0]
            : 'https://localhost:7268';

    return {
        plugins: [
            svgr(),
            plugin(),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            proxy: {
                '^/weatherforecast': {
                    target: target,
                    secure: false,
                },
            },
            port: parseInt(env.DEV_SERVER_PORT || '65102'),
            https: isDev && fs.existsSync(certFilePath) && fs.existsSync(keyFilePath)
                ? {
                    key: fs.readFileSync(keyFilePath),
                    cert: fs.readFileSync(certFilePath),
                }
                : false, // Vercel ortamında HTTPS devre dışı bırakılır
        },
    };
});

