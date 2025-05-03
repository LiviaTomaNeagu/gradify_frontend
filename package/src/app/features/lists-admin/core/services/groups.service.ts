import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  GroupDTO,
  CreateGroupRequestDTO,
  DeleteGroupRequestDTO
} from '../interfaces/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private readonly groupsUrl = `${environment.apiUrl}/groups`;

  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<GroupDTO[]> {
    return this.http.get<GroupDTO[]>(`${this.groupsUrl}/all`);
  }

  createGroup(payload: CreateGroupRequestDTO): Observable<GroupDTO> {
    return this.http.post<GroupDTO>(`${this.groupsUrl}/create`, payload);
  }

  deleteGroup(payload: DeleteGroupRequestDTO): Observable<void> {
    return this.http.post<void>(`${this.groupsUrl}/delete`, payload);
  }
}
