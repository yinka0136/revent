import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private http: HttpService) {}

  //Custom functions will go here
  public covertDateToIsoString(date: any): Date {
    return new Date(date);
  }

  public getInitial(username: any) {
    if (username) {
      let firstName = username.split(' ')[0];
      let lastName = username.split(' ')[1];
      return (
        firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
      );
    }

    return;
  }
}
