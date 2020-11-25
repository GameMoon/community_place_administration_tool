import React from 'react'


const LiveImage = ({ component: Component, ...rest }) => {

  const isLoggedIn = true//sessionStorage.getItem("token")
  
  return (
    <img src="https://picsum.photos/640/480" alt="Webcam not available"/>
    //   <img src="http://pinacolada.legokor.hu/kamera/images/current.jpg"/>
  )
}

export default LiveImage