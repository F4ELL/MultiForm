import { ChangeEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { SelectOption } from '../../components/SelectOption'
import { Theme } from '../../components/Theme'
import { FormActions, useForm } from '../../contexts/FormContext'
import * as C from './styles'

export const FormStep3 = () => {

    const history = useNavigate()
    const { state, dispatch } = useForm()

    useEffect(() => {
        if(state.name === ''){
            history('/')
        } else {
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 3
            })
        }
    }, [])

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setEmail,
            payload: e.target.value
        })
    }

    const handleGithubChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setGithub,
            payload: e.target.value
        })
    }

    const handleNextStep = () => {
        if(state.email !== '' && state.github !== ''){
            console.log(state)
        } else{
            alert('Preencha todos os campos.')
        }
    }

    return(
        <Theme>
            <C.Container>
                <p>Passo {state.currentStep}/3</p>
                <h1>Legal {state.name}, onde te achamos?</h1>
                <p>Preencha com seus contatos para conseguirmos entrarmos em contato.</p>

                <hr />

                <label>
                    Qual seu e-mail?
                    <input type="email" value={state.email} onChange={handleEmailChange}/>
                </label>

                <label>
                    Qual seu Github?
                    <input type="url" value={state.github} onChange={handleGithubChange}/>
                </label>

                <Link to='/step2' className='backButton'>Voltar</Link>
                <button onClick={handleNextStep}>Finalizar Cadastro</button>
            </C.Container>
        </Theme>
    )
}




