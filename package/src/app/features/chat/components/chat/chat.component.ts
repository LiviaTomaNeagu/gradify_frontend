import { AfterViewInit, Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbar, NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ChatService } from '../../core/chat.service';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { UsersService } from 'src/app/features/users/core/services/users.service';
import { Message } from './chat';
import {CurrentUserResponseInterfaceDTO} from 'src/app/@core/interfaces/user.interface';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  templateUrl: './chat.component.html',
})
export class AppChatComponent implements AfterViewInit {
  @ViewChild('scrollViewport', { read: ElementRef }) scrollViewport?: ElementRef;
  
  private chatService = inject(ChatService);
  private userService = inject(UsersService);
  private currentUserService = inject(CurrentUserService);

  sidePanelOpened = true;
  msg = signal('');
  searchTerm = signal('');
  selectedMessage = signal<Message | null>(null);
  currentUser:  CurrentUserResponseInterfaceDTO | null = null;

  constructor() { 
    this.loadExtraUsersIfNeeded();
    this.currentUser = this.currentUserService.getCurrentUserInfo();
   }

  messages = computed(() => 
    {
      const msgs = this.chatService.messages();
      return msgs.map(m => {
        if (!m.photo) {
          const firstName = m.from.split(' ')[0];
          m.photo = this.getDefaultAvatar(firstName);
        }
        return m;
      });
    });

  filteredMessages = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return term
      ? this.messages().filter((m) =>
          m.from.toLowerCase().includes(term)
        )
      : this.messages();
  });

  ngOnInit() {
    this.selectedMessage.set(this.chatService.selectedMessage());

    if (this.isOver()) {
      this.sidePanelOpened = false;
    }
    this.loadExtraUsersIfNeeded();
    this.scrollToBottom();

    setTimeout(() => {
      const allMessages = this.chatService.messages();
      if (allMessages.length > 0) {
        const first = allMessages[0];
        this.selectMessage(first);
      }
    }, 100);
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }
  private scrollToBottom(): void {
    setTimeout(() => {
      const scrollContainer = this.scrollViewport?.nativeElement?.querySelector('.ng-scroll-viewport');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }, 100);
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  selectMessage(message: Message): void {
    const firstName = message.from.split(' ')[0];
    message.photo = this.getDefaultAvatar(firstName);
    this.selectedMessage.set(message);
    this.chatService.setSelectedMessage(message);
    console.log('Selected message:', message);

    if (this.isOver()) {
      this.sidePanelOpened = false;
    }
    this.scrollToBottom();
  }

  sendMessage(): void {
    const currentSelectedMessage = this.selectedMessage();
    if (currentSelectedMessage) {
      this.chatService.sendMessage(currentSelectedMessage, this.msg());
      this.msg.set('');
      this.scrollToBottom();
    }
  }

  searchMessages(): void {
    // Nu mai trebuie logică explicită, se face prin computed
  }

  private loadExtraUsersIfNeeded(): void {
    const currentUser = this.currentUserService.getCurrentUserInfo();
    if (!currentUser) return;

    this.userService.getAllShortUsers().subscribe((users) => {
      const baseMessages = this.chatService.messages();
      const existingIds = baseMessages.map((m) => m.id);

      const newMessages = users.users
        .filter((u) => u.id !== currentUser.id && !existingIds.includes(u.id))
        .map((u) => ({
          id: u.id,
          from: `${u.name} ${u.surname}`,
          subject: 'No messages yet',
          photo: this.getDefaultAvatar(u.name),
          chat: [],
        }));

      if (newMessages.length > 0) {
        const merged = [...baseMessages, ...newMessages];
        this.chatService.overrideMessages(merged);
      }
    });
  }

  getDefaultAvatar(name: string): string {
      const avatars = [
        '/assets/images/profile/user-1.jpg',
        '/assets/images/profile/user-2.jpg',
        '/assets/images/profile/user-3.jpg',
        '/assets/images/profile/user-4.jpg',
      ];
  
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
    
      const index = Math.abs(hash) % avatars.length;
      return avatars[index]; 
    }
}
