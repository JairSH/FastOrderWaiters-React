import React from 'react'
import axios from 'axios'
import Carousel from './Carousel'
import Categories from './Categories'
import CarouselItem from './CarouselItem'
import Spinner from './General/Spinner'
import Fatal from './General/Fatal'

class Drink extends React.Component {
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
      const response = await axios.get('http://localhost:8000/bebidas/')
      this.setState({ loading: false, data: response.data})
    } catch (error) {
      this.setState({ loading: false, error: error })
    }
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
        <Categories title='Bebidas'>
          <Carousel>
            {this.state.data.results.map(item =>
              <CarouselItem key={item.id} {...item} category="bebida" />
            )}
          </Carousel>
        </Categories>
      </>
    )
  }
}

export default Drink
