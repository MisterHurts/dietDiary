import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FoodUnitTableDataSource, FoodUnitTableItem } from './food-unit-table-datasource';

@Component({
  selector: 'app-food-unit-table',
  templateUrl: './food-unit-table.component.html',
  styleUrls: ['./food-unit-table.component.css']
})
export class FoodUnitTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FoodUnitTableItem>;
  dataSource: FoodUnitTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['edit', 'delete', 'name'];

  constructor() {
    this.dataSource = new FoodUnitTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
