import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit { 
  
  @Input() todo: string;
  @Output() deleteTodo = new EventEmitter();
  @Output() editTodo = new EventEmitter();

  onDelete(){

    this.deleteTodo.emit(this.todo);
  }

  onEdit(){
    this.editTodo.emit(this.todo);
  }
  
  constructor( ) { }

  ngOnInit() {
  
  }

}
