import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollComponent } from './pages/infinite-scroll/infinite-scroll.component';
import { VirtualScrollComponent } from './pages/virtual-scroll/virtual-scroll.component';

const routes: Routes = [
  { path: 'infiniteScroll', component: InfiniteScrollComponent },
  { path: 'virtualScroll', component: VirtualScrollComponent },
  { path: '', redirectTo: '/infiniteScroll', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
