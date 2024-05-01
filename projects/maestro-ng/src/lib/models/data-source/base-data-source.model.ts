import { ConsultaPaginadaResultado } from '../consulta/consulta-paginada-resultado.model';
import { ProgressService } from './../../services/progress-service.service';
import { MessageService } from './../../services/message-service.service';
import { LazyLoadEvent } from 'primeng/api';

export class BaseDataSource<E> {

  public entidades: E[];
  public lastLoadEvent: LazyLoadEvent;
  public total: number;

  constructor(
    protected messageService: MessageService,
    protected progressService: ProgressService,
    public rows = 10,
    protected onLazyLoadAction: (event: LazyLoadEvent) => Promise<ConsultaPaginadaResultado<E>>) {
  }

  public load(): void {
    this.onLazyLoad({ first: 0, rows: this.rows });
  }

  public refresh(): void {
    this.onLazyLoad(this.lastLoadEvent);
  }

  public onEnterSearch(event: any): void {
    if (event.keyCode === 13) {
      this.load();
    }
  }

  public onLazyLoad(event: LazyLoadEvent): void {
    this.progressService.showModeless();
    this.onLazyLoadAction(event)
      .then(result => {
        this.entidades = result.entidades;
        this.lastLoadEvent = event;
        this.total = result.total;
        this.progressService.hide();
      })
      .catch(result => {
        this.messageService.addError('Erro ao carregar os dados no servidor', result.error);
        this.progressService.hide();
      });
  }
}
