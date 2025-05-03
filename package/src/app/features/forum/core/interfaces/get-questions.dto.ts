import { Topic } from '../../../../shared/enums/topic.enum';

export interface GetQuestionsResponseDTO {
    questions: GetQuestionResponseDTO[];
    totalQuestions: number;
  }
  
  export interface GetQuestionResponseDTO {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    userId: string;
    topic: Topic;
    name: string;
    surname: string;
    occupationName: string;
    attachments: AttachmentsDTO[];
  }  
  
  export interface GetAnswerResponseDTO {
    id: string;
    questionId: string;
    content: string;
    createdAt: string;
    name : string;
    surname : string;
    occupationName : string;
  }

  export interface GetQuestionsRequestDTO {
    search: string | null;
    page: number;
    pageSize: number;
    topics: Topic[] | null
  }

  export interface GetQuestionDetailsResponseDTO extends GetQuestionResponseDTO {
    answers: GetAnswerResponseDTO[];
}

export interface AddAnswerRequestDTO {
  content: string;
}

export interface AttachmentsDTO {
  name: string;
  url: string;
}
