import {
    Body,
    Controller,
    Post,
    Get,
    Req,
    UseGuards,
    BadRequestException,
} from "@nestjs/common";

import { RegisterUseCase } from "src/application/use-case/auth/register.use-case";
import { LoginUseCase } from "src/application/use-case/auth/login.use-case";
import { JwtAuthGuard } from "src/infrastructure/jwt/jwt-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase,
    ) {}

    @Post("/register")
    async register(
        @Body() data: { email: string; password: string },
    ) {
        if (!data?.email || !data?.password) {
            throw new BadRequestException(
                "Invalid email or password",
            );
        }

        await this.registerUseCase.execute(
            data.email,
            data.password,
        );

        return {
            success: true,
            message: "User registered successfully",
        };
    }

    @Post("/login")
    async login(
        @Body() data: { email: string; password: string },
    ) {
        if (!data?.email || !data?.password) {
            throw new BadRequestException(
                "Invalid email or password",
            );
        }

        const result = await this.loginUseCase.execute(
            data.email,
            data.password,
        );
        console.log("🚀 ~ AuthController ~ login ~ result:", result)

        return {
            success: true,
            message: "User logged in successfully",
            ...result,
        };
    }

    @Get("/profile")
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req: any) {
        return {
            success: true,
            user: req.user,
        };
    }
}