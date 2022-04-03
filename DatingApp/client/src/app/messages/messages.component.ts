import { Pagination } from 'src/app/models/Pagination';

import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { MessageService } from '../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  pagination: Pagination;
  container: string = 'Unread';
  pageNumber: number = 1;
  pageSize: number = 5;
  loading: boolean = false;

  constructor(private messageService:MessageService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(x => {
      this.messages = x.result;
      this.pagination = x.pagination;
      this.loading = false;
    });
  }

  pageChanged(event: any):void {
    // if(this.pageNumber  !== event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    // }
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe(x => {
      //this.messages = this.messages.filter(x => x.id !== id);
      this.messages.splice(this.messages.findIndex(x => x.id === id), 1);
    });
  }

}
