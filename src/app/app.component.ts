import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";
import { TodoService } from "./services/todo.service";
import ToDo from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public newTodo: ToDo = new ToDo();

  todosList: ToDo[];
  editTodos: ToDo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getToDos().subscribe(todos => {
      this.todosList = todos;
      console.log(todos);
    });
  }

  create() {
    this.todoService.createTodo(this.newTodo).subscribe(res => {
      this.todosList.push(res.data);
      this.newTodo = new ToDo();
    });
  }
}
