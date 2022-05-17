import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CommemtExerciseTableDataSource, CommemtExerciseTableItem } from './commemt-exercise-table-datasource';

@Component({
  selector: 'app-commemt-exercise-table',
  templateUrl: './commemt-exercise-table.component.html',
  styleUrls: ['./commemt-exercise-table.component.css']
})
export class CommemtExerciseTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CommemtExerciseTableItem>;
  dataSource: CommemtExerciseTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['approve', 'edit', 'delete', 'name', 'kcal_per_mins', 'date', 'user_email', 'link'];

  constructor() {
    this.dataSource = new CommemtExerciseTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
