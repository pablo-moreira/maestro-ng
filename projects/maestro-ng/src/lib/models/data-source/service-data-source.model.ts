import { TableLazyLoadEvent } from 'primeng/table';
import { ConsultaPaginadaResultado } from '../consulta/consulta-paginada-resultado.model';
import { MensagemService } from '../../services/mensagem-service.service';
import { ProgressoService } from '../../services/progresso-service.service';
import { ConsultaPaginada } from './../consulta/consulta-paginada.model';
import { Restricao } from './../consulta/restricao.model';
import { Restricoes } from './../consulta/restricoes.model';
import { SortMeta } from 'primeng/api';

export class ServiceDataSource<E, I> {

  entidades: E[] = [];
  protected ultimoCarregamentoEvento?: TableLazyLoadEvent;
  total: number = 0;
  ordenacoes: SortMeta[] = [];

  constructor(
    private carregador: (consulta: ConsultaPaginada) => Promise<ConsultaPaginadaResultado<E>>,
    private mensagemService: MensagemService,
    private progressoService: ProgressoService,
    public registros: number,
    public restricoes: Restricoes) {
  }

  public carregar(evento?: TableLazyLoadEvent): void {

    const consulta = this.novaConsultaPaginada(this.restricoes.getAtivas(), evento);

    this.progressoService.modeless();
    this.carregador(consulta)
      .then(result => {
        this.entidades = result.entidades;
        this.ultimoCarregamentoEvento = evento;
        this.total = result.total;
        this.progressoService.fechar();
      })
      .catch(result => {
        this.mensagemService.addErro('Erro ao pesquisar os dados', result.error);
        this.progressoService.fechar();
      });
  }

  public atualizar(): void {
    this.carregar(this.ultimoCarregamentoEvento);
  }

  public limpar(): void {
    if (this.restricoes !== undefined) {
      this.restricoes.limpar();
    }
    this.carregar(this.ultimoCarregamentoEvento);
  }

  public pesquisar(): void {

    const event = {
      first: 0,
      rows: this.registros,
      sortField: undefined,
      sortOrder: undefined,
      multiSortMeta: undefined
    } as TableLazyLoadEvent;

    if (this.ultimoCarregamentoEvento !== undefined) {
      event.sortField = this.ultimoCarregamentoEvento.sortField;
      event.sortOrder = this.ultimoCarregamentoEvento.sortOrder;
      event.multiSortMeta = this.ultimoCarregamentoEvento.multiSortMeta;
    }

    this.carregar(event);
  }

  public onEnterPesquisar(event: any): void {
    if (event.keyCode === 13) {
      this.pesquisar();
    }
  }

  private novaConsultaPaginada(restricoes: Restricao<any>[], evento?: TableLazyLoadEvent): ConsultaPaginada {

    const inicio = evento !== undefined ? evento.first || 0 : 0;
    const fim = evento !== undefined ? evento.rows || this.registros : this.registros;

    const consulta: ConsultaPaginada = {
      inicio: inicio,
      limite: fim,
      ordenacoes: [],
      restricoes: [],
      contabilizar: true,
      distinguir: false
    };

    if (restricoes.length > 0) {
      consulta.restricoes = restricoes;
    }

    if (evento !== undefined && evento.multiSortMeta) {
      evento.multiSortMeta.forEach(s => {
        consulta.ordenacoes.push({
          atributo: s.field,
          ordem: s.order === -1 ? 'DESC' : 'ASC'
        });
      });
    }
    else if (evento !== undefined && evento.sortField) {
      consulta.ordenacoes.push({
        atributo: evento.sortField as string,
        ordem: evento.sortOrder === -1 ? 'DESC' : 'ASC'
      });
    }

    return consulta;
  }
}
