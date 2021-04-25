import React from 'react'
import '../../assets/styles/components/Spinner.css'

const Spinner = () => {
  return (
    <div className='center'>
      <div className='lds-ring'><div> </div><div> </div><div> </div><div> </div></div>
    </div>
  )
}

export default Spinner
