import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';


export interface CurrentUserResponseInterfaceDTO {
  id: string;
  name: string;
  email?: string;
  phoneNumber: string;
  role: RoleTypeEnum;
  needResetPassword: boolean;
}

export interface CurrentUserResponseInterface {
  id: string;
  name: string;
  email?: string;
  phoneNumber: string;
  role: RoleTypeEnum;
  needResetPassword: boolean;
}
