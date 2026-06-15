import { Controller, Body, Post, Res } from '@nestjs/common';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { ADMIN_ACCESS_TOKEN_COOKIE } from './constants/auth.constants';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Throttle({ default: { limit: 5, ttl: 60000 }})
    @Post('admin/login')
    async adminLogin(
        @Body() adminLoginDto: AdminLoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {

        const { accessToken } = await this.authService.adminLogin(adminLoginDto);

        response.cookie(ADMIN_ACCESS_TOKEN_COOKIE, accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 12,
        });

        return {
            message: 'Login successful',
        };
    }

    @Post('admin/logout')
    adminLogout(@Res({ passthrough: true }) response: Response ){
        response.clearCookie(ADMIN_ACCESS_TOKEN_COOKIE);

        return this.authService.adminLogout();
    }
}
