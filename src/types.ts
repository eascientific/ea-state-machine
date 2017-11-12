import { FSM } from './ea-state-machine'

export interface State {
  name: string
  count?: number
  order?: number
  valid?: boolean
  changed?: boolean
  data?: any
}

export interface StateMap {
  [index: string]: State
  [index: number]: State
}

export interface Transition {
  name: string
  failingGuards: Guard[]
  fromState: State
  toState: State
  transitionDefinition: TransitionDefinition
}
export interface TransitionDefinitionMap {
  [index: string]: TransitionDefinition
  [index: number]: TransitionDefinition
}

export interface TransitionDefinition {
  name?: string
  order?: number
  valid?: boolean
  data?: any
  guards?: Guard[]
  from: State | State[] | StateResolveFunc
  to: State | State[] | StateResolveFunc
  // from(currentState: State): State[]
  select?(transitions, fsm)
  // to(currentState: State): State[]
  action(fsm: FSM)
}

export type StateResolveFunc = (fsm: FSM) => State[]

export interface Guard {
  (allStates: string, to: number, order: number, valid: boolean, data?: any)
}

export type TransitionFilter = (tansitions: Transition[], fsm?: FSM) => Transition[]
