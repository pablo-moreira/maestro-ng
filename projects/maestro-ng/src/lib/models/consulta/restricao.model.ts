import { RestricaoOperador } from './restricao-operador.enum';
import { RestricaoPadrao } from './restricao-padrao.enum';

export interface IRestriction<T> {
  atributo: string;
  operador: RestricaoOperador;
  valor?: T;
  valores?: T[];
  valorInicial?: T;
  valorFinal?: T;
  padrao?: RestricaoPadrao;
}

export class Restricao<T> {

  public atributo: string;
  public operador: RestricaoOperador;
  public valor?: T;
  public valores?: T[];
  public valorInicial?: T;
  public valorFinal?: T;
  public padrao?: RestricaoPadrao;

  constructor(params: IRestriction<T>) {
      this.atributo = params.atributo;
      this.operador = params.operador;
      this.valor = params.valor;
      this.valores = params.valores;
      this.valorInicial = params.valorInicial;
      this.valorFinal = params.valorFinal;
      this.padrao = params.padrao;
  }

  public limpar(): void {
    this.valor = undefined;
    this.valores = [];
    this.valorInicial = undefined;
    this.valorFinal = undefined;
  }

  public isNullOrEmpty(value: any): boolean {

    let result;

    if (typeof value === 'string') {
      result = value === undefined || value === null || String(value).trim() === '';
    }
    else {
      result = value === undefined || value === null;
    }

    return result;
  }

  public isAtiva(): boolean {

    let resultado = false;

    if (this.isOperadorIsNullOrIsNotNull()) {
      resultado = true;
    }
    else if (this.isOperadorBetweenOrNotBetween()) {
      resultado = !this.isNullOrEmpty(this.valorInicial) && !this.isNullOrEmpty(this.valorFinal);
    }
    else if (this.isOperadorInOrNotIn()) {
      resultado = this.valores !== undefined && this.valores.length > 0;
    }
    else {
      resultado = !this.isNullOrEmpty(this.valor);
    }

    return resultado;
  }

  public isOperadorInOrNotIn(): boolean {
    return RestricaoOperador.IN === this.operador || RestricaoOperador.NOT_IN === this.operador;
  }

  public isOperadorIsNullOrIsNotNull(): boolean {
    return RestricaoOperador.IS_NULL === this.operador || RestricaoOperador.IS_NOT_NULL === this.operador;
  }

  public isOperadorBetweenOrNotBetween(): boolean {
    return RestricaoOperador.BETWEEN === this.operador || RestricaoOperador.NOT_BETWEEN === this.operador;
  }

  public isOperadorEqualsOrNotEquals(): boolean {
    return RestricaoOperador.EQUALS === this.operador || RestricaoOperador.NOT_EQUALS === this.operador;
  }

  public onChangeOperador(): void {
    if (this.isOperadorInOrNotIn()) {
      this.valorInicial = this.valorFinal = this.valor = undefined;
    }
    else if (this.isOperadorBetweenOrNotBetween()) {
      this.valor = undefined;
      this.valores = [];
    }
    else if (this.isOperadorIsNullOrIsNotNull()) {
      this.valorInicial = this.valorFinal = this.valor = undefined;
      this.valores = [];
    }
    else {
      this.valorInicial = this.valorFinal = undefined;
      this.valores = [];
    }
  }
}
