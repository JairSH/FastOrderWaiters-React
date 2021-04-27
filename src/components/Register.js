import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../assets/styles/components/Register.css'
import Spinner from './General/Spinner'
import Fatal from './General/Fatal'

class Register extends React.Component {
  state = {
      loading: false,
      error: null,
      form: {
          email: '',
          username: '',
          phone_number: '',
          password: '',
          password_confirmation: '',
          first_name: '',
          last_name: ''
      },
  }

  handleInput = e => {
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, error: null })
    console.log(this.state.form);
    
    axios.post('http://localhost:8000/users/singup/', {
      form: this.state.form
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }
  render () {
    if (this.state.loading === true ){
        return <Spinner />
      }
      
      if (this.state.error){
        return <Fatal mensaje={this.props.error}/>
      }
      return (
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
      )

  }
}

export default Register
