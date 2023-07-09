'use client'

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import { faFacebook, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ShareButtons: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className='flex text-3xl'>
      <FacebookShareButton url={url} title='Test title' className='mx-2' >
      <FontAwesomeIcon icon={faFacebook} />
      </FacebookShareButton>
      <TwitterShareButton url={url} title='Test title' className='mx-2' >
      <FontAwesomeIcon icon={faTwitter} />
      </TwitterShareButton>
      <WhatsappShareButton url={url} title='Test title' className='mx-2' >
      <FontAwesomeIcon icon={faWhatsapp} />
      </WhatsappShareButton>
    </div>
  )
}
export default ShareButtons
