import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'kt-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
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
  ) {
  }

  ngOnInit(): void {
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  login(): void {
    // this.router.navigate(['/login']);
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
