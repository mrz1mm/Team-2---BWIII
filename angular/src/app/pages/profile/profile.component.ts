import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../auth/interfaces/i-user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(private profile_svc: AuthService) {}

  user!: iUser;

  ngOnInit() {
    this.Profile()
  }

  Profile = () => {
    this.profile_svc.user$.subscribe((data) => {
      if (data) {
        this.user = data;
      }
    });
  };
}
