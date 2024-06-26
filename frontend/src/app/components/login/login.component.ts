import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import {LoginService} from "../../services/login.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: any;
  registerForm: any;
  activeForm: 'login' | 'register' = 'login';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // this.registerForm = this.fb.group({
    //   username: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required],
    // });
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  login() {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      console.log(this.loginForm.value);
      this.loginService.login(username, password).subscribe(
        (response) => {
          console.log('Login response:', response);
          localStorage.setItem('access', response.access);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Login error:', error);
          this.snackBar.open('Login failed!', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Invalid username or password!', 'Close', {
        duration: 3000,
      });
    }
  }

  // register() {
  //   if (this.registerForm.valid) {
  //     // Получаем значения из формы
  //     const {username, email, password} = this.registerForm.value;
  //     // Выполняем POST-запрос на регистрацию
  //
  //     this.loginService.register(username, password, email).subscribe(
  //       (response) => {
  //         console.log('Registration response:', response);
  //         this.snackBar.open('Registration successful!', 'Close', {
  //           duration: 3000,
  //         });
  //         this.router.navigate(['/login']);
  //       },
  //       (error) => {
  //         console.error('Registration error:', error);
  //         this.snackBar.open('Registration failed!', 'Close', {
  //           duration: 3000,
  //         });
  //       }
  //     );
  //   } else {
  //     this.snackBar.open('Please fill in all fields correctly!', 'Close', {
  //       duration: 3000,
  //     });
  //   }
  // }
}
