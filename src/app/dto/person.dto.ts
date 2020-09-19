export interface IPerson {
    id: number,
    lastname: string | null,
    name: string | null,
    midname: string | null,
    alias: string | null
}

export const IPersonHeaders = {
    id: "ID",
    lastname: "Фамилия",
    name: "Имя",
    midname: "Отчество",
    alias: "Кличка"
}