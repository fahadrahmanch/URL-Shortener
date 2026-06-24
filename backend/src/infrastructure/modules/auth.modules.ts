import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "src/presentation/contollers/auth.controller";

import { RegisterUseCase } from "src/application/use-case/auth/register.use-case";
import { LoginUseCase } from "src/application/use-case/auth/login.use-case";
import { HashService } from "src/application/services/hash.service";

import {
    USER_REPOSITORY,
    TOKEN_SERVICE,
} from "src/domain/tokens";

import { UserRepository } from "src/infrastructure/repositories/user.repository";

import {
    User,
    UserSchema,
} from "src/infrastructure/db/models/user.schema";

import { JwtTokenService } from "src/infrastructure/jwt/jwt-token.service";
import { JwtStrategy } from "src/infrastructure/jwt/jwt.strategy";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),

        JwtModule.register({
            secret:
                process.env.JWT_SECRET ||
                "secret-key",
            signOptions: {
                expiresIn: "1d",
            },
        }),
    ],

    controllers: [AuthController],

    providers: [
        RegisterUseCase,
        LoginUseCase,
        HashService,

        {
            provide: USER_REPOSITORY,
            useClass: UserRepository, 
        },

        {
            provide: TOKEN_SERVICE,
            useClass: JwtTokenService,
        },
        JwtStrategy,
    ],
})
export class AuthModule {}