import { Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DevmasterService {

  API_URL = 'http://localhost:8000';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public user = null;

  constructor(private http: HttpClient) { }
}

