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
import { MESSAGES } from "src/domain/constants/messages.constant";
import { ENDPOINTS } from "src/domain/constants/endpoints.constant";

@Controller(ENDPOINTS.AUTH.BASE)
export class AuthController {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase,
    ) {}

    @Post(ENDPOINTS.AUTH.REGISTER)
    async register(
        @Body() data: { email: string; password: string },
    ) {
        if (!data?.email || !data?.password) {
            throw new BadRequestException(
                MESSAGES.AUTH.INVALID_CREDENTIALS,
            );
        }

        await this.registerUseCase.execute(
            data.email,
            data.password,
        );

        return {
            success: true,
            message: MESSAGES.AUTH.REGISTER_SUCCESS,
        };
    }

    @Post(ENDPOINTS.AUTH.LOGIN)
    async login(
        @Body() data: { email: string; password: string },
    ) {
        if (!data?.email || !data?.password) {
            throw new BadRequestException(
                MESSAGES.AUTH.INVALID_CREDENTIALS,
            );
        }

        const result = await this.loginUseCase.execute(
            data.email,
            data.password,
        );
        console.log("🚀 ~ AuthController ~ login ~ result:", result)

        return {
            success: true,
            message: MESSAGES.AUTH.LOGIN_SUCCESS,
            ...result,
        };
    }

    @Get(ENDPOINTS.AUTH.PROFILE)
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req: any) {
        return {
            success: true,
            user: req.user,
        };
    }
}