import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable()
export class ConfirmacaoService {

  constructor(
    private confirmationService: ConfirmationService
  ) {}

  public confirmar(model: Confirmacao) {
    this.confirmationService.confirm({
      key: 'global',
      header: model.titulo,
      message: model.mensagem,
      accept: model.aceitar,
      reject: model.rejeitar
    });
  }
}

export interface Confirmacao {
  titulo?: string;
  mensagem: string;
  aceitar?: () => void;
  rejeitar?: () => void;
}
