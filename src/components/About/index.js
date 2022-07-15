import './index.scss'
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngular, faAws, faDocker, faGitAlt, faLinux, faPython, faReact } from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'

const About = () => {
    const about_txt = ["A", "b", "o", "u", "t", " ", "m", "e", ":"]
    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)
    }, [])

    return (
        <>
            <div className='container about-page'>
                <div className='text-zone'>
                    <h1>
                        <AnimatedLetters letterClass={letterClass} strArray={about_txt} idx={15} />
                    </h1>
                    <p>TODO:</p>
                    <p>paste some text</p>
                    <p>here</p>
                </div>
                <div className='stage-cube-cont'>
                    <div className='cubespinner'>
                        <div className='faceAws'>
                            <FontAwesomeIcon icon={faAws} />
                        </div>
                        <div className='faceDocker'>
                            <FontAwesomeIcon icon={faDocker} />
                        </div>
                        <div className='faceGit'>
                            <FontAwesomeIcon icon={faGitAlt} />
                        </div>
                        <div className='faceLinux'>
                            <FontAwesomeIcon icon={faLinux} />
                        </div>
                        <div className='facePython'>
                            <FontAwesomeIcon icon={faPython} />
                        </div>
                        <div className='faceReact'>
                            <FontAwesomeIcon icon={faReact} />
                        </div>
                    </div>
                </div>
            </div>
            <Loader type='pacman' />
        </>
    )
}

export default About