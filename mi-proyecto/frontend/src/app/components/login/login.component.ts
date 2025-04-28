import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter para acceder fácilmente a los campos del formulario
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    // Detener si el formulario es inválido
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login({
      email: this.f.email.value,
      password: this.f.password.value
    }).subscribe(
      data => {
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.error = error.error.msg || 'Error en el inicio de sesión';
        this.loading = false;
      }
    );
  }
}