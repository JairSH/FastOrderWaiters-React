import React from 'react'
import '../assets/styles/components/Platillos.css'
import Categories from '../components/Categories'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'
import Spinner from './General/Spinner'
import Fatal from './General/Fatal'

class Platillo extends React.Component {
  componentDidMount () {
    //this.props.getPlatillosAction()
  }

  contenido = () => {
    if (this.props.loading){
      return <Spinner />
    }

    if (this.props.error){
      return <Fatal mensaje={this.props.error} />
    }
  }

  render () {
    console.log(this.props.loading)
    console.log(this.props.error)
    return (
      <>
        <Categories title='Platillos'>
          <Carousel>
            {this.props.platillos.map(item =>
              <CarouselItem key={item.id} {...item} category="platillo" />
            )}
          </Carousel>
        </Categories>
      </>
    )
  }
}


export default Platillo