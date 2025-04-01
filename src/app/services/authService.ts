import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userInfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';

  constructor(private http: HttpClient) {}

  getUserInfo(accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get(this.userInfoUrl, { headers });
  }
}
