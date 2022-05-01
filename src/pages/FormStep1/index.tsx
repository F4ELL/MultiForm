import { ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Theme } from '../../components/Theme'
import { FormActions, useForm } from '../../contexts/FormContext'
import * as C from './styles'

export const FormStep1 = () => {

    const history = useNavigate()
    const { state, dispatch } = useForm()

    useEffect(() => {
        dispatch({
            type: FormActions.setCurrentStep,
            payload: 1
        })
    }, [])

    const handleNextStep = () => {
        if(state.name !== ''){
            history('/step2')
        } else{
            alert('Preencha os dados.')
        }
    }

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setName,
            payload: e.target.value
        })
    }

    return(
        <Theme>
            <C.Container>
                <p>Passo {state.currentStep}/3</p>
                <h1>Vamos começar com seu nome</h1>
                <p>Preencha o campo abaixo com seu nome completo.</p>

                <hr />

                <label>
                    Seu Nome Completo
                    <input type="text" autoFocus onChange={handleNameChange} value={state.name}/>
                </label>

                <button onClick={handleNextStep}>Próximo</button>
            </C.Container>
        </Theme>
    )
}