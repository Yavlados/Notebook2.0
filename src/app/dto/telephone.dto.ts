import {IContact} from './contact.dto'
import { stateFlag } from './flag.dto'

export interface ITelephone {
    id: null | number,
    number: null | string
    oldnum: null | boolean
    internum: null | boolean
    contacts: IContact[]
    person_id: number
    state: stateFlag
}

export const emptyTelephone = {
    id: null,
    number: '',
    oldnum: null,
    internum: null,
    contacts: [],
    person_id: null,
    state: stateFlag.isReaded
  }