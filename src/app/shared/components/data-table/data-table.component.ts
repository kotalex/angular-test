import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() addButtonClick = new EventEmitter<void>();
  @Output() editButtonClick = new EventEmitter<any>();
  @Output() deleteButtonClick = new EventEmitter<any>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.displayedColumns = [...this.displayedColumns, 'actions'];
    this.columns = [...this.columns, 'Actions'];
  }
}
