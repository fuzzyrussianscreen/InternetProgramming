import { Component, OnInit } from '@angular/core';
import { MaterialService } from './shared/material.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
  providers :[MaterialService]
})
export class OrderComponent implements OnInit {

  constructor(private materialService : MaterialService) { }

  ngOnInit() {
  }

}
