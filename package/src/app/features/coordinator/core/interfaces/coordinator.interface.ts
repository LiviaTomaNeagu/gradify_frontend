export interface UserFullNameDTO
{
    name: string;
    surname: string;
}

export interface GetAvailableStudentsResponseDTO
{
    userFullNames: UserFullNameDTO[];
} 