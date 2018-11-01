import { Component, OnInit } from '@angular/core';
import { Border } from '../model/border';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-border',
  templateUrl: './border.component.html',
  styleUrls: ['./border.component.css']
})
export class BorderComponent implements OnInit {

  drop(event: CdkDragDrop<Border>) {
    console.log(event);


    if (event.previousContainer === event.container) {
      let index;
      this.borders.forEach((item, i) => {
       if (event.container.data._id === item._id) { index = i; }
      });

      moveItemInArray(this.borders[index].items, event.previousIndex, event.currentIndex);
      this.apiService.updateBorder(this.borders[index]).subscribe();
    } else {
      let indexContainer;
      let indexPreContainer;
      this.borders.forEach((item, i) => {
       if (event.container.data._id === item._id) { indexContainer = i; }
        if (event.previousContainer.data._id === item._id) { indexPreContainer = i; }
      });
      transferArrayItem(this.borders[indexPreContainer].items,
        this.borders[indexContainer].items,
        event.previousIndex,
        event.currentIndex);
      this.apiService.updateBorder(this.borders[indexContainer]).subscribe();
      this.apiService.updateBorder(this.borders[indexPreContainer]).subscribe();
    }
  }

  getConectedEvent() {
    for (var i = 0; i < this.borders.length; i++) {
      this.conectedEvent.push("cdk-drop-list-" + i);
    }
    console.log(this.conectedEvent);
  }

  borders: Border[];
  conectedEvent: string[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getBorders()
  }

  onAddBorder(title: string) {
    this.apiService.addBorder({ title, _id: 11, items: [] } as Border)
      .subscribe(border => this.borders.push(border));
  }

  getBorders(): void {
    this.apiService.getBorder()
      .subscribe(borders => {
        this.borders = borders;
        this.getConectedEvent();
      });


  }

  deleteBorder(border: Border): void {
    this.apiService.deleteBorder(border)
      .subscribe(border => {
        let index = this.borders.indexOf(border);
        this.borders.forEach((item, i) => {
          if (item._id === border._id) { index = i; }
        });
        this.borders.splice(index, 1)
      });
  }

  addTodo(title: string, border: Border): void {
    border.items.push(title);
    this.apiService.updateBorder(border).subscribe();
  }

  editTodo(todo: string, border: Border): void {
    let index = border.items.indexOf(todo);
    let name = prompt("Edit todo", border.items[index]);
    if (!name) { return }
    border.items[index]
    this.apiService.updateBorder(border).subscribe();
  }

  deleteTodo(todo: string, border: Border): void {
    let index = border.items.indexOf(todo);
    border.items.splice(index, 1);
    this.apiService.updateBorder(border).subscribe(data => { });
  }

}
