import { OccupationDTO } from 'src/app/features/users/core/interfaces/users.interfaces';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';


export interface CurrentUserResponseInterfaceDTO {
  id: string;
  name: string;
  surname: string; 
  email: string;
  role: RoleTypeEnum;
  needResetPassword: boolean;
  isApproved: boolean;
  occupationId: string;
  occupation: OccupationDTO;
}

