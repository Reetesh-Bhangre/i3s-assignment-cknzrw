import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseURL = 'https://jsonplaceholder.typicode.com/todos';

  constructor(public http: HttpClient) {}

  public getData(pageIndex: number, pageSize: number) {
    return this.http.get(
      this.baseURL + '?_page=' + pageIndex + '&_limit=' + pageSize
    );
  }
}
