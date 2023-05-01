import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  // publicを指定する理由：messageServiceをhtmlテンプレートから参照するため
  constructor(public messageService: MessageService) {}

  ngOnInit(): void {}
}
