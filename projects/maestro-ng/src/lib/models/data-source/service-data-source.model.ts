import { LazyLoadEvent, SortMeta } from 'primeng/api';
import { ConsultaPaginadaResultado } from '../consulta/consulta-paginada-resultado.model';
import { MensagemService } from '../../services/mensagem-service.service';
import { ProgressoService } from '../../services/progresso-service.service';
import { ConsultaPaginada } from './../consulta/consulta-paginada.model';
import { Ordenacao } from './../consulta/ordenacao.model';
import { Restricao } from './../consulta/restricao.model';
import { Restricoes } from './../consulta/restricoes.model';

export class ServiceDataSource<E, I> {

  public entidades: E[];
  public ultimoCarregamentoEvento: LazyLoadEvent;
  public total: number;
  public restricoes: Restricoes;

  constructor(
    private carregador: (consulta: ConsultaPaginada) => Promise<ConsultaPaginadaResultado<E>>,
    private mensagemService: MensagemService,
    private progressoService: ProgressoService,
    public registros = 10) {
  }

  public carregar(evento: LazyLoadEvent): void {

    let restricoesLista: Array<Restricao<any>>;

    if (this.restricoes !== undefined) {
      restricoesLista = this.restricoes.getAtivas();
    }

    const consulta = this.novaConsultaPaginada(evento, restricoesLista);

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
    this.restricoes.limpar();
    this.carregar(this.ultimoCarregamentoEvento);
  }

  public pesquisar(): void {

    const event = {
      first: 0,
      rows: this.registros,
      sortField: undefined as string,
      sortOrder: undefined as number,
      multiSortMeta: undefined as SortMeta[]
    };

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

  private novaConsultaPaginada(evento: LazyLoadEvent, restricoes: Restricao<any>[]): ConsultaPaginada {

    const consulta: ConsultaPaginada = {
      inicio: evento.first,
      limite:  evento.rows,
      ordenacoes: [] as Ordenacao[],
      restricoes: [] as Restricao<any>[],
      contabilizar: true,
      distinguir: false
    };

    if (restricoes && restricoes.length > 0) {
      consulta.restricoes = restricoes;
    }

    if (evento.multiSortMeta) {
      evento.multiSortMeta.forEach(s => {
        consulta.ordenacoes.push({
          atributo: s.field,
          ordem: s.order === -1 ? 'DESC' : 'ASC'
        });
      });
    }
    else if (evento.sortField) {
      consulta.ordenacoes.push({
        atributo: evento.sortField,
        ordem: evento.sortOrder === -1 ? 'DESC' : 'ASC'
      });
    }

    return consulta;
  }
}
