import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent implements OnInit {

 url = 'http://localhost:3100/';

  constructor(private toastr: ToastrService, private http: HttpClient) {
      
  }
  //
  // private sub = document.getElementById('submit');
  // // const input = document.getElementById('input');
  // private ws = new WebSocket('ws://localhost:3100');
  // setStatus(value) {
  //   console.log(value)
  // }
  // printMessage(value) {
  //   console.log(value);
  // }
  // SendMessage() {
  //   console.log("I'm is Admin and i send message!");
  //   this.ws.send('isUpgrade');
  // }

  ngOnInit() {
  }

}
