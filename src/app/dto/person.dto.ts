import {ITelephone} from './telephone.dto'
import {stateFlag} from './flag.dto'

export interface IPerson {
    id: number,
    lastname: string | null,
    name: string | null,
    midname: string | null,
    alias: string | null
    telephones: ITelephone[]
    state: stateFlag
}

export const IPersonHeaders = {
    id: "ID",
    lastname: "Фамилия",
    name: "Имя",
    midname: "Отчество",
    alias: "Кличка"
}

export const emptyPerson :IPerson = {
    alias: '',
    lastname: '',
    midname: '',
    name: '',
    id: null,
    telephones: [],
    state: stateFlag.isReaded
  }