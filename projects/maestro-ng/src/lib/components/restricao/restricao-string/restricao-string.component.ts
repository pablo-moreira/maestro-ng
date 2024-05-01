import { Restricao } from './../../../models/consulta/restricao.model';
import { Component, Input } from '@angular/core';
import { Operador } from './../../../models/consulta/operador.interface';
import { RestricaoOperador } from './../../../models/consulta/restricao-operador.enum';

@Component({
  selector: 'm-restricao-string',
  templateUrl: './restricao-string.component.html',
  styleUrls: ['./restricao-string.component.css'],
})
export class RestricaoStringComponent {

  @Input({ required: true })
  public label!: string;

  @Input({ required: true })
  public restricao!: Restricao<string>;

  public operadores: Operador[] = [];

  constructor() {
    this.operadores.push({ id: RestricaoOperador.IS_NOT_NULL, label: 'Com definição' });
    this.operadores.push({ id: RestricaoOperador.EQUALS, label: 'Igual' });
    this.operadores.push({ id: RestricaoOperador.CONTAINS, label: 'Contém' });
    this.operadores.push({ id: RestricaoOperador.START_WITH, label: 'Começa com' });
    this.operadores.push({ id: RestricaoOperador.END_WITH, label: 'Termina com' });
    this.operadores.push({ id: RestricaoOperador.IN, label: 'Dentro das opções' });

    this.operadores.push({ id: RestricaoOperador.IS_NULL, label: 'Sem definição' });
    this.operadores.push({ id: RestricaoOperador.NOT_EQUALS, label: 'Diferente' });
    this.operadores.push({ id: RestricaoOperador.NOT_CONTAINS, label: 'Não contém' });
    this.operadores.push({ id: RestricaoOperador.NOT_START_WITH, label: 'Não começa com' });
    this.operadores.push({ id: RestricaoOperador.NOT_END_WITH, label: 'Não termina com' });
    this.operadores.push({ id: RestricaoOperador.NOT_IN, label: 'Fora das opções' });
  }

  public isOperadorMultiplo(): boolean {
    return this.restricao !== undefined && this.restricao.isOperadorInOrNotIn();
  }

  public isOperadorSingular(): boolean {
    return this.restricao !== undefined
      && !this.restricao.isOperadorInOrNotIn()
      && !this.restricao.isOperadorIsNullOrIsNotNull();
  }
}
