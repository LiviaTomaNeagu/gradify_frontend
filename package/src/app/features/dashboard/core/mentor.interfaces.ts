import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';
import { OccupationDTO } from '../../users/core/interfaces/users.interfaces';
import { ShortUserDto } from '../../users/core/interfaces/users.interfaces';
import { Topic } from 'src/app/shared/enums/topic.enum';

export interface MentorResponseDTO {
    totalAnswers: number;
    topUsers: ShortUserDto[];
    latestQuestions: LatestQuestionDTO[];
    activityGraph: GraphDataPoint[];
}

export interface GraphDataPoint {
    name: string;
    value: number;
}


export interface LatestQuestionDTO {
    id: string;
    title: string;
    topic: Topic;
    author: ShortUserDto;
    createdAt: Date;
    answersCount: number;
}
 