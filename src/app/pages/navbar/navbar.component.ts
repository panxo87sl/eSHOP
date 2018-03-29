import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }

}
