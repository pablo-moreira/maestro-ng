import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { MensagemService } from '../../services/mensagem-service.service';
import { ProgressoService } from '../../services/progresso-service.service';
import { ConsultaPaginadaResultado } from '../consulta/consulta-paginada-resultado.model';
import { ConsultaPaginada } from '../consulta/consulta-paginada.model';
import { Restricoes } from '../consulta/restricoes.model';
import { ServiceDataSource } from './service-data-source.model';

export class DataSourceRouted<E, I> extends ServiceDataSource<E, I> {

  private isChamadaPopState = false;

  constructor(
    private routeId: string,
    private carregadorRouted: (consulta: ConsultaPaginada) => Promise<ConsultaPaginadaResultado<E>>,
    mensagemService: MensagemService,
    progressoService: ProgressoService,
    private route: ActivatedRoute,
    private router: Router,
    registros: number,
    restricoes: Restricoes,
  ) {
    super((c) => this.handleRecuperarPaginado(c), mensagemService, progressoService, registros, restricoes);

    this.route.queryParams.subscribe(params => {

      const dataSource = this.toRecord(params)[this.routeId];

      if (dataSource !== undefined) {

        dataSource.restricoes.forEach(item => {
          const restricao = restricoes.atributo(item.atributo);
          restricao.valor = item.valor;
          restricao.operador = item.operador;
          restricao.valores = item.valores;
          restricao.valorInicial = item.valorInicial;
          restricao.valorFinal = item.valorFinal;
          restricao.padrao = item.padrao;
        });

        this.ordenacoes.splice(0, this.ordenacoes.length);

        dataSource.ordenacoes.forEach(ordenacao => {
          this.ordenacoes.push({ field: ordenacao.atributo, order: ordenacao.ordem === 'ASC' ? 1 : -1 });
        });
      }

      if (this.isChamadaPopState) {
        this.pesquisar();
        this.isChamadaPopState = false;
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          this.isChamadaPopState = true;
        }
      }
    });
  }

  private toRecord(params: Params): Record<string,ConsultaPaginada> {
    return params !== undefined && params['dataSource'] !== undefined
      ? JSON.parse(decodeURIComponent(params['dataSource']))
      : {};
  }

  private handleRecuperarPaginado(consulta: ConsultaPaginada): Promise<ConsultaPaginadaResultado<E>> {

    const params = this.route.snapshot.queryParams;

    const dataSources = this.toRecord(params);
    dataSources[this.routeId] = consulta;

    const paramsAtualizados = {
      ...params,
      dataSource: encodeURIComponent(JSON.stringify(dataSources)),
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: paramsAtualizados,
      queryParamsHandling: 'merge',
    });

    return this.carregadorRouted(consulta);
  }
}
