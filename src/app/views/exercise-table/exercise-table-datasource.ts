import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ExerciseTableItem {
  id: number;
  kcal_per_mins: number;
  link: string;
  name: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ExerciseTableItem[] = [
  {id: 1, kcal_per_mins: 9, link:"www.youger/hongkoul.com", name: "วิ่ง"},
  {id: 2, kcal_per_mins: 4, link:"www.youger/hongkoul.com", name: "เดิน"},
  {id: 3, kcal_per_mins: 11, link:"www.youger/hongkoul.com", name: "ว่ายน้ำ"},
  {id: 4, kcal_per_mins: 6, link:"www.youger/hongkoul.com", name: "เตะฟุตบอล"},
  {id: 5, kcal_per_mins: 9, link:"www.youger/hongkoul.com", name: "ต่อยมวย"},
  {id: 6, kcal_per_mins: 7, link:"www.youger/hongkoul.com", name: "ปืนเขา"},
  {id: 7, kcal_per_mins: 13, link:"www.youger/hongkoul.com", name: "ดันพื้น"},
  {id: 8, kcal_per_mins: 7, link:"www.youger/hongkoul.com", name: "ยกน้ำหนัก"},
  {id: 9, kcal_per_mins: 13, link:"www.youger/hongkoul.com", name: "โยคะ"},
  {id: 10, kcal_per_mins: 11, link:"www.youger/hongkoul.com", name: "วิ่ง วิ่ง"},
  {id: 11, kcal_per_mins: 6, link:"www.youger/hongkoul.com", name: "วิ่ง วิ่ง วิ่ง"},
  {id: 12, kcal_per_mins: 9, link:"www.youger/hongkoul.com", name: "วิ่ง วิ่ง วิ่ง วิ่ง"},
  {id: 13, kcal_per_mins: 7, link:"www.youger/hongkoul.com", name: "ปืนเขา"},
  {id: 14, kcal_per_mins: 13, link:"www.youger/hongkoul.com", name: "ดันพื้น"},
  {id: 15, kcal_per_mins: 7, link:"www.youger/hongkoul.com", name: "ยกน้ำหนัก"},
  {id: 16, kcal_per_mins: 13, link:"www.youger/hongkoul.com", name: "โยคะ"},
  {id: 17, kcal_per_mins: 11, link:"www.youger/hongkoul.com", name: "วิ่ง โยคะ"},
  {id: 18, kcal_per_mins: 6, link:"www.youger/hongkoul.com", name: "วิ่ง ดันพื้น"},
  {id: 19, kcal_per_mins: 9, link:"www.youger/hongkoul.com", name: "โยคะ โยคะ"},
  {id: 20, kcal_per_mins: 9, link:"www.youger/hongkoul.com", name: "ดันพื้นดันพื้น"}
];

/**
 * Data source for the ExerciseTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ExerciseTableDataSource extends DataSource<ExerciseTableItem> {
  data: ExerciseTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ExerciseTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ExerciseTableItem[]): ExerciseTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ExerciseTableItem[]): ExerciseTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
