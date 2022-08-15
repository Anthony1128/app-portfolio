import LogoTitle from "../../assets/images/A.png";
import PyramidScrn from "../../assets/images/pyramid-prtscn.png";
import PixelDrawScrn from "../../assets/images/pixeldraw-prtscn.png";
// import PyramidScrn from "../../assets/images/pyramid-simple.png";
import AnimatedLetters from "../AnimatedLetters";
import { Link } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from "react";
import Loader from "react-loaders";

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = ['n', 't', 'h', 'o', 'n', 'y']
    const jobArray = ['S', 'o', 'f', 't', 'w', 'a', 'r', 'e', '-', 'E', 'n', 'g', 'i', 'n', 'e', 'e', 'r']

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)
    }, [])

    return (
        <>
            <div className="container home-page">
                <div className="text-zone">
                    <h1>
                        <span className={letterClass}>H</span>
                        <span className={`${letterClass} _12`}>i,</span>
                        <br />
                        <span className={`${letterClass} _13`}>I</span>
                        <span className={`${letterClass} _14`}>'m</span>
                        <img src={LogoTitle} alt="developer" />
                        <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15} />
                        <br />
                        <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={21} />
                    </h1>
                    <h2>Python / AWS / Data Engineering</h2>
                    <Link to="/contact" className="flat-button">Contact me</Link>
                </div>
                <div className="grid-container">
                    <div className="grid-item">
                        <Link to="/pyramid"><img src={PyramidScrn} alt="pyramid" /></Link>
                    </div>
                    <div className="grid-item">
                        <Link to="/pixeldraw"><img src={PixelDrawScrn} alt="pixeldraw" /></Link>
                    </div>
                    <div className="grid-item">
                        <Link to="/cocktail"><img src={PixelDrawScrn} alt="cocktail" /></Link>
                    </div>
                    <div className="grid-item"></div>
                    <div className="grid-item"></div>
                    <div className="grid-item"></div>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    )
}

export default Home