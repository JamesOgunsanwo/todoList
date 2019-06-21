import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';


@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  tasks: string[] = ['Dummy Task one', 'Dummy Task two'];
  errorMessage: string = '';
  designValue: string = 'default';
  showCreateForm: boolean = false;
  classValue = '';

  private containsDummy: booelan = true;

  constructor() { }

  csvOptions = {
   fieldSeparator: ',',
   quoteStrings: '"',
   decimalseparator: '.',
   showLabels: true,
   showTitle: true,
   title: 'Your Holiday List :',
   useBom: true,
   noDownload: false,
   headers: ["Holiday ID", "Holiday Date", "Holiday Comment", "Holiday Status"]
 };

  ngOnInit() {
    this.startup();
  }

  startup() {
    this.errorMessage = '';
    this.containsDummy = true;
    this.tasks = ['Dummy Task one', 'Dummy Task two'];
  }

  private openAddTask() {
    this.showCreateForm = true;
  }

  private addTask(value: string) {
    const message = 'Please add a task';
    this.containsDummy === true ? this.removeDummyDate() : this.containsDummy = false;
    value.length > 0 ? this.tasks.push(value.toString()) : this.createErrorMessage();
    this.containsDummy = false;
    this.showCreateForm = false;
  }

  private deleteTask(task: string) {
    const message = 'An error has occured deleting this task'
    const itemLocation = this.tasks.indexOf(task);
    let tempArray: string = []
    let i = 0;
    this.tasks.forEach(task => {
      if (i !== itemLocation)
        tempArray.push(task)
      i++;
    });
    this.tasks = tempArray;
  }

  private createErrorMessage(message: string) {
    this.errorMessage = message;
  }

  private markAsComplete(elementId: string) {
    let divToChange = document.getElementById(elementId);
    divToChange.setAttribute("class", "complete");
  }

  private removeDummyDate() {
    this.tasks = [];
  }

  private closeDialog() {
    this.showCreateForm = false;
  }

  private exportToExcel() {
    let convertMap = new Map();
    convertMap.set("Tasks", this.tasks);
    this.downloadFile(convertMap);
  }

  downloadFile(files: any) {
    var tempArray = [['My List'],['\n' + '\n']];
    for (var i = 0; i < this.tasks.length; i++){
      tempArray.push([this.tasks[i]]);
      tempArray.push(['\n']);
    }
    console.log(tempArray);
    var blob = new Blob(tempArray);
    saveAs(blob, 'myList.txt');
    console.log("Test");
  }
}
