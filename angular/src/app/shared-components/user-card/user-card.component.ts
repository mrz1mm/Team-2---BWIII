import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  users: any[] = [];
  selectedUser: any;

  constructor(private usersService: UsersService,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
  updateUser() {
    this.usersService.updateUser(this.selectedUser.id, this.selectedUser)
      .subscribe(() => {
        this.modalService.dismissAll();
      });
  }
  open(content: any, user: any) {
    this.selectedUser = user;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
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
