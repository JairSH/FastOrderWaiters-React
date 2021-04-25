import React from 'react'
import Categories from '../components/categories'
import Carousel from '../components/carousel'
import CarouselItem from '../components/carouselItems'
import '../assets/styles/App.scss'

class Menu extends React.Component {
  componentDidMount () {
    //
  }

  handleCleanList = () => { 
    //this.props.cleanOrderListAction()
  }

  handleSaveList = () => {
    /*
    {
      "bebida": [2, 1],
      "platillo": [2],
      "postre": [2]
    }
    */

    const myNewList = {}
    for (let i=0; i<this.props.myList.length; i++) {
      const item = this.props.myList[i]
      if (item.category in myNewList) {
        myNewList[item.category].push(item.pk)
      } else {
        myNewList[item.category] = [item.pk]
      }
    }

    this.props.saveOrderListAction(myNewList)
  }

  render () {
    return (
      <>
        {this.props.myList.length > 0 &&
          <Categories title='Mi Orden'>
            <Carousel>
              { this.props.myList.map(item =>
                <CarouselItem key={item.id} {...item} isList />
                )}
              <button onClick={this.handleSaveList} >Guardar</button>
              <button onClick={this.handleCleanList}>Limpiar lista</button>
            </Carousel>
          </Categories>}
        <Categories title='Bebidas'>
          <Carousel>
            {this.props.bebidas.map(item =>
              <CarouselItem key={item.id} {...item} category="bebida" />
            )}
          </Carousel>
        </Categories>
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

export default Menu
