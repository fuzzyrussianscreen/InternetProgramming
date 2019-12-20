import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../shared/material.service';
import { Material } from '../shared/material.model';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.less']
})
export class MaterialListComponent implements OnInit {

  constructor(private materialService: MaterialService, private toastr: ToastrService, ) {
    this.ws.onopen = () => {
      this.setStatus('ONLINE');
      this.ws.onmessage = (response) => {
        this.toastr.success((response.data) + "");
        // if (response.data+ "" == "Update") {
        //   this.materialService.getAllMaterial().subscribe(x => {
        //     this.mats = x;
        //
        // });
        // }
        //this.toastr.success(JSON.parse(response.data));
        this.printMessage(response.data);
      };
    };
  }
  observable = new Subject<string>()
  text: string;
  mats: Material[];

  ngOnInit() {
      

    // this.materialService.getAllMaterial().subscribe(x => {
    //   this.mats = x;
    //
    // })
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

  private sub = document.getElementById('submit');
  // const input = document.getElementById('input');
  private ws = new WebSocket('ws://localhost:3000');
  setStatus(value) {
    console.log(value)
  }
  printMessage(value) {
      this.materialService.getAllMaterial().subscribe(x => {
        this.mats = x;

      })
    console.log(value);
  }
  SendMessage() {
    console.log("I'm is Admin and i send message!");
    this.ws.send('isUpgrade');
  }

}
