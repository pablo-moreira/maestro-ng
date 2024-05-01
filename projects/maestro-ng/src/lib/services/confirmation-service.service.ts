import { Injectable } from '@angular/core';
import { ConfirmationService as CsPrimeng } from 'primeng/api';

@Injectable()
export class ConfirmationService {

  constructor(
    private confirmationService: CsPrimeng
  ) {}

  public confirm(model: ConfirmationRequest) {
    this.confirmationService.confirm({
      key: 'global',
      header: model.title,
      message: model.message,
      accept: model.accept,
      reject: model.reject
    });
  }
}

export interface ConfirmationRequest {
  title?: string;
  message: string;
  accept?: () => void;
  reject?: () => void;
}
