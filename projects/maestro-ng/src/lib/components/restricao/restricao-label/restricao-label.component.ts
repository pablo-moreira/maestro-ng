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

  public onChangeOperador(op: OverlayPanel): void {
    this.restricao.onChangeOperador();
    op.hide();
  }
}
