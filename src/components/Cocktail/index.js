import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useState } from 'react'
import Axios from 'axios'

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1'

const CocktailInfo = ({ cocktailData }) => {
    console.log(cocktailData)
    var ingredients = Object.entries(cocktailData).filter(
        (key, value) => (/strIngredient/.test(key))
    ).filter(([_, v]) => v != null).map(x => x[1]).join(', ')
    return (
        <div>
            <p>
                {cocktailData.strDrink}
            </p>
            <p>
                Ingredients: {ingredients}
            </p>
            <p>
                Instruction: {cocktailData.strInstructions}
            </p>
        </div>
    )
}

const Cocktail = () => {
    const header_txt = ["C", "o", "c", "k", "t", "a", "i", "l"]
    const [letterClass, setLetterClass] = useState('text-animate')
    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)
    }, [])

    const [cocktailData, setCocktailData] = useState('')
    const getCocktailData = (e) => {
        e.preventDefault()

        var cocktail_name = 'margarita'
        var alco = ''

        Axios.get(`${BASE_URL}/search.php?s=${cocktail_name}`).then(
            (response) => {
                console.log(response.data)
                setCocktailData(response.data.drinks[0])
            }
        )
    }

    return (
        <>
            <div className='container cocktail-page'>
                <div id='cocktail-header'>
                    <AnimatedLetters letterClass={letterClass} strArray={header_txt} idx={15} />
                </div>
                <div className='cocktail-form'>
                    <form onSubmit={getCocktailData}>
                        <ul>
                            <li className='filter'>
                                <input placeholder='Cocktail Name' type='text' name='name' autoComplete="off" required />
                            </li>
                            <li>
                                <input type="radio" id="alco" name="alco-filter" value="Alcoholic" />
                                <label htmlFor="alco">Alcoholic</label>
                                <input type="radio" id="non-alco" name="alco-filter" value="Non-Alcoholic" />
                                <label htmlFor="non-alco">Non-Alcoholic</label>
                                <input type="radio" id="optional" name="alco-filter" value="Optional alcohol" defaultChecked />
                                <label htmlFor="optional">Optional</label>
                            </li>
                            <li>
                                <input type='submit' className='flat-button' value='apply' />
                            </li>
                        </ul>
                    </form>
                </div>
                <div className='cocktail-data'>
                    <CocktailInfo cocktailData={cocktailData} />
                </div>
            </div>
        </>
    )
}

export default Cocktail