import {stateFlag} from './flag.dto'

export interface IContact {
    id: null | number,
    number: null | string
    oldnum: null | boolean
    internum: null | boolean
    alias: null | string
    telephone_id?:  number,
    state: stateFlag
}

export const emptyContact:IContact = {
    id: null,
    alias: '',
    internum: false,
    number:'',
    oldnum:false,
    state: stateFlag.isReaded
}