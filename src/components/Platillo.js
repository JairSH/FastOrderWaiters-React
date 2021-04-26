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
      results:[]
    }
  }


  componentDidMount () {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading:true, error: null })
    
    try {
      const response = await axios.get('http://localhost:8000/platillos')
      const data = await response.json()
      this.setState({ loading: false, data: data.results})
    } catch (error) {
      this.setState({ loading: false, error: error })
    }
  }
  
  render () {
    if (this.state.loading){
      return <Spinner />
    }
    
    if (this.state.error){
      return <Fatal />
    }

    return (
      <>
        <Categories title='Platillos'>
          <Carousel>
            {this.state.data.results.map(item =>
              <CarouselItem key={item.id} {...item} category="platillo" />
            )}
          </Carousel>
        </Categories>
      </>
    )
  }
}


export default Platillo