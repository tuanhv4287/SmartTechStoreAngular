import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  initGoogleSDK() {
    google.accounts.id.initialize({
      client_id: environment.googleAppClientID,
      callback: (resp: any) => this.handleLogin(resp),
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      width: '100%',
      shape: 'pill',
      ux_mode: 'popup',
    });
  }
  handleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      const decodedName: string = decodeURIComponent(escape(payload.name));
      sessionStorage.setItem('LoggedInUser', JSON.stringify(payload));
      alert(`Bạn đã đăng nhập thành công tài khoản Google ${decodedName}`);
    }
  }
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
