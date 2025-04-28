import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

const API_URL = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  
  constructor(private http: HttpClient) { }

  // Verificar si hay token en localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Obtener estado de autenticación como Observable
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // Registrar usuario
  register(user: User): Observable<any> {
    return this.http.post<any>(`${API_URL}/auth/register`, user)
      .pipe(
        tap(res => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.loggedIn.next(true);
          }
        })
      );
  }

  // Login usuario
  login(user: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(`${API_URL}/auth/login`, user)
      .pipe(
        tap(res => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.loggedIn.next(true);
          }
        })
      );
  }

  // Logout usuario
  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  // Obtener datos del usuario
  getUserData(): Observable<User> {
    return this.http.get<User>(`${API_URL}/auth/user`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token') || ''
      })
    });
  }

  // Obtener token de autenticación
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}