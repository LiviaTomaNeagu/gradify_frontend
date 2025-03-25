import { RoleTypeEnum } from "src/app/shared/enums/role-type.enum";

export interface GetAccountDetailsDTO {
  id: number;
  email: string;
  name: string;
  surname: string;
  role: RoleTypeEnum;
  completedSteps: number;
  totalDays: number;
  usersInteractedWith: number;
  interactions: number;
  topics: RoleTypeEnum[];
  occupationName: string;
}
