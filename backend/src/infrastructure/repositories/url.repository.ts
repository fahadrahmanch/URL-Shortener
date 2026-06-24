import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUrlRepository } from "../../domain/interfaces/url.repository.interface";
import { Url } from "../db/models/url.schema";

@Injectable()
export class UrlRepository implements IUrlRepository {
    constructor(
        @InjectModel(Url.name) private readonly urlModel: Model<Url>,
    ) {}

    async create(data: { originalUrl: string; shortCode: string; userEmail?: string }): Promise<void> {
        const newUrl = new this.urlModel(data);
        await newUrl.save();
    }

    async findByCode(code: string): Promise<{ originalUrl: string; } | null> {
        const urlDoc = await this.urlModel.findOne({ shortCode: code }).exec();
        if (!urlDoc) {
            return null;
        }
        return { originalUrl: urlDoc.originalUrl };
    }

    async findByUserEmail(email: string): Promise<any[]> {
        return this.urlModel.find({ userEmail: email }).sort({ createdAt: -1 }).exec();
    }
}
