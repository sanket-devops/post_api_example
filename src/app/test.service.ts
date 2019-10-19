import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Idata} from './Idata';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  api = 'https://jsonplaceholder.typicode.com/posts/';

  constructor(private http: HttpClient) {
  }

  getApi() {
    return this.http.get(this.api);
  }

  getById(id) {
    return this.http.get(`${this.api}${id}`);
  }

  deleteApi(id) {
    return this.http.delete(`${this.api}${id}`);
  }

  postData(data: Idata) {
    return this.http.post(this.api, data);
  }

  updateData(data: Idata) {
    return this.http.put(`${this.api}${data.id}`, data);
  }

}
