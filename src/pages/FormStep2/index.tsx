import { ChangeEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { SelectOption } from '../../components/SelectOption'
import { Theme } from '../../components/Theme'
import { FormActions, useForm } from '../../contexts/FormContext'
import * as C from './styles'

export const FormStep2 = () => {

    const history = useNavigate()
    const { state, dispatch } = useForm()

    useEffect(() => {
        if(state.name === ''){
            history('/')
        } else {
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 2
            })
        }
    }, [])

    const handleNextStep = () => {
        if(state.name !== ''){
            history('/step3')
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

    const setLevel = (level: number) => {
        dispatch({
            type: FormActions.setLevel,
            payload: level
        })
    }

    return(
        <Theme>
            <C.Container>
                <p>Passo {state.currentStep}/3</p>
                <h1>{state.name}, o que melhor descreve voce?</h1>
                <p>Escolha o opção que melhor condiz com seu estado atual profissionalmente.</p>

                <hr />

                <SelectOption title='Sou iniciante' description='Comecei a programar a menos de dois anos.' icon='🥳' selected={state.level === 0} onClick={() => setLevel(0)}/>
                <SelectOption title='Sou programador' description='Já programo há mais de dois anos.' icon='🚀' selected={state.level === 1} onClick={() => setLevel(1)}/>

                <Link to='/' className='backButton'>Voltar</Link>

                <button onClick={handleNextStep}>Próximo</button>
            </C.Container>
        </Theme>
    )
}