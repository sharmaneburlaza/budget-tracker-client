import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Category, User, Record } from '../models/model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly API_URL = 'http://localhost:4000/api/user/';
  httpOptions = {
    headers: new HttpHeaders({ 'authorization': `Bearer ${this.token.getToken()}` })
  };

  constructor(private http: HttpClient, private token: TokenStorageService) { }

  getDetails(): Observable<User> {
    return this.http.get<User>(this.API_URL + 'details', this.httpOptions);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.API_URL + 'add-category', category, this.httpOptions)
    .pipe(
      tap((newCategory: Category) => console.log(`added category with name=${newCategory.name}`)),
      catchError(this.handleError<Category>('addCategory'))
    )
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.API_URL + 'update-category', category, this.httpOptions)
    .pipe(
      tap((updatedCategory: Category) => console.log(`updated category with name=${updatedCategory.name}`)),
      catchError(this.handleError<Category>('updatedCategory'))
    )
  }

  addRecord(record: Record): Observable<Record> {
    return this.http.post<Record>(this.API_URL + 'add-record', record, this.httpOptions)
    .pipe(
      tap((newRecord: Record) => console.log(`added record with name=${newRecord.categoryName}`)),
      catchError(this.handleError<Record>('addRecord'))
    )
  }

  updateRecord(record: Record): Observable<Record> {
    return this.http.put<Record>(this.API_URL + 'update-record', record, this.httpOptions)
    .pipe(
      tap((updatedRecord: Record) => console.log(`updated record with name=${updatedRecord.categoryName}`)),
      catchError(this.handleError<Record>('updatedRecord'))
    )
  }

  deleteRecord(record: Record): Observable<Record> {
    return this.http.put<Record>(this.API_URL + 'delete-record', record, this.httpOptions)
    .pipe(
      tap((deletedRecord: Record) => console.log(`deleted record with name=${deletedRecord.categoryName}`)),
      catchError(this.handleError<Record>('deletedRecord'))
    )
  }

  getQuote(): Observable<any> {
    return this.http.get('https://type.fit/api/quotes');
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
