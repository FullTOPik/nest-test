import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthUserDto } from "./dto/auth-user.dto";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { maxAge } from "src/constants/constants";
import { UserAndTokens } from "./interfaces/user-and-tokens.interface";
import { AuthGuard } from "src/guards/auth.guard";
import { BaseUserWithoutPassword } from "src/user/interfaces/base-user-without-password.interface";
import { Token } from "src/entities/token.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("authentification")
@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() authUserDto: AuthUserDto
  ): Promise<UserAndTokens> {
    
    const userInfoAndTokens = await this.authService.login(authUserDto);
    response.cookie("accessToken", userInfoAndTokens.tokens.accessToken, {
      maxAge,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    response.cookie("refreshToken", userInfoAndTokens.tokens.refreshToken, {
      maxAge,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return userInfoAndTokens;
  }

  @Post("/register")
  async register(
    @Res({ passthrough: true }) response: Response,
    @Body() registerUserDto: AuthUserDto
  ): Promise<UserAndTokens> {
    const userInfoAndTokens = await this.authService.register(registerUserDto);

    response.cookie("accessToken", userInfoAndTokens.tokens.accessToken, {
      maxAge,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    response.cookie("refreshToken", userInfoAndTokens.tokens.refreshToken, {
      maxAge,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return userInfoAndTokens;
  }

  @UseGuards(AuthGuard)
  @Post("/logout")
  logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request
  ): Promise<Token> {
    const token = request.cookies.refreshToken;
    response.clearCookie("refreshToken");
    response.clearCookie("accessToken");

    return this.authService.logout(token);
  }

  @Post("/refresh")
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request
  ): Promise<UserAndTokens> {
    const token = request.cookies.refreshToken;
    const userInfoAndTokens = await this.authService.refresh(token);

    response.cookie("accessToken", userInfoAndTokens.tokens.accessToken, {
      maxAge,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    response.cookie("refreshToken", userInfoAndTokens.tokens.refreshToken, {
      maxAge,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return userInfoAndTokens;
  }

  @Get("/check-auth")
  checkAuth(@Req() request: Request): Promise<BaseUserWithoutPassword> {
    const { accessToken } = request.cookies;
    return this.authService.checkAuth(accessToken);
  }
}
