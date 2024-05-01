import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class MensagemService {

  constructor(
    private messageService: MessageService
  ) {
  }

  public addSucesso(title: string, message: string): void {
    this.addMensagem('success', title, message);
  }

  public addInfo(title: string, message: string): void {
    this.addMensagem('info', title, message);
  }

  public addErro(title: string, message: string): void {
    this.addMensagem('error', title, message);
  }

  public addAlerta(title: string, message: string): void {
    this.addMensagem('warn', title, message);
  }

  public limpar(): void {
    this.messageService.clear();
  }

  private addMensagem(tipo: string, titulo: string, mensagem: string): void {
    setTimeout(() => {
      this.messageService.add({ severity: tipo, summary: titulo, detail: mensagem });
    }, 1);
  }
}
