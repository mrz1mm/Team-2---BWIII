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
  userToDelete: any = null;
  confirmName: string = '';
  p:number=1

  constructor(private usersService: UsersService,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
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
  openDeleteModal(user: any, deleteModal: any): void {
    this.userToDelete = user;
    this.confirmName = '';
    this.modalService.open(deleteModal, { centered: true });
  }

confirmDelete(modal: any): void {
  if (this.confirmName === this.userToDelete.username) {
    this.usersService.deleteUser(this.userToDelete.id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== this.userToDelete.id);
      modal.dismiss('Deleted');
      this.getUsers();
    });
  }
}
}
