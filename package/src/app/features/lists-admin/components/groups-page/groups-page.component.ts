import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../core/services/groups.service';
import { GroupDTO, CreateGroupRequestDTO, DeleteGroupRequestDTO } from '../../core/interfaces/group.model';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-groups-page',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {
  groups: GroupDTO[] = [];
  newGroupName: string = '';

  constructor(private groupsService: GroupsService) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.groupsService.getAllGroups().subscribe({
      next: (data) => (this.groups = data),
      error: (err) => console.error('Failed to load groups', err)
    });
  }

  addGroup(): void {
    if (!this.newGroupName.trim()) return;

    const payload: CreateGroupRequestDTO = { name: this.newGroupName.trim() };

    this.groupsService.createGroup(payload).subscribe({
      next: (createdGroup) => {
        this.groups.push(createdGroup);
        this.newGroupName = '';
      },
      error: (err) => console.error('Failed to create group', err)
    });
  }

  deleteGroup(index: number): void {
    const group = this.groups[index];
    const payload: DeleteGroupRequestDTO = { id: group.id };

    this.groupsService.deleteGroup(payload).subscribe({
      next: () => this.groups.splice(index, 1),
      error: (err) => console.error('Failed to delete group', err)
    });
  }
}
