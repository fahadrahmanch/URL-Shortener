import { Injectable, Inject, ConflictException } from "@nestjs/common";
import type { IUserRepository } from "../../../domain/interfaces/user.repository.interface";
import { USER_REPOSITORY } from "../../../domain/tokens";
import { UserEntity } from "src/domain/entities/user.entity";
import { HashService } from "../../services/hash.service";

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
            throw new ConflictException("User already exists");
        }
        const hashedPassword = await this.hashService.hashPassword(password);
        const newUser = new UserEntity(email, hashedPassword);
        
        await this.userRepository.create(newUser);
    }
}