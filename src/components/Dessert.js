import React from 'react'
import Carousel from './Carousel'
import Categories from './Categories'
import CarouselItem from './CarouselItem'

class Dessert extends React.Component {
  render () {
    return (
      <>
        <Categories title='Postres'>
          <Carousel>
            {this.props.postres.map(item =>
              <CarouselItem key={item.id} {...item} category="postre" />
            )}
          </Carousel>
        </Categories>
      </>
    )
  }
}

export default Dessert
