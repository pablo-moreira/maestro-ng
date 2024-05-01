import { Restricao } from './restricao.model';

export interface IRestricoes {
  getAtivas(): Array<Restricao<any>>;
  atributo(atributo: string): Restricao<any>;
  limpar(): void;
}
