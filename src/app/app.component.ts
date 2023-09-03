import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './shared/models/model';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'budget-tracker-client';
  isLoggedIn = this.authService.isLoggedIn();
  paths: any = [];
  user: User | undefined;

  constructor(
    private authService: AuthService, 
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.paths = [
      {
        name: 'Dashboard',
        path: 'dashboard',
        icon: 'bi bi-clipboard2-pulse-fill'
      },
      {
        name: 'Transaction Records',
        path: 'records',
        icon: 'bi bi-card-list'
      },
      {
        name: 'Charts',
        path: 'charts',
        icon: 'bi bi-pie-chart-fill'
      },
      {
        name: 'Categories',
        path: 'categories',
        icon: 'bi bi-tag-fill'
      },
      {
        name: 'Account',
        path: 'account',
        icon: 'bi bi-person-circle'
      },
    ]

    this.userService.getUser();
    this.userService.user$.subscribe(data => {
      this.user = data;
    })
  }

  async logout(): Promise<void> {
    this.tokenStorageService.signOut();
    await this.router.navigate(['/login']);
    window.location.reload();
  }
}
