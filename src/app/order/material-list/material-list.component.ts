import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../shared/material.service';
import { Material } from '../shared/material.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.less']
})
export class MaterialListComponent implements OnInit {

  constructor(private materialService: MaterialService, private toastr: ToastrService) { }
  mats: Material[];

  ngOnInit() {
    this.materialService.getAllMaterial().subscribe(x => {
      this.mats = x;

      for (let mat of x) {
        for (let image of mat.images) {
          this.materialService.getImage(image.original).subscribe(res => {
            if (res.link) {
              image.original = res.link;
            }
          });
        }
      }
    })
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
