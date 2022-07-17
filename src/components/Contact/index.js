import Loader from 'react-loaders'
import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

const Contact = () => {
    const contact_txt = ['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']

    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)
    }, [])

    const sendEmail = (e) => {
        e.preventDefault()
        alert("Email server is under development. Comming soon!")
    }

    return (
        <>
            <div className='container contact-page'>
                <div className='text-zone'>
                    <h1>
                        <AnimatedLetters letterClass={letterClass} strArray={contact_txt} idx={15} />
                    </h1>
                    <p>TODO: add text here</p>
                    <div className='contact-form'>
                        <form onSubmit={sendEmail}>
                            <ul>
                                <li className='half'>
                                    <input placeholder='Name' type='text' name='name' required />
                                </li>
                                <li className='half'>
                                    <input placeholder='Email' type='email' name='email' required />
                                </li>
                                <li>
                                    <input placeholder='Subject' type='text' name='subject' required />
                                </li>
                                <li>
                                    <textarea placeholder='Message' name='message' required />
                                </li>
                                <li>
                                    <input type='submit' className='flat-button' value='Send' />
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
                <div className='info-map'>
                    Anthony Green
                    <br />
                    Saint Petersburg
                    <br />
                    <span>antonwowis@yandex.ru</span>
                </div>
                <div className='map-wrap'>
                    <MapContainer center={[59.97385007784345, 30.269900798664953]} zoom={13} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[59.97385007784345, 30.269900798664953]}>
                            <Popup>
                                Anthony Green's palace &#129409;<br /> Make an appointment before visiting!
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
            <Loader type='pacman' />
        </>
    )
}

export default Contact