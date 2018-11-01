import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Border } from '../model/border';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://10.1.1.64:3000';

  constructor(
    private http: HttpClient
  ) { }

  getBorder(): Observable<Border[]> {
   
    return this.http.get<Border[]>(this.url + '/boards');
  }

  addBorder(border: Border): Observable<Border> {
    
    return this.http.post<Border>(this.url + '/board', border);
  }

  deleteBorder(border: Border): Observable<Border> {
   
    const url = `${this.url}/board/${border._id}`;
    return this.http.delete<Border>(url, httpOptions);
  }

  updateBorder(border: Border): Observable<Border> {
   
    const url = `${this.url}/board/update/${border._id}`;
    return this.http.put<Border>(url, border);
  }
}
