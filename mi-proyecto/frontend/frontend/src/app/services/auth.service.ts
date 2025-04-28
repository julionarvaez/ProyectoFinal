import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:5000/api/auth'; // Ruta de tu backend

  constructor(private http: HttpClient) { }

  // Método para registrar un usuario
  register(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData);
  }

  // Método para iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials);
  }

  // Método para guardar token o información del usuario en localStorage
  saveUserData(data: any): void {
    localStorage.setItem('user', JSON.stringify(data));
  }

  // Método para obtener datos del usuario almacenado
  getUserData(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Método para saber si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user'); // Devuelve true si hay datos
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('user');
  }
}
