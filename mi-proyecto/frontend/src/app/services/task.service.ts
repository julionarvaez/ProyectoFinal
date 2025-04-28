import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { AuthService } from './auth.service';

const API_URL = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Preparar headers con token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': this.authService.getToken() || ''
    });
  }

  // Obtener todas las tareas
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${API_URL}/tasks`, {
      headers: this.getHeaders()
    });
  }

  // Crear nueva tarea
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${API_URL}/tasks`, task, {
      headers: this.getHeaders()
    });
  }

  // Actualizar tarea
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${API_URL}/tasks/${task._id}`, task, {
      headers: this.getHeaders()
    });
  }

  // Eliminar tarea
  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/tasks/${id}`, {
      headers: this.getHeaders()
    });
  }
}