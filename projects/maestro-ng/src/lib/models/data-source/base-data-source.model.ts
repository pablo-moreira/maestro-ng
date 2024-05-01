import { TableLazyLoadEvent } from 'primeng/table';
import { MensagemService } from '../../services/mensagem-service.service';
import { ProgressoService } from '../../services/progresso-service.service';
import { ConsultaPaginadaResultado } from '../consulta/consulta-paginada-resultado.model';

export class BaseDataSource<E> {

  public entidades: E[] = [];
  public ultimoCarregamentoEvento?: TableLazyLoadEvent;
  public total: number = 0;

  constructor(
    protected mensagemService: MensagemService,
    protected progressoService: ProgressoService,
    public registros = 10,
    protected carrregador: (event?: TableLazyLoadEvent) => Promise<ConsultaPaginadaResultado<E>>) {
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

  public carregar(evento?: TableLazyLoadEvent): void {
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
