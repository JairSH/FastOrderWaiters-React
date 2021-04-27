import React from 'react'
import '../assets/styles/components/Platillos.css'
import axios from 'axios'
import Categories from '../components/Categories'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'
import Spinner from './General/Spinner'
import Fatal from './General/Fatal'

class Platillo extends React.Component {
  state = {
    loading: true,
    error: null,
    data:{
      results: []
    },
  }

  componentDidMount () {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading:true, error: null })
    
    try {
      const response = await axios.get('http://localhost:8000/platillos/') 
      this.setState({ loading: false, data: response.data})
    } catch (error) {
      this.setState({ loading: false, error: error })
    }
  }

  render(){
    if (this.state.loading === true){
      return <Spinner />
    }
    
    if (this.state.error){
      return <Fatal mensaje={this.props.error} />
    }
    
    return(
      <>
        <div>
          <h1>Platillos</h1>
          <ul>
            { 
            this.state.data.results.map(item => (
                <li key={item.id}>
                    {item.name}
                </li>
              ))
            }
          </ul>
        </div>
      </>
    )
  }  
}

export default Platillo
