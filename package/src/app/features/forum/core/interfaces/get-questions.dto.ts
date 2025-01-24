import { Topic } from '../../../../shared/enums/topic.enum';

export interface GetQuestionsResponseDTO {
    questions: GetQuestionResponseDTO[];
    totalQuestions: number;
    totalFilteredQuestions: number;
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
    answers: GetAnswerResponseDTO[];
  }  
  
  export interface GetAnswerResponseDTO {
    id: string;
    questionId: string;
    content: string;
    createdAt: string;
    userId: string;
  }
  