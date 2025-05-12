import { Restricao } from './../../../models/consulta/restricao.model';
import { Operador } from './../../../models/consulta/operador.interface';
import { Component, Input } from '@angular/core';
import { Popover } from 'primeng/popover';


@Component({
  standalone: false,
  selector: 'm-restricao-label',
  templateUrl: './restricao-label.component.html',
  styleUrls: ['./restricao-label.component.css']
})
export class RestricaoLabelComponent {

  @Input({ required: true })
  public label!: string;

  @Input({ required: true })
  public restricao!: Restricao<any>;

  @Input({ required: true })
  public operadores: Operador[] = [];

  constructor() {}

  public getOperadorLabel(): string {

    const operador = this.restricao.operador;

    return this.operadores.filter(op => operador === op.id)[0].label;
  }

  public onChangeOperador(op: Popover): void {
    this.restricao.onChangeOperador();
    op.hide();
  }
}
