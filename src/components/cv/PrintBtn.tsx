'use client'

import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PrintBTN: React.FC = () => {
  const print = () => {
    window.print()
    return false
  }
  return (
    <span onClick={print} className='print:hidden float-right'>
      <FontAwesomeIcon icon={faPrint} className='text-3xl cursor-pointer hover:animate-pulse' />
    </span>
  )
}

export default PrintBTN
