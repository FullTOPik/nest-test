import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/entities/user.entity";

export class UserRepository {
  constructor(@InjectModel(User.name) private userRepository: Model<User>) {}

  async checkUserEmailExistance(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ["id", "email", "password", "role"],
    });

    if (!user) {
      throw new BadRequestException("Пользователь с такой почтой не найден");
    }

    return user;
  }

  async checkUserExistanceById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException("Пользователь с таким id не найден");
    }

    return user;
  }

  async createNewUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userRepository.create({ email, password });

    if (!user) {
      throw new BadRequestException("Пользователь с таким id не найден");
    }

    return user;
  }

  async getUser(email: any): Promise<UserDocument> {
    return this.userRepository.findOne({ email });
  }

  async checkAlreadyExistEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new BadRequestException(
        "Пользователь с такой почтой уже существует"
      );
    }
  }
}
