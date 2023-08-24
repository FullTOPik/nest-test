import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class AuthUserDto {
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({ example: "admin@mail.ru", description: "Почта" })
  @IsString({ message: "Поле email должно быть строкой" })
  @IsNotEmpty({ message: "Поле email не должно быть пустым" })
  @IsEmail({}, { message: "Неккоректная почта" })
  @MaxLength(320, { message: "Максимальная длина почты 320 символа" })
  email: string;

  @ApiProperty({ example: "Admin123", description: "Пароль" })
  @IsString({ message: "Поле password должно быть строкой" })
  @IsNotEmpty({ message: "Поле password не должно быть пустым" })
  @MaxLength(32, { message: "Максимальная длина пароля 32 символа" })
  @MinLength(8, { message: "Минимальная длина пароля 8 символа" })
  password: string;
}
