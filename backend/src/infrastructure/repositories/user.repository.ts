import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../db/models/user.schema";
import { IUserRepository } from "../../domain/interfaces/user.repository.interface";
import { UserEntity } from "../../domain/entities/user.entity";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async create(user: UserEntity): Promise<UserEntity> {
        const createdUser = new this.userModel(user.toPlainObject());
        const savedUser = await createdUser.save();
        return new UserEntity(savedUser.email, savedUser.password);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            return null;
        }
        return new UserEntity(user.email, user.password);
    }
}