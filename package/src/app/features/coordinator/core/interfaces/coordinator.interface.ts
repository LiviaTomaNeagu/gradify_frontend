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