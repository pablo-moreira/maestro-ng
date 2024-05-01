import { Component, Input } from '@angular/core';
import { Restricao } from './../../../models/consulta/restricao.model';
import { RestricaoOperador } from './../../../models/consulta/restricao-operador.enum';
import { Operador } from './../../../models/consulta/operador.interface';

@Component({
  selector: 'm-restricao-entidade',
  templateUrl: './restricao-entidade.component.html',
  styleUrls: ['./restricao-entidade.component.css'],
})
export class RestricaoEntidadeComponent {

  @Input() public label: string;
  @Input() public itens: any[];
  @Input() public itemId: string;
  @Input() public itemLabel: string;
  @Input() public restricao: Restricao<any>;

  public operadores: Operador[] = [];

  constructor() {
    this.operadores.push({ id: RestricaoOperador.EQUALS, label: 'Igual' });
    this.operadores.push({ id: RestricaoOperador.NOT_EQUALS, label: 'Diferente' });
    this.operadores.push({ id: RestricaoOperador.IN, label: 'Dentro das opções' });
    this.operadores.push({ id: RestricaoOperador.NOT_IN, label: 'Fora das opções' });
    this.operadores.push({ id: RestricaoOperador.IS_NOT_NULL, label: 'Com definição' });
    this.operadores.push({ id: RestricaoOperador.IS_NULL, label: 'Sem definição' });
  }

  public getName(): string {
    return `restricao_${this.restricao.atributo.replace('.', '_')}_value`;
  }
}
