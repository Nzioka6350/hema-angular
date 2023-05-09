import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class XsrfService {

  constructor(private base: BaseService, private http: HttpClient) {
    this.http.get(this.base.base_uri + 'sanctum/csrf-cookie', { withCredentials: true }).subscribe()
  }
}