import { SubscriptionLoggable } from "rxjs/internal/testing/SubscriptionLoggable";
import { StudentDetails } from "src/app/features/coordinator/core/interfaces/coordinator.interface";
import { RoleTypeEnum } from "src/app/shared/enums/role-type.enum";

    export interface OccupationDTO{
        id: string;
        name: string;
        domain: string;
        createdAt: Date;    
    }

export interface UserDTO
{
    id: string;
    name: string;
    surname: string;
    password: string;
    email: string;
    role: RoleTypeEnum;
    createdAt: Date;
    completedSteps: number;
    isApproved: boolean;
    occupationId: string;
    occupation: OccupationDTO
}

export interface GetUserResponseDTO{
    id: string;
    name: string;
    surname: string;
    email: string;
    role: RoleTypeEnum;
    completedSteps: number;
    occupationName: string;
    createdAt: Date;
    isApproved: boolean;
    studentDetails: GetStudentDetailsResponse; 
}

export interface GetStudentDetailsResponse
{
    faculty: string;
    specialization: string;
    group: string;
    enrollmentDate: Date;
}

export interface GetMentorsRequestDTO
{
    adminUser: ShortUserDto
    page: number;
    pageSize: number;
}

export interface GetMentorsResponseDTO
{
    users: GetUserResponseDTO[]
    totalUsers: number
}

export interface ShortUserDto
{
    id: string;
    name: string;
    surname: string;
    email: string;
    role: RoleTypeEnum;
    isApproved: boolean;   
    occupationId: string;
    occupation: OccupationDTO
}

export interface GetShortUsersResponseDTO
{
    users: ShortUserDto[]
}