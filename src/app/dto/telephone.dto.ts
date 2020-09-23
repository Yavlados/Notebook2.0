import {IContact} from './contact.dto'

export interface ITelephone {
    id: null | number,
    number: null | string
    oldnum: null | boolean
    internum: null | boolean
    contacts: IContact[]
    person_id: number
}