import { Body, Controller, Post, HttpCode, HttpStatus, UseFilters, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

// @UseFilters(new SomeFilter())
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){} 


    @HttpCode(HttpStatus.OK)
    @Post('login') // makes POST /auth/login
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register') // makes POST /auth/register
    register(@Body() signInDto: Record<string, any>) {
        return this.authService.register(signInDto.username, signInDto.password, signInDto.email);
    }

    // @UseFilters(AuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }

}
