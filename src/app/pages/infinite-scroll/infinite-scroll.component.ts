import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ApiService } from '../../common-services/api.service';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  // Data Source Gird Data
  public dataSource: any = [];
  // Grid columns
  public displayedColumns: string[] = ['id', 'title', 'completed', 'userId'];
  // Initial Page size when page load
  public initialPageSize: number = 20;
  // On Scrolling page size
  public loadPageSize: number = 10;
  // Initial Page Index
  public pageIndex: number = 0;
  // Subscribe to API data
  public apiDataSubscribe: any;

  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('dataTable') dataTableEl: ElementRef;

  constructor(private apiService: ApiService) {
    // Code Here
  }

  ngOnInit(): void {
    this.loadGridData(0, this.initialPageSize);
  }

  // Function to load the data
  loadGridData(pageIndex: number, pageSize: number) {
    this.apiDataSubscribe = this.apiService
      .getData(pageIndex, pageSize)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        const responseData = this.dataSource
          ? [...this.dataSource, ...(data as [])]
          : data;
        this.dataSource = responseData;
      });
  }

  // Function trigger when scroll trigger
  onscroll() {
    if (
      this.dataTableEl.nativeElement.scrollTop +
        this.dataTableEl.nativeElement.clientHeight ===
      this.dataTableEl.nativeElement.scrollHeight
    ) {
      this.pageIndex += 1;
      this.loadGridData(this.pageIndex, this.loadPageSize);
    }
  }

  ngOnDestroy(): void {
    this.apiDataSubscribe.unsubscribe();
  }
}
