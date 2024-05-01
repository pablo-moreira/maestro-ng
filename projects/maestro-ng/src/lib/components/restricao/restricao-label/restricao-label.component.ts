import { Restricao } from './../../../models/consulta/restricao.model';
import { Operador } from './../../../models/consulta/operador.interface';
import { Component, Input } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';


@Component({
  selector: 'm-restricao-label',
  templateUrl: './restricao-label.component.html',
  styleUrls: ['./restricao-label.component.css']
})
export class RestricaoLabelComponent {

  @Input() public label: string;
  @Input() public restricao: Restricao<any>;
  @Input() public operadores: Operador[];

  constructor() {}

  public getOperadorLabel(): string {
    return this.operadores.filter(op => this.restricao.operador === op.id)[0].label;
  }

  public onChangeOperador(op: OverlayPanel): void {
    this.restricao.onChangeOperador();
    op.hide();
  }
}
