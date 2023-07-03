import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ChartsComponent } from './charts/charts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { RecordsComponent } from './records/records.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthenticatedGuard } from './shared/guards/authenticated.guard';

const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthenticatedGuard]
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [AuthenticatedGuard] 
  },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [AuthenticatedGuard] 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]  
  },
  { 
    path: 'charts', 
    component: ChartsComponent,
    canActivate: [AuthGuard]  
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard]  
  },
  { 
    path: 'categories', 
    component: CategoriesComponent,
    canActivate: [AuthGuard]  

  },
  { 
    path: 'records', 
    component: RecordsComponent,
    canActivate: [AuthGuard]  
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
