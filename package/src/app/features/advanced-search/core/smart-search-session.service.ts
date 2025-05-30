import { Injectable } from '@angular/core';
import { SmartSearchResultDto } from './smart-search.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SmartSearchSessionService {
  private session: {
    searchTerm: string;
    results: SmartSearchResultDto[];
    timestamp: number;
    selectedQuestionContext?: {
      id: string;
      matchedSource: string;
      matchedSnippet: string;
      page?: number;
      fileName?: string;
    };
  } | null = null;

  set(searchTerm: string, results: SmartSearchResultDto[]): void {
    this.session = {
      ...this.session,
      searchTerm,
      results,
      timestamp: Date.now(),
    };
  }

  setSelectedQuestionContext(
    id: string,
    matchedSource: string,
    matchedSnippet: string,
    fileName?: string,
    page?: number
  ): void {
    if (this.session) {
      this.session.selectedQuestionContext = {
        id,
        matchedSource,
        matchedSnippet,
        fileName,
        page,
      };
    }
  }

  getSelectedQuestionContext() {
    return this.session?.selectedQuestionContext;
  }

  get(): typeof this.session {
    return this.session;
  }

  clear(): void {
    if (this.session) {
      this.session.selectedQuestionContext = undefined;
    }
  }

  isValid(): boolean {
    return (
      !!this.session && Date.now() - this.session.timestamp < 10 * 60 * 1000
    );
  }
}
