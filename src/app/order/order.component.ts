import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { MaterialService } from 'src/app/order/shared/material.service'
import { MaterialListComponent } from './material-list/material-list.component';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {

  @ViewChild(MaterialListComponent, {static: false}) list: MaterialListComponent;

  constructor(private materialService: MaterialService){
  }

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
      Description: '',
      images: null,
      images_files: null
    }
  }

  onSubmit(form: NgForm) {
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
