import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required]
    }, {
      validator: this.mustMatch('password', 'passwordConfirm')
    });
  }

  // Validación personalizada para que las contraseñas coincidan
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // Getter para acceder fácilmente a los campos del formulario
  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    // Detener si el formulario es inválido
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register({
      name: this.f.name.value,
      email: this.f.email.value,
      password: this.f.password.value
    }).subscribe(
      data => {
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.error = error.error.msg || 'Error en el registro';
        this.loading = false;
      }
    );
  }
}