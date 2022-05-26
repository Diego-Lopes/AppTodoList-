import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  adicionaTarefa(tarefa: string, realizada: any) {
    const url = 'http://localhost/ApiTodo/api.php';

    const param = { tarefa, realizada };

    return this.http.post(url, param).toPromise();
  }

  listaTarefa() {
    const url = 'http://localhost/ApiTodo/api.php';

    return this.http.get(url).toPromise();
  }

  excluiTarefa(id: any) {
    const url = 'http://localhost/ApiTodo/api.php?id=' + id;

    return this.http.delete(url).toPromise();
  }
}
