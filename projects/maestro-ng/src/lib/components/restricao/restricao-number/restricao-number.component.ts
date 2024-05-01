import { Operador } from './../../../models/consulta/operador.interface';
import { RestricaoOperador } from './../../../models/consulta/restricao-operador.enum';
import { Restricao } from './../../../models/consulta/restricao.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'm-restricao-number',
  templateUrl: './restricao-number.component.html',
  styleUrls: ['./restricao-number.component.css'],
})
export class RestricaoNumberComponent {

  @Input({ required: true })
  public label!: string;

  @Input({ required: true })
  public restricao!: Restricao<number>;

  public operadores: Operador[] = [];

  constructor() {
    this.operadores.push({ id: RestricaoOperador.IS_NOT_NULL, label: 'Com definição' });
    this.operadores.push({ id: RestricaoOperador.EQUALS, label: 'Igual' });
    this.operadores.push({ id: RestricaoOperador.GE, label: 'Maior e igual' });
    this.operadores.push({ id: RestricaoOperador.GT, label: 'Maior que' });
    this.operadores.push({ id: RestricaoOperador.LE, label: 'Menor e igual' });
    this.operadores.push({ id: RestricaoOperador.LT, label: 'Menor que' });
    this.operadores.push({ id: RestricaoOperador.IN, label: 'Dentro das opções' });
    this.operadores.push({ id: RestricaoOperador.BETWEEN, label: 'Entre os limites' });

    this.operadores.push({ id: RestricaoOperador.IS_NULL, label: 'Sem definição' });
    this.operadores.push({ id: RestricaoOperador.NOT_EQUALS, label: 'Diferente' });
    this.operadores.push({ id: RestricaoOperador.NOT_IN, label: 'Fora das opções' });
    this.operadores.push({ id: RestricaoOperador.NOT_BETWEEN, label: 'Fora dos limites' });
  }

  public isOperadorBetween(): boolean {
    return this.restricao.isOperadorBetweenOrNotBetween();
  }

  public isOperadorMultiplo(): boolean {
    return this.restricao.isOperadorInOrNotIn();
  }

  public isOperadorSingular(): boolean {
    return !this.restricao.isOperadorInOrNotIn()
        && !this.restricao.isOperadorIsNullOrIsNotNull()
        && !this.restricao.isOperadorBetweenOrNotBetween();
  }
}
