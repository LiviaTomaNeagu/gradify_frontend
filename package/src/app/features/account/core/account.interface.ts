import { RoleTypeEnum } from "src/app/shared/enums/role-type.enum";

export interface GetAccountDetailsDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  role: RoleTypeEnum;
  completedSteps: number;
  totalDays: number;
  usersInteractedWith: number;
  interactions: number;
}
