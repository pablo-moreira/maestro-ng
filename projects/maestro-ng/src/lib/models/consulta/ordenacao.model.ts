export class Ordenacao {

  constructor(public atributo: string, public ordem: string) {}

  static asc(atributo: string) {
    return new Ordenacao(atributo, 'ASC');
  }

  static desc(atributo: string) {
    return new Ordenacao(atributo, 'DESC');
  }
}
