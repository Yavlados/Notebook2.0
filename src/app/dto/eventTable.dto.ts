export interface IEvent {
    additional: string | null
    category: string | null
    detention_by: string | null
    detention_date: string | null
    detention_reason: string | null
    detention_time: string | null
    id: number | null
    keeping_place: string | null
    persons: any[] //FIX IT!!
}

export const IEventHeaders={
    additional: 'Дополнительная информация',
    category: 'Категория',
    detention_by: 'Детеншен бай',
    detention_date: 'Детеншен дейт',
    detention_reason: 'Детеншен ризон',
    detention_time: 'Детеншен тайм',
    id: 'ID',
    keeping_place: 'Место хранения'
}
