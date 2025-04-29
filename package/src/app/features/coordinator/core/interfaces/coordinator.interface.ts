export interface UserFullNameDTO
{
    id: string;
    name: string;
    surname: string;
}

export interface GetAvailableStudentsResponseDTO
{
    userFullNames: UserFullNameDTO[];
} 
  
  export interface StudentDetails {
    id: string;
    faculty: string;
    specialization: string;
    group: string;
    enrollmentDate: Date;
    userId: string; 
  }
  
  export interface GetStudentResponseDTO extends StudentDetails {
    name: string;
    surname: string;
    email: string;
    avatarUrl: string;
  }
  