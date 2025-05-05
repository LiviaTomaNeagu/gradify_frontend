import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { select } from 'd3-selection';
import { MaterialModule } from 'src/app/material.module';
import { Topic, TopicCustomMapping } from 'src/app/shared/enums/topic.enum';
import wizardData from 'src/assets/data/question-wizard-data.json';
@Component({
  selector: 'app-question-wizard',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './question-wizard.component.html',
  styleUrls: ['./question-wizard.component.scss']
})
export class QuestionWizardComponent implements OnInit {
  wizard = wizardData as any;
  fullWizard = wizardData as any;

  levels: string[] = [];
  path: string[] = [];
  currentOptions: any = {};

  topicOptions = Object.entries(TopicCustomMapping).map(([key, label]) => ({
    key: Number(key),
    label,
  }));
  selectedTopicKey: number | null = null;
  selectedJsonKey: string | null = null;



  selectedQuestion: string | null = null;
  @Output() questionGenerated = new EventEmitter<{title: string, topic: Topic}>();

  ngOnInit(): void {
    
  }

  onTopicSelected(topicKey: number): void {
    this.selectedTopicKey = topicKey;
    this.startWizard();
  }
  

  startWizard(): void {
    if (this.selectedTopicKey === null) return;
    console.log('Selected topic key:', this.selectedTopicKey);
  
    const jsonKey = Topic[this.selectedTopicKey as Topic];
    if (!jsonKey || !this.fullWizard[jsonKey]) {
      console.warn(`Topic key '${jsonKey}' not found in wizard JSON`);
      return;
    }

    this.selectedJsonKey = jsonKey;
    this.currentOptions = this.fullWizard[jsonKey];
    this.path = [];
    this.selectedQuestion = null;
    this.updateLevels();
  }

  

  updateLevels(): void {
    this.levels = Object.keys(this.currentOptions);
  }

  selectOption(option: string): void {
    this.path.push(option);
    const next = this.currentOptions[option];
  
    if (typeof next === 'string') {
      if (this.selectedTopicKey === null) {
        console.warn('Topic not selected. Cannot emit generated question.');
        return;
      }
      this.selectedQuestion = next;
      this.questionGenerated.emit({
        title: this.selectedQuestion,
        topic: this.selectedTopicKey as Topic,
      });
  
    } else {
      this.currentOptions = next;
      this.updateLevels();
    }
  }
  
  goBack(): void {
    if (this.path.length === 0) {
      this.reset();
      return;
    }
  
    this.path.pop();
    this.currentOptions = this.fullWizard[this.selectedJsonKey!];
  
    for (const key of this.path) {
      this.currentOptions = this.currentOptions[key];
    }
  
    this.updateLevels();
    this.selectedQuestion = null;
  }
  

  reset(): void {
    this.path = [];
    this.selectedQuestion = null;
    this.selectedTopicKey = null;
    this.selectedJsonKey = null;
    this.currentOptions = {};
    this.levels = [];
  }
  
  
}
