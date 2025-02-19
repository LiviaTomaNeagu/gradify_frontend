export enum RoleTypeEnum {
    UNKNOWN = 0,
    ADMIN = 10,
    STUDENT = 20,
    MENTOR = 30,
    COORDINATOR = 40
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
      default:
        return RoleTypeEnum.UNKNOWN;
    }
  }