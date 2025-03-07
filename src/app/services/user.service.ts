import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import{LoginDTO} from '../dtos/user/login.dto';
import { environment } from '../environments/environment';
import { UserResponse } from '../responses/user/user.response';
import { UpdateUserDTO } from '../dtos/user/update.user.dto';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetail = `${environment.apiBaseUrl}/users/details`;
  private apiGetAllUsers = `${environment.apiBaseUrl}/users/get-users-by-keyword`;

  private apiConfig = {
    headers: this.createHeaders(),
  }
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  private createHeaders(): HttpHeaders{
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi',
    });
  }
  register(registerDTO: RegisterDTO): Observable<any>{
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig)
  }
  login(loginDTO: LoginDTO): Observable<any>{
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig); 
  }
  getUserDetail(token: String){
    return this.http.post(this.apiUserDetail, {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    }); 
  }
  getAllUsers(keyword: string, page: number, limit:number): Observable<UserResponse[]> {
      const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('limit', limit.toString())
      return this.http.get<any>(this.apiGetAllUsers, { params }) ;
    }
  updateUserDetail(token: string, updateUserDTO: UpdateUserDTO){
    
    let userResponse = this.getUserResponseFromLocalStorage();
    return this.http.put(`${this.apiUserDetail}/${userResponse?.id}`, updateUserDTO,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }
  saveUserResponseToLocalStorage(userResponse?: UserResponse){
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      try {
        if(userResponse == null || !userResponse){
          return;
        }
        const userResponseJSON = JSON.stringify(userResponse);
        localStorage.setItem('user', userResponseJSON);
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    } else {
      console.log('localStorage is not available in this environment.');
    }
  }
  // getUserResponseFromLocalStorage(){
  //   try {
  //     const userResponseJSON = localStorage.getItem('user');
  //     if(userResponseJSON == null || userResponseJSON == undefined){
  //       return null;
  //     }
  //     const userResponse = JSON.parse(userResponseJSON!);
  //     console.log('User response retrieved from local Storage.')
  //     return userResponse;
      
  //   } catch (error) {
  //     console.log('Error retrieved User response from local Storage:', error)
  //   }
  // }
  getUserResponseFromLocalStorage() {
    // Kiểm tra xem ứng dụng có đang chạy trên trình duyệt hay không
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        const userResponseJSON = localStorage.getItem('user');
        if (userResponseJSON == null || userResponseJSON == undefined) {
          return null;
        }
        const userResponse = JSON.parse(userResponseJSON);
        return userResponse;
      } catch (error) {
        return null;
      }
    } else {
      console.log('localStorage of user.service is not available on the server.');
      return null; // Nếu không phải môi trường trình duyệt, trả về null
    }
  }

  removeUserFromLocalStorage(): void{
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      try {
        localStorage.removeItem('user');
        console.log('user data removed from local storage.');
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    } else {
      console.log('localStorage is not available in this environment.');
    }
  }
  deleteUser(userId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/users/${userId}`;
    return this.http.delete(url, { responseType: 'text' });
  }
  
}
