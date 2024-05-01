import { Restricao } from './restricao.model';

export class Restricoes {

  public restricoesContantes: Restricao<any>[];

  constructor(
    private restricoes: Restricao<any>[],
    restricoesContantes?: Restricao<any>[]
  ) {
    if (restricoesContantes !== undefined) {
      this.restricoesContantes = restricoesContantes;
      this.restricoesContantes.forEach(r => {
        if (!r.isAtiva()) {
          console.error('O valor da restrição ${r.atributo} não foi definido!');
        }
      });
    }
    else {
      this.restricoesContantes = [];
    }
  }

  public atributo(atributo: string): Restricao<any> {
    return this.restricoes.filter(item => item.atributo === atributo)[0];
  }

  public getAtivas(): Restricao<any>[] {

    const result: Restricao<any>[] = [];

    this.restricoesContantes.forEach(r => result.push(r));

    this.restricoes.forEach(restricao => {
      if (restricao.isAtiva()) {
        result.push(restricao);
      }
    });

    return result;
  }

  public limpar(): void {
    this.restricoes.forEach(restricao => {
      if (restricao.isAtiva()) {
        restricao.limpar();
      }
    });
  }
}
