import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import {
  Boton,
  ContenedorBotonCentrado,
  Formulario,
  MensajeError,
  MensajeExito
} from '../elementos/FormularioLogin'
import InputLogin from '../components/InputLogin'
import Fatal from '../components/General/Fatal'
import Spinner from '../components/General/Spinner'

const Login = () => {
  const [password, cambiarPassword] = useState({ campo: '', valido: null })
  const [correo, cambiarCorreo] = useState({ campo: '', valido: null })
  const [formularioValido, cambiarFormularioValido] = useState(null)
  const [data, cambiarData] = useState({ loading: false, error: null })

  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }

  const onSubmit = async e => {
    e.preventDefault()
    if (
      correo.valido === 'true' &&
      password.valido === 'true'
    ) {
      cambiarData({ loading: true, error: null })
      cambiarFormularioValido(true)
      try {
        const response = await axios.post('http://localhost:8000/users/login/', {
          email: correo.campo,
          password: password.campo
        })
        console.log(response)
        cambiarData({ loading: false })
      } catch (error) {
        cambiarData({ loading: false, error: error })
      }

      cambiarPassword({ campo: '', valido: null })
      cambiarCorreo({ campo: '', valido: null })
    } else {
      cambiarFormularioValido(false)
    }
  }

  if (data.loading === true) {
    return <Spinner />
  }

  if (data.error) {
    return <Fatal />
  }

  return (
    <main>
      <Formulario action='' onSubmit={onSubmit}>
        <InputLogin
          estado={correo}
          cambiarEstado={cambiarCorreo}
          type='email'
          label='Correo'
          placeholder='correo'
          name='email'
          leyendaError='El correo puede contener letras,numeros, puntos, guiones y guiones bajos'
          expresionRegular={expresiones.correo}
        />
        <InputLogin
          estado={password}
          cambiarEstado={cambiarPassword}
          type='password'
          label='Contraseña'
          placeholder='Contraseña'
          name='password'
          leyendaError='La contraseña debe tener de 4 a 12 digitos'
          expresionRegular={expresiones.password}
        />
        {formularioValido === false &&
          <MensajeError>
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <b>Error:</b> Por favor rellena el formulario correctamente.
            </p>
          </MensajeError>}
        <ContenedorBotonCentrado>
          <Boton type='submit'>Enviar</Boton>
          {formularioValido === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>}
        </ContenedorBotonCentrado>
      </Formulario>
    </main>
    /*
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
    */
  )
}

export default Login
