export interface LoginResponseDTO {
    accessToken: string;
    refreshToken: string;
}

export interface LoginRequestDTO {
    email: string;
    password: string;
}

export interface RefreshTokenRequestDTO {
    refreshToken: string;
    userId: string;
}