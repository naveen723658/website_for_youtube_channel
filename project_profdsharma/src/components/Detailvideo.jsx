import React from 'react'
const Detailvideo = () =>{
    return(
        <>
        <div className="container" id='detail'>
        <div className="main-video-container">
          <video src="images/vid-1.mp4" loop controls className="main-video" />
          <h3 className="main-vid-title">house flood animation</h3>
        </div>
        <div className="video-list-container">
          <div className="list active">
            <video src="images/vid-1.mp4" className="list-video" />
            <h3 className="list-title">house flood animation</h3>
          </div>
          <div className="list">
            <video src="images/vid-2.mp4" className="list-video" />
            <h3 className="list-title">zoombie walking animation</h3>
          </div>
          <div className="list">
            <video src="images/vid-3.mp4" className="list-video" />
            <h3 className="list-title">emoji falling animation</h3>
          </div>
          <div className="list">
            <video src="images/vid-4.mp4" className="list-video" />
            <h3 className="list-title">3D town animation</h3>
          </div>
          <div className="list">
            <video src="images/vid-5.mp4" className="list-video" />
            <h3 className="list-title">man chasing carrot animation</h3>
          </div>
          <div className="list">
            <video src="images/vid-6.mp4" className="list-video" />
            <h3 className="list-title">door hinge animation</h3>
          </div>
          <div className="list">
            <video src="images/vid-7.mp4" className="list-video" />
            <h3 className="list-title">poeple walking in town animation</h3>
          </div>
          <div className="list">
            <video src="images/vid-8.mp4" className="list-video" />
            <h3 className="list-title">knight chasing virus animation</h3>
          </div>
          <div className="list">
            <video src="images/vid-9.mp4" className="list-video" />
            <h3 className="list-title">3D helicopter animation</h3>
          </div>
        </div>
      </div>
        </>
    )
}
export default Detailvideo;