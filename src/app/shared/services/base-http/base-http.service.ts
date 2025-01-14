import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpResponse } from './base-http.type';

const DEFAULT_HEADERS = {
  Accept: 'application/json, text/plain, */*',
  'X-Requested-With': 'XMLHttpRequest',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
};

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  constructor(private httpClient: HttpClient) {}

  public get<T>(url: string, params?: any): Observable<T> {
    let queryParams = new HttpParams();

    for (let key in params) {
      queryParams = queryParams.append(key, params[key]);
    }

    return this.httpClient
      .get<HttpResponse<T>>(url, {
        params: queryParams,
        headers: DEFAULT_HEADERS,
      })
      .pipe(map((data: HttpResponse<T>) => data.results));
  }
}
