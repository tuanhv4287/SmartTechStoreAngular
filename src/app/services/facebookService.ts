import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
declare var FB: any;
@Injectable({
  providedIn: 'root',
})
export class FacebookService {
  private apiUrl = 'https://graph.facebook.com/me';
  constructor(private http: HttpClient, private router: Router) {}
  initFacebookSDK() {
    FB.init({
      appId: environment.appFacebookID,
      cookie: true,
      xfbml: true,
      version: 'v15.0',
    });
  }
  loginWithFacebook() {
    FB.login(
      (response: any) => {
        if (response.authResponse) {
          this.getUserInfo(response.authResponse.accessToken).subscribe(
            (res: any) => {
              const user = res;
              alert(
                `Bạn đã đăng nhập thành công tài khoản Facebook ${
                  user.name + ' + id: ' + user.id
                }`
              );
              this.router.navigate(['/home']);
            }
          );
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      { scope: 'public_profile' }
    );
  }
  getUserInfo(accessToken: string): Observable<any> {
    const url = `${this.apiUrl}?access_token=${accessToken}`;
    return this.http.get<any>(url);
  }
}
