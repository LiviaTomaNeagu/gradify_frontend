export enum RoleTypeEnum {
    UNKNOWN = 0,
    ADMIN = 10,
    STUDENT = 20,
    MENTOR = 30,
    COORDINATOR = 40,
    ADMIN_CORPORATE = 50,
  }
  
  export function toRoleTypeEnum(value: string): RoleTypeEnum {
    switch (value) {
      case 'ADMIN':
        return RoleTypeEnum.ADMIN;
      case 'STUDENT':
        return RoleTypeEnum.STUDENT;
      case 'MENTOR':
        return RoleTypeEnum.MENTOR;
      case 'COORDINATOR':
        return RoleTypeEnum.COORDINATOR;
      case 'ADMIN_CORPORATE':
        return RoleTypeEnum.ADMIN_CORPORATE;
      default:
        return RoleTypeEnum.UNKNOWN;
    }
  }