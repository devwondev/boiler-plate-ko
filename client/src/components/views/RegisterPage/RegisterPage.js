import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        //페이지리프레쉬막는기능
        event.preventDefault();

        console.log('Email:', Email)
        console.log('Password:', Password)
        
        if(Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야합니다.')
        }

        let body = {
            email:Email,
            name:Name,
            password:Password
        }

        dispatch(registerUser(body))
            .then((response) => {
                if(response.payload.success) {
                    props.history.push('/login')
                } else {
                    alert('Failed to sign up')
                }
            })
        
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'
        , width:'100%', height:'100vh' }}
        onSubmit={onSubmitHandler}>
            
            <form style={{display:'flex', flexDirection:'column'}}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button>
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
