import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface CommemtFoodTableItem {
  id: number;
  name_food: string;
  energy: number;
  link: string;
  carbohydrate: number; 
  fat: number; 
  protien: number; 
  vitamin_a: number; 
  vitamin_b: number; 
  vitamin_c: number; 
  vitamin_e: number; 
  collection_name: string;
  unit_name: string;
  date: string;
  user_email: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: CommemtFoodTableItem[] = [
  {id: 1, name_food: "ข้าวผัดหมู", energy: 284, link: "https//www.picse-end-views.net", carbohydrate: 51.2, fat: 16.2, protien: 22.4, 
    vitamin_a: 0.62, vitamin_b: 0.81, vitamin_c: 0.13, vitamin_e: 0.44, collection_name: "อาหารคาว", unit_name: "จาน", date: "14/2/2022", user_email: "tony@mail.com"}, 
  {id: 2, name_food: "ข้าวผัดไก่", energy: 231, link: "https//www.picse-end-vidasdasddasdasdaews.net", carbohydrate: 51.2, fat: 16.2, protien: 22.4, 
   vitamin_a: 0.62, vitamin_b: 0.81, vitamin_c: 0.13, vitamin_e: 0.44, collection_name: "อาหารคาว", unit_name: "จาน", date: "14/2/2022", user_email: "tony2@mail.com"}, 
  {id: 3, name_food: "ข้าวผัดกุ้ง", energy: 351, link: "https//www.picse-end-views.net", carbohydrate: 51.2, fat: 16.2, protien: 22.4, 
   vitamin_a: 0.62, vitamin_b: 0.81, vitamin_c: 0.13, vitamin_e: 0.44, collection_name: "อาหารคาว", unit_name: "จาน", date: "14/2/2022", user_email: "tony3@mail.com"}, 
  {id: 4, name_food: "ข้าวผัดต้มยำ", energy: 222, link: "https://post.healthline.com/wp-content/uploads/running-thumbnail.jpg", carbohydrate: 51.2, fat: 16.2, protien: 22.4, 
   vitamin_a: 0.62, vitamin_b: 0.81, vitamin_c: 0.13, vitamin_e: 0.44, collection_name: "อาหารคาว", unit_name: "จาน", date: "14/2/2022", user_email: "tony4@mail.com"}
];

/**
 * Data source for the CommemtFoodTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CommemtFoodTableDataSource extends DataSource<CommemtFoodTableItem> {
  data: CommemtFoodTableItem[] = EXAMPLE_DATA;
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
  connect(): Observable<CommemtFoodTableItem[]> {
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
  private getPagedData(data: CommemtFoodTableItem[]): CommemtFoodTableItem[] {
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
  private getSortedData(data: CommemtFoodTableItem[]): CommemtFoodTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name_food, b.name_food, isAsc);
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
