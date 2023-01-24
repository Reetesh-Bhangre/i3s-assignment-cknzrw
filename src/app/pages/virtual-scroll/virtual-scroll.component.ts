import { Component, OnInit, Inject } from '@angular/core';
import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { VirtualScrollStrategyService } from '../../common-services/virtual-scroll.service';

import data from './test-data.json';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss'],
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useClass: VirtualScrollStrategyService,
    },
  ],
})
export class VirtualScrollComponent implements OnInit {
  // Manually set the amount of buffer and the height of the table elements
  private bufferRow = 5;
  // Manually set row height of the table elements
  public rowHeight = 32;
  // Manually set header height of the table elements
  public headerHeight = 36;
  // Column Definition for mat-table
  public displayedColumns: string[] = ['id', 'title', 'completed', 'userId'];
  // DataSource observable to update the data on scroll
  public dataSource: Observable<Array<any>>;
  // JsonData
  public gridData = data;

  constructor(
    @Inject(VIRTUAL_SCROLL_STRATEGY)
    private scrollStrategy: VirtualScrollStrategyService
  ) {}

  ngOnInit() {
    const range = 20;
    this.scrollStrategy.setScrollHeight(this.rowHeight, this.headerHeight);
    this.dataSource = combineLatest([
      [this.gridData],
      this.scrollStrategy.scrolledIndexChange,
    ]).pipe(
      map((value: any) => {
        // Select The largest Number
        const start = Math.max(0, value[1] - this.bufferRow);
        // select the smallest number
        const end = Math.min(value[0].length, value[1] + range);
        // Update the dataSource for the rendered range of data
        return value[0].slice(start, end);
      })
    );
  }
}
