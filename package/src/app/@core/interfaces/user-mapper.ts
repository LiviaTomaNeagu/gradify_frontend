import { ShortUserDto, UserDTO } from "src/app/features/users/core/interfaces/users.interfaces";
import { CurrentUserResponseInterfaceDTO } from './user.interface';

export class UserMapper {
  static mapFromCurrentUser(response: CurrentUserResponseInterfaceDTO): UserDTO {
    return {
      id : response.id,
      name : response.name,
      surname: response.surname,
      email: response.email,
      role: response.role,
      isApproved: response.isApproved,
      occupationId: response.occupationId,
      occupation: response.occupation,
      password: '',
      createdAt: new Date(),
      completedSteps: 0
    };
  }

  static mapFromCurrentUserToShortUserDto(response: CurrentUserResponseInterfaceDTO): ShortUserDto {
    return {
      id : response.id,
      name : response.name,
      surname: response.surname,
      email: response.email,
      role: response.role,
      isApproved: response.isApproved,
      occupationId: response.occupationId,
      occupation: response.occupation
    };
  }
}
