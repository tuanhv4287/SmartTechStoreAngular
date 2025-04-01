import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiCategories = `${environment.apiBaseUrl}/categories`;

  constructor(private http: HttpClient) {}
  getCategories(page: number, limit: number): Observable<Category[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<Category[]>(this.apiCategories, { params });
  }
  deleteCategory(userId: number): Observable<any> {
    const url = `${this.apiCategories}/${userId}`;
    return this.http.delete(url, { responseType: 'text' });
  }
  updateCategory(categoryId: number, name: string): Observable<any> {
    const url = `${environment.apiBaseUrl}/categories/${categoryId}`;
    return this.http.put(url, name);
  }
  createCategory(categoryDTO: Category): Observable<any> {
    return this.http.post(this.apiCategories, categoryDTO);
  }
}
