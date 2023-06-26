'use client'

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'

const ShareButtons: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className='flex'>
      <FacebookShareButton url={url} title='Test title'>
        <FacebookIcon size={20} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={url} title='Test title'>
        <TwitterIcon size={20} round={true} />
      </TwitterShareButton>
      <WhatsappShareButton url={url} title='Test title'>
        <WhatsappIcon size={20} round={true} />
      </WhatsappShareButton>
    </div>
  )
}
export default ShareButtons
