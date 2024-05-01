import { Injectable } from '@angular/core';

export interface ProgressDialogModel {
  message: string;
  visible: {
    modal: boolean,
    modeless: boolean
  };
}

@Injectable()
export class ProgressService {

  private model: ProgressDialogModel = {
    message: 'Por favor, aguarde um momento!',
    visible: {
      modal: false,
      modeless: false
    }
  };

  public getModel(): ProgressDialogModel {
    return this.model;
  }

  public showModal(): void {
    setTimeout(() => {
      this.model.visible.modal = true;
      this.model.visible.modeless = false;
    }, 1);
  }

  public showModeless(): void {
    setTimeout(() => {
      this.model.visible.modal = false;
      this.model.visible.modeless = true;
    }, 1);
  }

  public hide(): void {
    setTimeout(() => {
      this.model.visible.modal = false;
      this.model.visible.modeless = false;
    }, 1);
  }
}
