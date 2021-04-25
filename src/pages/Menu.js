import React from 'react'
import Categories from '../components/Categories'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'
import Platillos from '../components/Platillo'
import Drink from '../components/Drink'
import Dessert from '../components/Dessert'
import Order from '../components/Order'

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
        <Order/>
        
        <Platillos/>

        <Drink/>

        <Dessert/>
      </>
    )
  }
}

export default Menu
