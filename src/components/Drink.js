import React from 'react'
import Carousel from './Carousel'
import Categories from './Categories'
import CarouselItem from './CarouselItem'

class Drink extends React.Component {
  render () {
    return (
      <>
        <Categories title='Bebidas'>
          <Carousel>
            {this.props.bebidas.map(item =>
              <CarouselItem key={item.id} {...item} category="bebida" />
            )}
          </Carousel>
        </Categories>
      </>
    )
  }
}

export default Drink
