import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError
} from '../elementos/Formularios'
import Input from '../components/Input'

const Register = () => {
  const [usuario, cambiarUsuario] = useState({ campo: '', valido: null })
  const [nombre, cambiarNombre] = useState({ campo: '', valido: null })
  const [apellido, cambiarApellido] = useState({ campo: '', valido: null })
  const [password, cambiarPassword] = useState({ campo: '', valido: null })
  const [password2, cambiarPassword2] = useState({ campo: '', valido: null })
  const [correo, cambiarCorreo] = useState({ campo: '', valido: null })
  const [telefono, cambiarTelefono] = useState({ campo: '', valido: null })
  const [formularioValido, cambiarFormularioValido] = useState(null)

  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }

  const validarPassword2 = () => {
    if (password.campo.length > 0) {
      if (password.campo !== password2.campo) {
        cambiarPassword2((prevState) => {
          return { ...prevState, valido: 'false' }
        })
      } else {
        cambiarPassword2((prevState) => {
          return { ...prevState, valido: 'true' }
        })
      }
    }
  }

  const onSubmit = async e => {
    e.preventDefault()
    if (
      usuario.valido === 'true' &&
      nombre.valido === 'true' &&
      apellido.valido === 'true' &&
      password.valido === 'true' &&
      password2.valido === 'true' &&
      correo.valido === 'true' &&
      telefono.valido === 'true'
    ) {
      cambiarFormularioValido(true)

      const response = await axios.post('http://localhost:8000/users/singup/', {
        email: correo.campo,
        username: usuario.campo,
        phone_number: telefono.campo,
        password: password.campo,
        password_confirmation: password2.campo,
        first_name: nombre.campo,
        last_name: apellido.campo
      })
      console.log(response)
      // this.props.history.push('/verifyToken')
      cambiarUsuario({ campo: '', valido: null })
      cambiarNombre({ campo: '', valido: null })
      cambiarApellido({ campo: '', valido: null })
      cambiarPassword({ campo: '', valido: null })
      cambiarPassword2({ campo: '', valido: null })
      cambiarCorreo({ campo: '', valido: null })
      cambiarTelefono({ campo: '', valido: null })
    } else {
      cambiarFormularioValido(false)
    }
    /*
    this.setState({ loading: true, error: null })
    console.log(this.state.form);

    try {
      const response = await axios.post('http://localhost:8000/users/singup/', this.state.form)
      console.log(response)
      this.setState({ loading: false })
      this.props.history.push('/verifyToken')
    } catch (error) {
      this.setState({ loading: false, error: error })
    }
    */
  }
  /*
  render () {
    if (this.state.loading === true ){
        return <Spinner />
      }

      if (this.state.error){
        return <Fatal mensaje={this.props.error}/>
      } */
  return (
    <main>
      <Formulario action='' onSubmit={onSubmit}>
        <Input
          estado={usuario}
          cambiarEstado={cambiarUsuario}
          type='text'
          label='Usuario'
          placeholder='usuario'
          name='username'
          leyendaError='El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo'
          expresionRegular={expresiones.usuario}
        />
        <Input
          estado={nombre}
          cambiarEstado={cambiarNombre}
          type='text'
          label='Nombre'
          placeholder='Nombre'
          name='first_name'
          leyendaError='Letras y espacios puede llevar acentos'
          expresionRegular={expresiones.nombre}
        />
        <Input
          estado={apellido}
          cambiarEstado={cambiarApellido}
          type='text'
          label='Apellido'
          placeholder='Apellido'
          name='last_name'
          leyendaError='Letras y espacios puede llevar acentos'
          expresionRegular={expresiones.nombre}
        />
        <Input
          estado={password}
          cambiarEstado={cambiarPassword}
          type='password'
          label='Contraseña'
          placeholder='Contraseña'
          name='password'
          leyendaError='La contraseña debe tener de 4 a 12 digitos'
          expresionRegular={expresiones.password}
        />
        <Input
          estado={password2}
          cambiarEstado={cambiarPassword2}
          type='password'
          label='Confirmar Contraseña'
          placeholder='Confimar Contraseña'
          name='password_confirmation'
          leyendaError='Ambas contraseñas deben ser iguales'
          funcion={validarPassword2}
        />
        <Input
          estado={correo}
          cambiarEstado={cambiarCorreo}
          type='email'
          label='Correo Electronico'
          placeholder='Jhon123@example.com'
          name='email'
          leyendaError='El correo puede contener letras,numeros, puntos, guiones y guiones bajos'
          expresionRegular={expresiones.correo}
        />
        <Input
          estado={telefono}
          cambiarEstado={cambiarTelefono}
          type='text'
          label='Telefono'
          placeholder='8182838485'
          name='phone_number'
          leyendaError='El telefono solo puede contener numeros y el maximo son 14 dígitos.'
          expresionRegular={expresiones.telefono}
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
    <>
      <section className='register'>
        <section className='register__container'>
          <h2>Regístrate</h2>
          <form className='register__container--form' onSubmit={this.handleSubmit}>
            <input
              name='email'
              className='input'
              type='text'
              placeholder='email'
              onChange={this.handleInput}
            />
            <input
              name='username'
              className='input'
              type='text'
              placeholder='username'
              onChange={this.handleInput}
            />
            <input
              name='phone_number'
              className='input'
              type='text'
              placeholder='phone number'
              onChange={this.handleInput}
            />
            <input
              name='password'
              className='input'
              type='password'
              placeholder='password'
              onChange={this.handleInput}
            />
            <input
              name='password_confirmation'
              className='input'
              type='password'
              placeholder='password confirmation'
              onChange={this.handleInput}
            />
            <input
              name='first_name'
              className='input'
              type='text'
              placeholder='first name'
              onChange={this.handleInput}
            />
            <input
              name='last_name'
              className='input'
              type='text'
              placeholder='last name'
              onChange={this.handleInput}
            />
            <button className='button'>Registrarme</button>
          </form>
          <Link to='/login'>
            Iniciar sesión
          </Link>
        </section>
      </section>
    </>
  */
  )
}

export default Register
