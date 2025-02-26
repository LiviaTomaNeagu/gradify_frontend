import { RoleTypeEnum } from "src/app/shared/enums/role-type.enum";
import { GetUserResponseDTO } from "src/app/features/users/core/interfaces/users.interfaces";

export interface GetUsersForRoleRequestDTO {
    role: RoleTypeEnum;
    page: number;
    pageSize: number;
    searchTerm: string;
}

export interface GetUsersResponseDTO {
    users: GetUserResponseDTO[];
    totalUsers: number;
}
