import { RoleTypeEnum } from "src/app/shared/enums/role-type.enum";
import { Topic } from "src/app/shared/enums/topic.enum";

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
  topics: Topic[];
  occupationName: string;
}

export interface AddTopicRequestDTO {
  topic: Topic;
}
  