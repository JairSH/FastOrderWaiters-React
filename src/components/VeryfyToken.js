import React from 'react'
import axios from 'axios'
import '../assets/styles/components/Register.css'
import Fatal from './General/Fatal'
import Spinner from './General/Spinner'

class VerifyToken extends React.Component {
  state = {
    loading: false,
    error: null,
    form: {
      token: ''
    }
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
    this.setState({ loading: true, error: null})
    try {
      const response = await axios.post('http://localhost:8000/users/verify/', this.state.form)
      console.log(response)
      this.setState({ loading: false })
      this.props.history.push('/login')
    } catch (error) {
      this.setState({ loading: false, error: error})
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
      <section>
        <form onSubmit={this.handleSubmit}>
          <input
            name='token'
            className='input'
            type='password'
            placeholder='token'
            onChange={this.handleInput}
          />
          <button className='button'>Iniciar sesión</button>
        </form>
      </section>
    )
  }
}

export default VerifyToken
 