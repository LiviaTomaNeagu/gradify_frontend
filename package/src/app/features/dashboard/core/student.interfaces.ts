import { Topic } from "src/app/shared/enums/topic.enum";
import { ShortUserDto } from "../../users/core/interfaces/users.interfaces";
import { LatestQuestionDTO } from "./mentor.interfaces";

export interface HasDetailsResponseDTO
{
    hasDetails: boolean;
}

export interface AddStudentDetailsDTO
{
    specialization: string;
    groupId: string;
}

export interface GetStudentDashboardDTO {
  totalQuestionsAsked: number;
  totalMentorsAnswered: number;
  currentStep: number;
  latestQuestions: LatestQuestionDTO[];
  mentorInfo: ShortUserDto[];
  favoriteTopics: Topic[];
  thesisSteps: string[];
}
