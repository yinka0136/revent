import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpService) {}
}
