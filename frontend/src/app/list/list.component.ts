import { Component, OnInit } from '@angular/core';

import { Coffee } from './../logic/Coffee';
import { DataService } from './../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list: [Coffee];

  constructor(
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.getList(list => {
      this.list = list;
    });
  }

}
