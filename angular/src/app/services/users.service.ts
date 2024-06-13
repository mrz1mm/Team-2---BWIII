import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { iUser } from '../auth/interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
    this.getAllUsers();
  }

  private usersSubject = new BehaviorSubject<iUser[]>([]);
  users$ = this.usersSubject.asObservable();
  private usersArray: iUser[] = [];
  usersUrl: string = `${environment.apiUrl}/users`;

  getAllUsers(): void {
    this.http.get<iUser[]>(this.usersUrl).subscribe((users) => {
      this.usersArray = users;
      this.usersSubject.next(users);
    });
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  upgradeUser(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { role: 'sub-admin' });
  }

  downgradeUser(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { role: 'auth' });
  }
}
