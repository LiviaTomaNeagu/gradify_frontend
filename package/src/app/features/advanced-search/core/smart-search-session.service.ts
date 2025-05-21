import { Injectable } from '@angular/core';
import { SmartSearchResultDto } from './smart-search.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SmartSearchSessionService {
  private session: {
    searchTerm: string;
    results: SmartSearchResultDto[];
    timestamp: number;
  } | null = null;

  set(searchTerm: string, results: SmartSearchResultDto[]): void {
    this.session = {
      searchTerm,
      results,
      timestamp: Date.now()
    };
  }

  get(): typeof this.session {
    return this.session;
  }

  clear(): void {
    this.session = null;
  }

  isValid(): boolean {
    return !!this.session && (Date.now() - this.session.timestamp < 10 * 60 * 1000);
  }
}
