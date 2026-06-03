import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const databaseUrl = new URL(process.env.DATABASE_URL as string);

const adapter = new PrismaMariaDb({
    host: databaseUrl.hostname,
    port: Number(databaseUrl.port),
    user: databaseUrl.username,
    password: decodeURIComponent(databaseUrl.password),
    database: databaseUrl.pathname.slice(1),
    allowPublicKeyRetrieval: true,
});

@Injectable()
export class PrismaService extends PrismaClient { 
    constructor() {
        super({ adapter });
    }
}