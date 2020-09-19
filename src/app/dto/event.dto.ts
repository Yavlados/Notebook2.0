import {IPerson} from './person.dto'

export interface IEvent {
    additional: string | null
    category: string | null
    detention_by: string | null
    detention_date: string | null
    detention_reason: string | null
    detention_time: string | null
    id: number | null
    keeping_place: string | null
    persons: IPerson[]
}

export const IEventHeaders={
    id: 'ID',
    category: 'Категория',
    detention_by: 'Кем задержан',
    detention_date: 'Дата задержания',
    detention_reason: 'Повод задержания',
    detention_time: 'Время задержания',
    keeping_place: 'Место хранения',
    additional: 'Дополнительная информация',

}
