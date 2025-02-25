import { RoleTypeEnum } from "src/app/shared/enums/role-type.enum";

export interface RegisterRequestDTO {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: RoleTypeEnum;
    }

export interface VerifyCodeRequestDTO {
    email: string;
    code: string;
}