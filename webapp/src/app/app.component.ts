import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'kt-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Krato';
  inProduction?: boolean;
  isNavbarCollapsed = true;
  openAPIEnabled?: boolean;
  version = '';
  account: any | null = null;
  entitiesNavbarItems: any[] = [];

  constructor(
    private router: Router,
  ) {}

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  login(): void {
    console.log('logging in')
  }

  logout(): void {
    // this.collapseNavbar();
    // this.loginService.logout();
    // this.router.navigate(['']);
  }

  toggleNavbar(): void {
    // this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

}
