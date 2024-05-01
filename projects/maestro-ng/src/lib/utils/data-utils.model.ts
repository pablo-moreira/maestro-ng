export class DataUtils {

    public static getDataNoInicioDoDia(data: Date): Date {
        const inicio = new Date(data.getTime());
        inicio.setHours(0, 0, 0, 0);
        return inicio;
    }

    public static getDataNoFimDoDia(data: Date): Date {
        const fim = new Date(data.getTime());
        fim.setHours(23, 59, 59, 999);
        return fim;
    }

    public static getDataDeHojeNoInicioDia(): Date {
        return this.getDataNoInicioDoDia(new Date());
    }

    public static getDataDeHojeNoFinalDia(): Date {
        return this.getDataNoFimDoDia(new Date());
    }
}