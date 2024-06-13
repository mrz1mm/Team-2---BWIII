import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$: Observable<any[]>= EMPTY
  private refreshUsers = new Subject<void>();

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.refreshUsers.pipe(
      switchMap(() => this.usersService.getAllUsers())
    );
    this.refreshUsers.next();
  }

  updateUser(id: number, user: any): void {
    this.usersService.updateUser(id, user).subscribe(() => {
      this.refreshUsers.next();
    });
  }

  deleteUser(id: number): void {
    this.usersService.deleteUser(id).subscribe(() => {
      this.refreshUsers.next();
    });
  }

  upgradeUser(id: number): void {
    this.usersService.upgradeUser(id).subscribe(() => {
      this.refreshUsers.next();
    });
  }

  downgradeUser(id: number): void {
    this.usersService.downgradeUser(id).subscribe(() => {
      this.refreshUsers.next();
    });
  }
}
