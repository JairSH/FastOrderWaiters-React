import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../assets/styles/components/Login.css'
import googleIcon from '../assets/statics/google-icon.png'
import twitterIcon from '../assets/statics/twitter-icon.png'
import Spinner from './General/Spinner'
import Fatal from './General/Fatal'

class Login extends React.Component {
  state = {
    loading: false,
    error: null,
    form: {
      email: '',
      password: ''
    }
  }

  handleInput = e => {
    this.setState({
        form: {
            ...this.state.form,
            [e.target.name]: e.target.value
        }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, error: null })
    console.log(this.state.form)
    try {
      const response = await axios.post('http://localhost:8000/users/login/', this.state.form)
      console.log(response);
      this.setState({ loading: false })
      this.props.history.push('/')
    } catch (error) {
      this.setState({ loading: false, error: error })
    }
  }
  render (){
    if (this.state.loading === true ){
        return <Spinner />
      }
      
      if (this.state.error){
        return <Fatal mensaje={this.props.error}/>
      }
    return (
    <section className='login'>
        <section className='login__container'>
        <h2>Inicia sesión</h2>
        <form className='login__container--form' onSubmit={ this.handleSubmit}>
            <input
            name='email'
            className='input'
            type='text'
            placeholder='Correo'
            onChange={this.handleInput}
            />
            <input
            name='password'
            className='input'
            type='password'
            placeholder='Contraseña'
            onChange={this.handleInput}
            />
            <button className='button'>Iniciar sesión</button>
            <div className='login__container--remember-me'>
            <label>
                <input type='checkbox' id='cbox1' value='first_checkbox' />Recuérdame
            </label>
            <a href='/'>Olvidé mi contraseña</a>
            </div>
        </form>
        <section className='login__container--social-media'>
            <div><img src={googleIcon} alt='icon' /> Inicia sesión con Google</div>
            <div><img src={twitterIcon} alt='icon' /> Inicia sesión con Twitter</div>
        </section>
        <p className='login__container--register'>No tienes ninguna cuenta
            <Link to='/register'>
            Registrate
            </Link>
        </p>

        </section>
    </section>
    )

  }
}

export default Login
