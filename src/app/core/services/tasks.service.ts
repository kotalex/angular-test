import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Task from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.baseUrl}/tasks`);
  }

  createTask(data: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${environment.baseUrl}/tasks`, data);
  }

  updateTask(id: string, data: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${environment.baseUrl}/tasks/${id}`, data);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/tasks/${id}`);
  }  
}
