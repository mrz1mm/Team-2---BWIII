import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  users: any[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
  updateUser(id: number, user: any):void{
      this.usersService.updateUser(id, user).subscribe(()=>{
          this.getUsers();
      });
  }

  deleteUser(id: number): void {
    this.usersService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }

  upgradeUser(id: number): void {
    this.usersService.upgradeUser(id).subscribe(() => {
      this.getUsers();
    });
  }

  downgradeUser(id: number): void {
    this.usersService.downgradeUser(id).subscribe(() => {
      this.getUsers();
    });
  }
}
