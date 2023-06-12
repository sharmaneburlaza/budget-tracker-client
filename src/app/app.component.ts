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
  paths: string[] = [];

  constructor(
    private authService: AuthService, 
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paths = [
      'home',
      'categories',
      'records',
      'dashboard',
      'account',
    ]
  }

  async logout(): Promise<void> {
    this.tokenStorageService.signOut();
    await this.router.navigate(['/login']);
    window.location.reload();
  }
}
