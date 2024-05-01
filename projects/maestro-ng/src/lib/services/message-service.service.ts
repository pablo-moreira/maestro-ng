import { Injectable } from '@angular/core';
import { MessageService as MsPrimeng } from 'primeng/api';

@Injectable()
export class MessageService {

  constructor(
    private messageService: MsPrimeng
  ) {
  }

  public addSuccess(title: string, message: string): void {
    this.addMessage('success', title, message);
  }

  public addInfo(title: string, message: string): void {
    this.addMessage('info', title, message);
  }

  public addError(title: string, message: string): void {
    this.addMessage('error', title, message);
  }

  public addWarn(title: string, message: string): void {
    this.addMessage('warn', title, message);
  }

  public clear(): void {
    this.messageService.clear();
  }

  private addMessage(severity: string, title: string, message: string): void {
    setTimeout(() => {
      this.messageService.add({ severity, summary: title, detail: message });
    }, 1);
  }
}
