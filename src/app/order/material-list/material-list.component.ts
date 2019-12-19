import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../shared/material.service';
import { Material } from '../shared/material.model';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { WebsocketService } from '../websocket/websocket.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.less']
})
export class MaterialListComponent implements OnInit {

  constructor(private materialService: MaterialService, private toastr: ToastrService, private webSocketService: WebsocketService) {
    /*this.observable.pipe(debounceTime(1000))
      .subscribe(val => {
        this.materialService.getResult(val).subscribe(result => {
          console.log("res ", result.list);
          this.mats = result.list;
        });
    })*/
  }
  observable = new Subject<string>()
  text: string;
  mats: Material[];

  ngOnInit() {
      /*
    this.materialService.getAllMaterial().subscribe(x => {
      this.mats = x;

    })
*/
var te = new TextEncoder();
//this.webSocketService.webSocketContext.send(te.encode('111'));
/*
    this.webSocketService.webSocketContext.onmessage = (result: any) => {
      if (result && result.data) {
        console.log(result.data);
        this.toastr.success(result.data);
        //this.mats = JSON.parse(result.data);
      }
    }
    */
  }

  getResult(text:string){
      if(text == "") this.materialService.getAllMaterial().subscribe(x => this.mats=x);
      else this.materialService.getResult(text).subscribe(x => this.mats = x);
  }

  change(value: string) {
    this.observable.next(value);
  }

  showForEdit(emp: Material) {
    this.materialService.selectedMaterial = Object.assign({}, emp);;
  }

  onDelete(id: number) {
    this.materialService.deleteMaterialById(id)
      .subscribe(x => {
        this.materialService.getAllMaterial().subscribe(x => this.mats = x);
      })
  }
}
