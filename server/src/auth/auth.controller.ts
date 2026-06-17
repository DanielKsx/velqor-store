import { Controller, Body, Post, Res, Get, UseGuards, Req } from '@nestjs/common';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AuthService } from './auth.service';
import { ADMIN_ACCESS_TOKEN_COOKIE } from './constants/auth.constants';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { Request, Response } from 'express';

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

    @Get('admin/me')
    @UseGuards(JwtAuthGuard)
    getCurrentAdmin(@Req() request: Request){
        return request.user;
    }
}
