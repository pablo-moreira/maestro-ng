import { Ordenacao } from './../consulta/ordenacao.model';
import { ConsultaPaginada } from './../consulta/consulta-paginada.model';
import { Restricao } from './../consulta/restricao.model';
import { MessageService } from './../../services/message-service.service';
import { ProgressService } from './../../services/progress-service.service';
import { Restricoes } from './../consulta/restricoes.model';
import { LazyLoadEvent, SortMeta } from 'primeng/api';
import { ConsultaPaginadaResultado } from '../consulta/consulta-paginada-resultado.model';

export interface ServiceDataSourceLoader<E,I> {
  recuperarPaginado(consulta: ConsultaPaginada): Promise<ConsultaPaginadaResultado<E>>
}

export class ServiceDataSource<E, I> {

  public entidades: E[];
  public lastLoadEvent: LazyLoadEvent;
  public total: number;
  public restricoes: Restricoes;

  constructor(
    private loader: ServiceDataSourceLoader<E, I>,
    private messageService: MessageService,
    private progressService: ProgressService,
    public rows = 10) {
  }

  public onLazyLoad(event: LazyLoadEvent): void {

    let restrictionsList: Array<Restricao<any>>;

    if (this.restricoes !== undefined) {
      restrictionsList = this.restricoes.getAtivas();
    }

    const consulta = this.novaConsultaPaginada(event, restrictionsList);

    this.progressService.showModeless();
    this.loader.recuperarPaginado(consulta)
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

  public carregar(): void {
    this.onLazyLoad({ first: 0, rows: this.rows });
  }

  public atualizar(): void {
    this.onLazyLoad(this.lastLoadEvent);
  }

  public limpar(): void {
    this.restricoes.limpar();
    this.onLazyLoad(this.lastLoadEvent);
  }

  public buscar(): void {

    const event = {
      first: 0,
      rows: this.rows,
      sortField: undefined as string,
      sortOrder: undefined as number,
      multiSortMeta: undefined as SortMeta[]
    };

    if (this.lastLoadEvent !== undefined) {
      event.sortField = this.lastLoadEvent.sortField;
      event.sortOrder = this.lastLoadEvent.sortOrder;
      event.multiSortMeta = this.lastLoadEvent.multiSortMeta;
    }

    this.onLazyLoad(event);
  }

  public onEnterBuscar(event: any): void {
    if (event.keyCode === 13) {
      this.buscar();
    }
  }

  private novaConsultaPaginada(event: LazyLoadEvent, restricoes: Restricao<any>[]): ConsultaPaginada {

    const consulta: ConsultaPaginada = {
      inicio: event.first,
      limite:  event.rows,
      ordenacoes: [] as Ordenacao[],
      restricoes: [] as Restricao<any>[],
      contabilizar: true,
      distinguir: false
    };

    if (restricoes && restricoes.length > 0) {
      consulta.restricoes = restricoes;
    }

    if (event.multiSortMeta) {
      event.multiSortMeta.forEach(s => {
        consulta.ordenacoes.push({
          atributo: s.field,
          ordem: s.order === -1 ? 'DESC' : 'ASC'
        });
      });
    }
    else if (event.sortField) {
      consulta.ordenacoes.push({
        atributo: event.sortField,
        ordem: event.sortOrder === -1 ? 'DESC' : 'ASC'
      });
    }

    return consulta;
  }
}
