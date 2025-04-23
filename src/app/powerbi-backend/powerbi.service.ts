import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PowerbiService {

  private baseUrl = 'http://localhost:8080/api/powerbi';

  constructor(private http: HttpClient) {
  }

  getReports(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reports`);
  }

  getEmbedDetails(reportId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/embed/${reportId}`);
  }
}
