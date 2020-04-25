import { message } from 'antd'

const MessageComponent = ({ type, content, duration, isRequestEnabled }) => {
  if(isRequestEnabled && content.length){
    message.open({
      content,
      duration,
      type,
      // onClose: () => { console.log('close') }
    })
  } else {
    message.destroy()
  }

  return null
}
export default MessageComponent
