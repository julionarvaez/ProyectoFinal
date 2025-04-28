import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  loading = false;
  error = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    this.authService.getUserData().subscribe(
      (user) => {
        this.user = user;
        this.loading = false;
      },
      (error) => {
        this.error = 'Error al cargar datos de usuario';
        this.loading = false;
        console.error(error);
      }
    );
  }
}