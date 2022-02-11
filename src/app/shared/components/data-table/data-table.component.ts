import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input('title') title!: string;
  @Input('loaded') loaded$!: boolean;
  @Input('dataSource') data$!: Observable<any[]>;
  @Input('columns') columns!: string[];
  @Input('displayedColumns') displayedColumns!: string[];
  @Input('addButton') addButton!: { link: string; text: string };

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
