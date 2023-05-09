import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  base_uri = '//localhost:8000/'
  base_uri_api = this.base_uri + 'api/'

  // base_uri = '//api.one.wabadesk.com/'
  // base_uri_api = this.base_uri + 'api/'

  constructor() { }
}