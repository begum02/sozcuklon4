/* eslint-disable no-undef */
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    // Platform kontrolü
    const isWindows = process.platform === 'win32'; // ? DÜZELTÝLDÝ

    // Sertifika dizini
    const baseFolder = isWindows
        ? path.join(env.APPDATA || '', 'ASP.NET', 'https')
        : path.join(env.HOME || '', '.aspnet', 'https');

    const certificateName = "reactapp5.client";
    const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
    const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

    // Sertifika dizini oluþturulmamýþsa oluþtur
    if (!fs.existsSync(baseFolder)) {
        fs.mkdirSync(baseFolder, { recursive: true });
    }

    // Sertifika ve anahtar dosyalarýný kontrol et, yoksa oluþtur
    if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
        const result = child_process.spawnSync('dotnet', [
            'dev-certs',
            'https',
            '--export-path',
            certFilePath,
            '--format',
            'Pem',
            '--no-password',
        ], { stdio: 'inherit' });

        if (result.status !== 0) {
            throw new Error("Sertifika oluþturulamadý.");
        }
    }

    // Proxy hedef URL'sini ayarla
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
            https: {
                key: fs.readFileSync(keyFilePath),
                cert: fs.readFileSync(certFilePath),
            },
        },
    }

});
