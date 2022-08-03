import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoodCategoryTableDataSource, FoodCategoryTableItem } from './food-category-table-datasource';

@Component({
  selector: 'app-food-category-table',
  templateUrl: './food-category-table.component.html',
  styleUrls: ['./food-category-table.component.css']
})
export class FoodCategoryTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FoodCategoryTableItem>;
  dataSource: FoodCategoryTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['edit', 'delete', 'name'];

  constructor() {
    this.dataSource = new FoodCategoryTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  open() {
    console.log('modal');
    // const modalRef = this.modalService.open(FoodCategoryTableComponent);
    // modalRef.componentInstance.name = 'World';
  }
}
