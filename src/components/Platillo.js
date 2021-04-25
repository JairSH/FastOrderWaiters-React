import React from 'react'
import '../assets/styles/components/Platillos.css'
import Categories from '../components/Categories'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'
import Spinner from '../components/General/Spinner'
import Fatal from '../components/General/Fatal'

class Platillos extends React.Component {
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


export default Platillos