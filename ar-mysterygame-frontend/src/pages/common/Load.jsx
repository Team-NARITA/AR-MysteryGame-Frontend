
import './Load.css'

function Load() {
    return(
        <div className='load-wrapper'>
            <div className='load-box' style={{backgroundColor: '#393E4F'}} id='l1'></div>
            <div className='load-box' style={{backgroundColor: '#192F60'}} id='l2'></div>
            <div className='load-box' style={{backgroundColor: '#5D7EA3'}} id='l3'></div>
            <div className='load-box' style={{backgroundColor: '#3D496B'}} id='l4'></div>
        </div>
    )
}

export default Load;