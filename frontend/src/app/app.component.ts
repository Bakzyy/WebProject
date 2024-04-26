import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {TopBarComponent} from "./components/top-bar/top-bar.component";
import {LoginService} from "./services/login.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';
  logged!: boolean;

  username!: string;
  password!: string;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    setInterval(() => {
      this.isValidToken();
    }, 1000);
  }

  isValidToken(){
    const access = localStorage.getItem("access")
    if (access) {
      this.logged = true;
    } else {
      this.router.navigate(['/login'])
    }
  }

  login() {
    this.loginService.login(this.username, this.password).subscribe(data => {
      console.log(data)
      this.logged = true
      localStorage.setItem("access", data.access)
      localStorage.setItem("refresh", data.refresh)
    })
  }

  logout() {
    this.logged = false
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
  }
}
