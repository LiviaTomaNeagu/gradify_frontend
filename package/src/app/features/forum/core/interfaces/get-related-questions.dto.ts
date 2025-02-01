import { Topic } from "src/app/shared/enums/topic.enum";

export interface GetRelatedQuestionResponseDto {
    id: string;
    title: string;
    answersCount: number;
    topic: Topic
}

export interface GetRelatedQuestionsRequestDto {
    content: string;
    topic: Topic;
}