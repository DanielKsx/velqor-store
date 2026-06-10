import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ADMIN_ACCESS_TOKEN_COOKIE } from '../constants/auth.constants';
import { PrismaService } from '../../prisma/prisma.service';

interface JwtPayload {
    sub: string;
    email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        configService: ConfigService,
        private readonly prisma: PrismaService,
    ) {
        const jwtSecret = configService.getOrThrow<string>('JWT_SECRET');

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.[ADMIN_ACCESS_TOKEN_COOKIE] ?? null;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: JwtPayload) {
        const admin = await this.prisma.adminUser.findUnique({
            where: {
                id: payload.sub,
            },
            select: {
                id: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!admin) {
            throw new UnauthorizedException('Invalid token');
        }

        return admin;
    }
}