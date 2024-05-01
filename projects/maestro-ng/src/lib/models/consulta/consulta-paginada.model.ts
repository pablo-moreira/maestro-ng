import { Restricao } from './restricao.model';
import { Ordenacao } from './ordenacao.model';

export class ConsultaPaginada {
  public ordenacoes: Ordenacao[] = [];
  public restricoes: Restricao<any>[] = [];
  public inicio: number;
  public limite: number;
  public contabilizar = false;
  public distinguir = false;
}
