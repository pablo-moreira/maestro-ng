export class Ordenacao {

  atributo: string;
  ordem: string;

  static asc(atributo: string) {
    return {
      atributo,
      ordem: 'ASC'
    };
  }

  static desc(atributo: string) {
    return {
      atributo,
      ordem: 'DESC'
    };
  }
}
