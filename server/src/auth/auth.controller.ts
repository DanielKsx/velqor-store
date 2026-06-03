import { Controller, Body, Post, Res } from '@nestjs/common';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AuthService } from './auth.service';
import type { response, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('admin/login')
    async adminLogin(
        @Body() adminLoginDto: AdminLoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {

        const { accessToken } = await this.authService.adminLogin(adminLoginDto);

        response.cookie('admin_access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 1000* 60 * 60 * 12,
        });

        return {
            Message: 'Login successful',
        };
    }

    @Post('admin/logout')
    adminLogout(@Res({ passthrough: true }) response: Response ){
        response.clearCookie('admin_access_token');

        return this.authService.adminLogout();
    }
}
