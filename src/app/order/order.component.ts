import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { MaterialService } from 'src/app/order/shared/material.service'
import { MaterialListComponent } from './material-list/material-list.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {

  @ViewChild(MaterialListComponent, { static: false }) list: MaterialListComponent;

  constructor(private materialService: MaterialService, private toastr: ToastrService, private http: HttpClient) {

//       const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
//       const data: any = {
//         "url": "ws://localhost:3000"
//       };
//       this.http.post("http://localhost:3100/subscribe", <JSON>data, httpOptions).subscribe();
// this.toastr.success("после запроса")
//     this.toastr.success(this.getResult()+"");

  }
getResult(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const data: any = {
      "url": "ws://localhost:3000"
    };
    return this.http.post("http://localhost:3100/subscribe", <JSON>data, httpOptions);
}
  // private sub = document.getElementById('submit');
  // private ws = new WebSocket('ws://localhost:3000');
  // setStatus(value) {
  //   console.log(value)
  // }
  // printMessage(value) {
  //   this.toastr.success('User login successful');
  //   console.log(value);
  // }
  // SendMessage() {
  //   console.log("I'm is Admin and i send message!");
  //   this.ws.send('isUpgrade');
  // }
  //


  ngOnInit() {
      this.toastr.success("до запроса")
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      const data: any = {
        'url': 'ws://localhost:3000'
      };
      this.http.post("http://localhost:3100/subscribe", <JSON>data, httpOptions).subscribe(data => {
          console.log(data);
      });
      console.log("после запроса2")
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.materialService.selectedMaterial = {
      Id: null,
      Name: '',
      Price: null,
      Description: ''
    }
  }

  onSubmit(form: NgForm) {
    this.list.SendMessage();

    if (form.value.Id == null) {
      this.materialService.postMaterial(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.list.ngOnInit();
        })
    }
    else {
      this.materialService.putMaterial(form.value.Id, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.list.ngOnInit();
        });
    }
  }
}
