import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminLoginDto } from './dto/admin-login.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async adminLogin(adminLoginDto: AdminLoginDto) {
        const admin = await this.prisma.adminUser.findUnique({
            where: {
                email: adminLoginDto.email,
            },
        });

        if (!admin) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(
            adminLoginDto.password,
            admin.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: admin.id,
            email: admin.email,
        };

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken
        };
    }

    adminLogout() {
        return {
            message: 'Logout successful',
        };
    }
}
