import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PaginationLinks, PaginationMeta } from 'src/app/models/paginateList';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  modalRef: BsModalRef;
  taskListId: number;
  tasks: Task[] = [];
  newTask: Task = new Task();
  generalError: string = null;
  validationErrors = {
    title: null,
    description: null,
    dateTime: null
  };

  paginationLinks: PaginationLinks;
  paginationMeta: PaginationMeta;

  @ViewChild('template') template: TemplateRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.taskListId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.redirectToRegisterIfNoToken();
    this.fetchTasksByListId();
  }

  fetchTasksByListId(page: number = 1): void {
    this.declineAdd();

    this.taskService.getTasksByListId(this.taskListId, page).subscribe(
      response => {
        this.tasks = response.data;
        this.paginationLinks = response.links;
        this.paginationMeta = response.meta;
      },
      error => {
        if (error.status === 401) {
          localStorage.removeItem('authToken');
          this.redirectToRegisterIfNoToken();
        }
      }
    );
  }

  addTask(): void {
    this.newTask = new Task();
    this.modalRef = this.modalService.show(this.template);
  }

  editTask(task: Task): void {
    this.newTask = Object.assign({}, task);
    this.newTask.editing = true;
    this.modalRef = this.modalService.show(this.template);
  }

  confirm(): void {
    if (this.newTask.editing) {
      this.updateTask();
    } else {
      this.addNewTask();
    }
  }

  addNewTask(): void {
    this.newTask.task_list_id = this.taskListId;
    let formattedTask = this.formatDateTimeForTask(this.newTask);
    this.taskService.createTask(formattedTask).subscribe(
      _ => {
        this.fetchTasksByListId();
      },
      error => this.handleTaskError(error)
    );
  }

  updateTask(): void {
    let formattedTask = this.formatDateTimeForTask(this.newTask);
    this.taskService.updateTask(formattedTask).subscribe(
      _ => {
        this.fetchTasksByListId();
      },
      error => this.handleTaskError(error)
    );
  }

  declineAdd(): void {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  formatDateTimeForTask(task: Task): Task {
    if (task.date_time.includes('T')) {
      task.date_time = task.date_time.replace('T', ' ');
    }

    const parts = task.date_time.split(':');
    if (parts.length === 2 || (parts[2] && parts[2].length < 2)) {
      task.date_time += ':00';
    }

    return task;
  }

  redirectToRegisterIfNoToken(): void {
    if (!localStorage.getItem('authToken')) {
      this.router.navigate(['/register']);
    }
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      response => {
        this.fetchTasksByListId();
      },
      error => this.handleTaskError(error)
    );
  }

  handleTaskError(error): void {
    if (error.status === 422 && error.error.errors) {
      this.validationErrors = error.error.errors;
    }
    if (error.status === 404 && error.error.message) {
      this.generalError = error.error.message;
    }
    else if (error.status === 401) {
      localStorage.removeItem('authToken');
      this.redirectToRegisterIfNoToken();
    }
    else {
      this.generalError = 'An error has occurred. Try again.';
    }
  }

  goToNextPage(): void {
    if (this.paginationLinks.next) {
      this.fetchTasksByListId(this.paginationMeta.current_page + 1);
    }
  }

  goToPrevPage(): void {
    if (this.paginationLinks.prev) {
      this.fetchTasksByListId(this.paginationMeta.current_page - 1);
    }
  }
}
