import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, of, onErrorResumeNext } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly base_url = 'http://127.0.0.1:3000';
  private readonly token_key: string = 'user_token'

  private request(url: string): string {
    return `${ this.base_url }/${ url }/`;
  }

  private get_user_token() {
    let token = localStorage.getItem(this.token_key);
    if (token === null) {
      token = '';
      localStorage.setItem(this.token_key, token);
    }
    return token;
  }

  private get_headers() {
    const user_token = this.get_user_token();
    return {headers: {'Authorization': `Token ${user_token}`}};
  }

  public isAuthenticated(): boolean {
    const token = this.get_user_token();
    return token !== '';
  }

  constructor(
    private http: HttpClient,
  ) { }

  get_profile(): Observable<any> {
    const token = this.get_user_token();
    if (token === '') return of(JSON.stringify({ok: false}));
    return this.http.get(this.request('auth/users'), this.get_headers());
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.request('auth/token/login'), {username: username, password: password});
  }

  logout() {
    localStorage.setItem(this.token_key, '');
    return this.http.post(this.request('auth/token/logout'), {}, this.get_headers());
  }

  register(email: string, username: string, password: string) {
    return this.http.post(this.request('auth/users'), {email: email, username: username, password: password});
  }

  get_all_fridges(): Observable<any> {
    return this.http.get(this.request('fridges'), this.get_headers());
  }

  create_fridge(name: string): Observable<any> {
    return this.http.post(this.request('fridges'), {name: name}, this.get_headers());
  }

  get_products_by_fridge(id: number): Observable<any> {
    return this.http.get(this.request(`product/${id}/get_products_by_fridge`), this.get_headers());
  }

  get_fridge_by_id(id: number): Observable<any> {
    return this.http.get(this.request(`fridges/${id}`), this.get_headers());
  }

  add_admin_to_fridge(fridge_id: number, user_id: number): Observable<any> {
    return this.http.post(this.request(`fridges/${fridge_id}/add_admin`), {id: user_id}, this.get_headers())
  }

  add_member_to_fridge(fridge_id: number, username: string, email:string): Observable<any> {
    return this.http.post(this.request(`fridges/${fridge_id}/add_member_by_username`), {username: username, email: email}, this.get_headers())
  }

  delete_fridge(id: number): Observable<any> {
    return this.http.delete(this.request(`fridges/${id}/delete_fridge`), this.get_headers());
  }

  remove_admin_to_fridge(fridge_id: number, user_id: number): Observable<any> {
    return this.http.post(this.request(`fridges/${fridge_id}/remove_admin`), {id: user_id}, this.get_headers())
  }

  remove_member_to_fridge(fridge_id: number, user_id: number): Observable<any> {
    return this.http.post(this.request(`fridges/${fridge_id}/remove_member`), {id: user_id}, this.get_headers())
  }

  create_product(name: string, fridge_id: number, finish_date: string, count: number) {
    return this.http.post(this.request(`product`), {name: name, fridge_id: fridge_id, end_date: finish_date, count: count}, this.get_headers())
  }

  remove_product(id: number) {
    return this.http.delete(this.request(`product/${id}/remove_product`), this.get_headers())
  }

  decrease_product(fridge_id: number, product_id: number) {
    return this.http.post(this.request(`product/${fridge_id}/decrement_product`), {id: product_id}, this.get_headers())
  }

  increase_product(fridge_id: number, product_id: number) {
    return this.http.post(this.request(`product/${fridge_id}/increment_product`), {id: product_id}, this.get_headers())
  }

  create_wish(name: string, fridge_id: number, count: number) {
    return this.http.post(this.request(`wishes/${fridge_id}/add_wish`), {title: name, count: count}, this.get_headers())
  }

  remove_wish(id: number) {
    return this.http.post(this.request(`wishes/${id}/remove_wish`), {}, this.get_headers())
  }
}
