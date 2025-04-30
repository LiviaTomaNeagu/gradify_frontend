import { RoleTypeEnum } from "src/app/shared/enums/role-type.enum";

export interface LoginResponseDTO {
    accessToken: string;
    refreshToken: string;
    role: RoleTypeEnum;
}

export interface LoginRequestDTO {
    email: string;
    password: string;
}

export interface RefreshTokenRequestDTO {
    refreshToken: string;
    userId: string;
}