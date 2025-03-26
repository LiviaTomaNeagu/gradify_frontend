import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/material.module';

interface Step {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}

@Component({
  selector: 'app-steps-achieved',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, TablerIconsModule, MatButtonModule, MatIconModule, MaterialModule, CommonModule, NgScrollbarModule],
  templateUrl: './steps-achieved.component.html',
})
export class StepsAchievedComponent {
  constructor() { }

  steps: Step[] = [
    {
      id: 1,
      time: 'Step 1',
      color: 'primary',
      subtext: 'Create account for Gradify platform',
    },
    {
      id: 2,
      time: 'Step 2',
      color: 'success',
      subtext: 'Login and explore',
    },
    {
      id: 3,
      time: 'Step 3',
      color: 'warning',
      subtext: 'Familiarize with available features',
    },
    {
      id: 4,
      time: 'Step 4',
      color: 'error',
      subtext: 'Start asking and answering questions',
    },
    {
      id: 5,
      time: 'Step 5',
      color: 'success',
      subtext: 'Network with other users',
    },
  ];
}
