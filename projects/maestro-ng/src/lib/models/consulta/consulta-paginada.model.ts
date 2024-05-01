import { Restricao } from './restricao.model';
import { Ordenacao } from './ordenacao.model';

export class ConsultaPaginada {
  public ordenacoes: Ordenacao[] = [];
  public restricoes: Restricao<any>[] = [];
  public inicio: number = 0;
  public limite: number = 30;
  public contabilizar = false;
  public distinguir = false;
}
