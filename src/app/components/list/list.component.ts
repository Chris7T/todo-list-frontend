import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { List } from '../../models/list';
import { ListService } from '../../services/list.services';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { PaginationLinks, PaginationMeta } from 'src/app/models/paginateList';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  lists: List[] = [];
  modalRef: BsModalRef;
  newListName: string = '';
  generalError: string = null;
  validationErrors: any = {};

  paginationLinks: PaginationLinks;
  paginationMeta: PaginationMeta;

  @ViewChild('template') template: TemplateRef<any>;

  constructor(
    private listService: ListService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.redirectToRegisterIfNoToken();
    this.fetchLists();
  }

  fetchLists(page: number = 1): void {
    this.declineAdd();
    this.listService.listList(page).subscribe(
      response => {
        this.lists = response.data;
        this.paginationLinks = response.links;
        this.paginationMeta = response.meta;
      }
      );
  }

  enableEdition(list: List): void {
    list.editing = true;
  }

  updateName(list: List): void {
    this.listService.updateList(list.id, list).subscribe(
      _ => {
        list.editing = false;
      },
      error => this.handleTaskError(error)
    );
  }

  deleteList(id: number): void {
    this.listService.deleteList(id).subscribe(
      _ => {
        this.fetchLists();
      },
      error => this.handleTaskError(error)
    );
  }

  addList(): void {
    this.modalRef = this.modalService.show(this.template);
  }

  confirmAdd(): void {
    let newList: List = {
      id: null,
      name: this.newListName,
      editing: false,
    };
    this.listService.registerList(newList).subscribe(
      _ => {
        this.fetchLists();
      },
      error => this.handleTaskError(error)
    );
  }

  declineAdd(): void {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  navigateToTasks(id: number): void {
    this.router.navigate(['/task', id]);
  }

  redirectToRegisterIfNoToken(): void {
    if (!localStorage.getItem('authToken')) {
      this.router.navigate(['/register']);
    }
  }

  goToNextPage(): void {
    if (this.paginationLinks.next) {
      this.fetchLists(this.paginationMeta.current_page + 1);
    }
  }

  goToPrevPage(): void {
    if (this.paginationLinks.prev) {
      this.fetchLists(this.paginationMeta.current_page - 1);
    }
  }

  googleConnect(): void {
    const newTab = window.open('about:blank', '_blank');
  
    this.listService.googleConect().subscribe(
      (response) => {
        if (response && response.auth_url) {
          newTab.location.href = response.auth_url;
        }
      },
      _ => {
        newTab.close();
        this.generalError = 'An error occurred while trying to connect with Google. Try again later.';
      }
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
      this.generalError = 'An error has occurred. Try again later.';
    }
  }
}
