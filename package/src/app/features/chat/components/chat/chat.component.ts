import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ChatService } from '../../core/chat.service';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { UsersService } from 'src/app/features/users/core/services/users.service';
import { Message } from './chat';

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
export class AppChatComponent {
  private chatService = inject(ChatService);
  private userService = inject(UsersService);
  private currentUserService = inject(CurrentUserService);

  sidePanelOpened = true;
  msg = signal('');
  searchTerm = signal('');
  selectedMessage = signal<Message | null>(null);

  constructor() { 
    this.loadExtraUsersIfNeeded();
   }

  // 🔁 Computed messages din service
  messages = computed(() => this.chatService.messages());

  // 🔍 Computed pentru filtrare
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
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  selectMessage(message: Message): void {
    this.selectedMessage.set(message);
    this.chatService.setSelectedMessage(message);
    console.log('Selected message:', message);

    if (this.isOver()) {
      this.sidePanelOpened = false;
    }
  }

  sendMessage(): void {
    const currentSelectedMessage = this.selectedMessage();
    if (currentSelectedMessage) {
      this.chatService.sendMessage(currentSelectedMessage, this.msg());
      this.msg.set('');
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
          photo: 'assets/images/profile/user-1.jpg',
          chat: [],
        }));

      if (newMessages.length > 0) {
        const merged = [...baseMessages, ...newMessages];
        this.chatService.overrideMessages(merged);
      }
    });
  }
}
