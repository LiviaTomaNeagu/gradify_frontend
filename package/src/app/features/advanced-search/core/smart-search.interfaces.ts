import { Topic } from "src/app/shared/enums/topic.enum";

export interface SmartSearchResultDto {
  id: string;
  title: string;
  content: string;
  score: number;
  matchedSource: string;
  matchedSnippet: string;
  topic: Topic;
  page?: string;
  fileName?: string;
}

export interface SmartSearchRequestDto {
  search: string;
}

export interface SmartSearchSession {
  searchTerm: string;
  results: SmartSearchResultDto[];
  timestamp: number;
}
