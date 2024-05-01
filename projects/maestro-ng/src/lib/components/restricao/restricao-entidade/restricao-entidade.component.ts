import { Component, Input, SimpleChanges } from '@angular/core';
import { Restricao } from './../../../models/consulta/restricao.model';
import { RestricaoOperador } from './../../../models/consulta/restricao-operador.enum';
import { Operador } from './../../../models/consulta/operador.interface';

@Component({
  selector: 'm-restricao-entidade',
  templateUrl: './restricao-entidade.component.html',
  styleUrls: ['./restricao-entidade.component.css'],
})
export class RestricaoEntidadeComponent {

  @Input({ required: true })
  public label!: string;

  @Input({ required: true })
  public restricao!: Restricao<any>;

  @Input({ required: true })
  public itens: any[] = [];

  @Input({ required: true })
  public itemId!: string;

  @Input({ required: true })
  public itemLabel!: string;

  public operadores: Operador[] = [];

  public name: string = '';

  constructor() {
    this.operadores.push({ id: RestricaoOperador.EQUALS, label: 'Igual' });
    this.operadores.push({ id: RestricaoOperador.NOT_EQUALS, label: 'Diferente' });
    this.operadores.push({ id: RestricaoOperador.IN, label: 'Dentro das opções' });
    this.operadores.push({ id: RestricaoOperador.NOT_IN, label: 'Fora das opções' });
    this.operadores.push({ id: RestricaoOperador.IS_NOT_NULL, label: 'Com definição' });
    this.operadores.push({ id: RestricaoOperador.IS_NULL, label: 'Sem definição' });
  }

  public ngOnChanges(_: SimpleChanges) {
    this.name = this.restricao ? `restricao_${this.restricao.atributo.replace('.', '_')}_value` : '';
  }

  public getName(): string {
    return this.name;
  }
}
