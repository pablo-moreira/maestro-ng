import { Operador } from './../../../models/consulta/operador.interface';
import { Component, Input } from '@angular/core';
import { Restricao } from '../../../models/consulta/restricao.model';
import { RestricaoOperador } from './../../../models/consulta/restricao-operador.enum';
import { RestricaoPadrao } from './../../../models/consulta/restricao-padrao.enum';

@Component({
  standalone: false,
  selector: 'm-restricao-temporal',
  templateUrl: './restricao-temporal.component.html',
  styleUrls: ['./restricao-temporal.component.css'],
})
export class RestricaoTemporalComponent {

  @Input({ required: true })
  public label!: string;

  @Input({ required: true })
  public restricao!: Restricao<Date>;

  @Input()
  public mostrarSegundos: boolean = false;

  public operadores: Operador[] = [];

  constructor() {
    this.operadores.push({ id: RestricaoOperador.EQUALS, label: 'Igual' });
    this.operadores.push({ id: RestricaoOperador.NOT_EQUALS, label: 'Diferente' });

    this.operadores.push({ id: RestricaoOperador.GE, label: 'Maior e igual' });
    this.operadores.push({ id: RestricaoOperador.GT, label: 'Maior que' });

    this.operadores.push({ id: RestricaoOperador.LE, label: 'Menor e igual' });
    this.operadores.push({ id: RestricaoOperador.LT, label: 'Menor que' });

    this.operadores.push({ id: RestricaoOperador.BETWEEN, label: 'Entre os limites' });
    this.operadores.push({ id: RestricaoOperador.NOT_BETWEEN, label: 'Fora dos limites' });

    this.operadores.push({ id: RestricaoOperador.IS_NOT_NULL, label: 'Com definição' });
    this.operadores.push({ id: RestricaoOperador.IS_NULL, label: 'Sem definição' });
  }

  public isSomenteData(): boolean {
    return this.restricao !== undefined && (RestricaoPadrao.DATE === this.restricao.padrao || this.restricao.padrao === undefined);
  }

  public isSomenteHora(): boolean {
    return this.restricao !== undefined && RestricaoPadrao.TIME === this.restricao.padrao;
  }

  public isDataHora(): boolean {
    return this.restricao !== undefined && RestricaoPadrao.TIMESTAMP === this.restricao.padrao;
  }

  public isOperadorBetween(): boolean {
    return this.restricao !== undefined && this.restricao.isOperadorBetweenOrNotBetween();
  }

  public isOperadorSingular(): boolean {
    return this.restricao !== undefined
      && !this.restricao.isOperadorIsNullOrIsNotNull()
      && !this.restricao.isOperadorBetweenOrNotBetween();
  }
}
