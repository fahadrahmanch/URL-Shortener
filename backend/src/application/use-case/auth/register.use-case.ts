import { Injectable, Inject, ConflictException } from "@nestjs/common";
import type { IUserRepository } from "../../../domain/interfaces/user.repository.interface";
import { USER_REPOSITORY } from "../../../domain/tokens";
import { UserEntity } from "src/domain/entities/user.entity";
import { HashService } from "../../services/hash.service";
import { MESSAGES } from "src/domain/constants/messages.constant";

@Injectable()
export class RegisterUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        private readonly hashService: HashService,
    ) { }

    async execute(email: string, password: string): Promise<void> {
        const alreadyexist = await this.userRepository.findByEmail(email);
       
        if (alreadyexist) {
            throw new ConflictException(MESSAGES.AUTH.USER_ALREADY_EXISTS);
        }
        const hashedPassword = await this.hashService.hashPassword(password);
        const newUser = new UserEntity(email, hashedPassword);
        
        await this.userRepository.create(newUser);
    }
}