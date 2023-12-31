import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './categories/categories.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecordsComponent } from './records/records.component';

import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BalanceTrendComponent } from './shared/charts/balance-trend/balance-trend.component';
import { CategoryBreakdownComponent } from './shared/charts/category-breakdown/category-breakdown.component';
import { IncomeVsExpenseComponent } from './shared/charts/income-vs-expense/income-vs-expense.component';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    CategoriesComponent,
    PageNotFoundComponent,
    RecordsComponent,
    DashboardComponent,
    BalanceTrendComponent,
    CategoryBreakdownComponent,
    IncomeVsExpenseComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
