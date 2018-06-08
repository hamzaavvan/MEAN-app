import ToDo from '../models/todo.model';
import { Http} from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { map } from "rxjs/operators/map";

@Injectable()
export class TodoService {
    api_url = "http://localhost:3000";
    todoUrl = `${this.api_url}/api/todos`;

    constructor(
        private http: HttpClient
    ) { }

    createTodo(todo: ToDo): Observable<any> {
        return this.http.post(this.todoUrl, todo);
    }

    getToDos(): Observable<ToDo[]> {
        return this.http.get(this.todoUrl).pipe(map(res => {
            return res["data"].docs as ToDo[];
        }));
    }

    editTodo(todo: ToDo) {
        return this.http.put(this.api_url, todo);
    }

    deleteTodo(id: string): any {
        let deleteUrl = `${this.api_url}/${id}`;

        return this.http.delete(deleteUrl).pipe(map(res => {
            return res;
        }));
    }

    private handleError(error: Error): Promise<any> {
        console.error('An error occurred', error);

        return Promise.reject(error.message || error);
    }
}