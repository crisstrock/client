import { Component, OnInit } from '@angular/core';
//import to know if the user is logged in
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
//Inicialize the service
  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
  }

}
