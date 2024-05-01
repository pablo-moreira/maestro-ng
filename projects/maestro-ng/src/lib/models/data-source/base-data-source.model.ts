import { ConsultaPaginadaResultado } from '../consulta/consulta-paginada-resultado.model';
import { ProgressoService } from '../../services/progresso-service.service';
import { MensagemService } from '../../services/mensagem-service.service';
import { LazyLoadEvent } from 'primeng/api';

export class BaseDataSource<E> {

  public entidades: E[];
  public ultimoCarregamentoEvento: LazyLoadEvent;
  public total: number;

  constructor(
    protected mensagemService: MensagemService,
    protected progressoService: ProgressoService,
    public registros = 10,
    protected carrregador: (event: LazyLoadEvent) => Promise<ConsultaPaginadaResultado<E>>) {
  }

  public pesquisar(): void {
    this.carregar({ first: 0, rows: this.registros });
  }

  public atualizar(): void {
    this.carregar(this.ultimoCarregamentoEvento);
  }

  public onEnterPesquisar(evento: any): void {
    if (evento.keyCode === 13) {
      this.pesquisar();
    }
  }

  public carregar(evento: LazyLoadEvent): void {
    this.progressoService.modeless();
    this.carrregador(evento)
      .then(result => {
        this.entidades = result.entidades;
        this.ultimoCarregamentoEvento = evento;
        this.total = result.total;
        this.progressoService.fechar();
      })
      .catch(result => {
        this.mensagemService.addErro('Erro ao carregar os dados no servidor', result.error);
        this.progressoService.fechar();
      });
  }
}
