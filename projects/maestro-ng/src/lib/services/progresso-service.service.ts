import { Injectable } from '@angular/core';

export interface Progresso {
  mensagem: string;
  visivel: {
    modal: boolean,
    modeless: boolean
  };
}

@Injectable()
export class ProgressoService {

  private progresso: Progresso = {
    mensagem: 'Por favor, aguarde um momento!',
    visivel: {
      modal: false,
      modeless: false
    }
  };

  public getProgresso(): Progresso {
    return this.progresso;
  }

  public modal(): void {
    setTimeout(() => {
      this.progresso.visivel.modal = true;
      this.progresso.visivel.modeless = false;
    }, 1);
  }

  public modeless(): void {
    setTimeout(() => {
      this.progresso.visivel.modal = false;
      this.progresso.visivel.modeless = true;
    }, 1);
  }

  public fechar(): void {
    setTimeout(() => {
      this.progresso.visivel.modal = false;
      this.progresso.visivel.modeless = false;
    }, 1);
  }
}
