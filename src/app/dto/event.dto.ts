import {IPerson} from './person.dto'
import {stateFlag} from './flag.dto'

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
    state: stateFlag
}

export const IEventHeaders={
    id: 'ID',
    category: 'Категория',
    detention_by: 'Кем задержан',
    detention_reason: 'Повод задержания',
    keeping_place: 'Место хранения',
    detention_date: 'Дата задержания',
    detention_time: 'Время задержания',
    additional: 'Дополнительная информация',
}

export const emptyEvent = {
    additional: '',
    category: '',
    detention_by: '',
    detention_date: '',
    detention_reason: '',
    detention_time: '',
    id: null,
    keeping_place: '',
    persons: [] as IPerson[],
    state: stateFlag.isReaded
  }