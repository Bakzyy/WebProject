import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterModule} from "@angular/router";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent{
  private logged!: boolean;
  constructor(private router: Router) {
  }

  logout() {
    this.logged = false
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
  }
}
