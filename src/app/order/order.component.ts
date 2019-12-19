import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { MaterialService } from 'src/app/order/shared/material.service'
import { MaterialListComponent } from './material-list/material-list.component';
import { WebsocketService } from './websocket/websocket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {

  @ViewChild(MaterialListComponent, { static: false }) list: MaterialListComponent;

  constructor(private materialService: MaterialService, public webSocketService: WebsocketService, private toastr: ToastrService) {

    this.ws.onopen = () => {
      this.setStatus('ONLINE');
      this.ws.onmessage = (response) => {
          this.toastr.success(response.data);
        this.printMessage(response.data);
      };
    };
  }

  // const status = document.getElementById('status');
  // const messages = document.getElementById('messages');
  private sub = document.getElementById('submit');
  // const input = document.getElementById('input');
  private ws = new WebSocket('ws://localhost:3000');
  setStatus(value) {
    console.log(value)
  }
  printMessage(value) {
    this.toastr.success('User login successful');
    console.log(value);
  }
  SendMessage() {
    console.log("I'm is Admin and i send message!");
    this.ws.send('isUpgrade');
  }
  // ws: onopen = () => setStatus('ONLINE');
  // ws: onmessage = response => printMessage(response.data);


  ngOnInit() {
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
    //var te = new TextEncoder();
    //this.webSocketService.webSocketContext.send(te.encode(this.materialService.selectedMaterial.Name));
  }

  /*
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
}*/



}
