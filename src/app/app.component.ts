import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { TokenStorageService } from './shared/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'budget-tracker-client';
  isLoggedIn = this.authService.isLoggedIn();
  paths: any = [];

  constructor(
    private authService: AuthService, 
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paths = [
      {
        name: 'dashboard',
        icon: 'bi bi-clipboard2-pulse-fill'
      },
      {
        name: 'categories',
        icon: 'bi bi-tag-fill'
      },
      {
        name: 'records',
        icon: 'bi bi-card-list'
      },
      {
        name: 'account-settings',
        icon: 'bi bi-person-circle'
      },
    ]
  }

  async logout(): Promise<void> {
    this.tokenStorageService.signOut();
    await this.router.navigate(['/login']);
    window.location.reload();
  }
}
