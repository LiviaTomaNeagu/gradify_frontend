import { Topic } from "src/app/shared/enums/topic.enum";

export interface AddQuestionRequestDTO {
    title: string;
    descriptionHtml: string;
    topic: number;
  }
  