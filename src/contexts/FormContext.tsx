import { createContext, ReactNode, useContext, useReducer } from 'react'

type TState = {
    currentStep: number,
    name: string,
    level: 0 | 1,
    email: string,
    github: string
}

type TAction = {
    type: FormActions,
    payload: any
}

type TContext = {
    state: TState,
    dispatch: (action: TAction) => void
}

type TFormProvider = {
    children: ReactNode
}

const initialData: TState = {
    currentStep: 0,
    name: '',
    level: 0,
    email: '',
    github: ''
}

const FormContext = createContext<TContext | undefined>(undefined)

export enum FormActions {
    setCurrentStep,
    setName,
    setLevel,
    setEmail,
    setGithub
}

const formReducer = (state: TState, action: TAction) => {
    switch(action.type){
        case FormActions.setCurrentStep: 
            return {...state, currentStep: action.payload}
        case FormActions.setName: 
            return {...state, name: action.payload}
        case FormActions.setLevel:
            return {...state, level: action.payload}
        case FormActions.setEmail:
            return {...state, email: action.payload}
        case FormActions.setGithub:
            return {...state, github: action.payload}
        default:
            return state
    }
}

export const FormProvider = ({ children }: TFormProvider) => {

    const [state, dispatch] = useReducer(formReducer, initialData)
    const value = { state, dispatch }

    return(
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    )
}

export const useForm = () => {
    const context = useContext(FormContext)
    if(context === undefined){
        throw new Error('useForm precisa ser usado dentro do FormProvider')
    }
    return context
}