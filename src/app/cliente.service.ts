import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable()
export class ClienteService {
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> {
    return this.http.get<any[]>('/assets/clients.json');
  }
}
