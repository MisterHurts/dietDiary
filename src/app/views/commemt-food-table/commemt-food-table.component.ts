import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CommemtFoodTableDataSource, CommemtFoodTableItem } from './commemt-food-table-datasource';

@Component({
  selector: 'app-commemt-food-table',
  templateUrl: './commemt-food-table.component.html',
  styleUrls: ['./commemt-food-table.component.css']
})
export class CommemtFoodTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CommemtFoodTableItem>;
  dataSource: CommemtFoodTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['approve', 'edit', 'delete', 'name', 'energy', 'carbohydrate', 'fat', 'protien', 'vitamin_a', 'vitamin_b', 'vitamin_c', 'vitamin_e', 'collection_name', 'unit_name', 'date', 'user_email', 'link'];


  constructor() {
    this.dataSource = new CommemtFoodTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
