import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SmartSearchService } from '../../core/smart-search.service';
import { SmartSearchResultDto } from '../../core/smart-search.interfaces';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { Topic, topicColors } from 'src/app/shared/enums/topic.enum';
import { SmartSearchSessionService } from '../../core/smart-search-session.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [
    MatCardModule,
    TablerIconsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MaterialModule,
    CommonModule
  ],
  standalone: true
})
export class SearchComponent {
  results = signal<SmartSearchResultDto[]>([]);
  searchTerm = signal<string>('');

loading = signal<boolean>(false);


  constructor(private smartSearchService: SmartSearchService, private sessionService: SmartSearchSessionService) {
    console.log(this.results());
  }

  ngOnInit(): void {
  const session = this.sessionService.get();
  if (session && this.sessionService.isValid()) {
    this.searchTerm.set(session.searchTerm);
    this.results.set(session.results);
  }

}


  onSearch(value: string): void {
    this.searchTerm.set(value);
    this.loading.set(true);

    if (value.trim().length > 2) {
      this.smartSearchService.smartSearch(value).subscribe((res) => {
        this.results.set(res);     
        this.sessionService.set(value, res);
        this.loading.set(false);
      }, () => {
        this.loading.set(false);
      });
    } else {
      this.results.set([]);
      this.loading.set(false);
    }
  }



  highlight(text: string, search: string): string {
    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  getTopicColor(topic: Topic): string {
      return topicColors[topic];
  }
  
  getMatchedIcon(source: string): string {
  switch (source) {
    case 'content': return '📝';
    case 'image': return '🖼️';
    case 'document': return '📄';
    default: return '';
  }
}

getMatchedLabel(source: string): string {
  switch (source) {
    case 'content': return 'Description';
    case 'image': return 'Image';
    case 'document': return 'Document';
    default: return '';
  }
}

}
