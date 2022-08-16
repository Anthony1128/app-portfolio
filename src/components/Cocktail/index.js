import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useState } from 'react'
import Axios from 'axios'

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1'

const applyFilters = (data, filters) => {
    data = data.filter((obj) => (obj['strAlcoholic'] == filters))
    return data[0]
}

const CocktailInfo = ({ cocktailData }) => {
    var ingredients = Object.entries(cocktailData).filter(
        (key, value) => (/strIngredient/.test(key))
    ).filter(([_, v]) => v != null).map(x => x[1]).join(', ')

    return (
        <div>
            <p>
                Name: {cocktailData.strDrink}
            </p>
            <p>
                Alco: {cocktailData.strAlcoholic}
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
        var name_obj = document.getElementById("name");
        var cocktail_name = name_obj.value;
        var alco_obj = document.querySelector("input[type='radio'][name=alco-filter]:checked");
        var alco_value = alco_obj.value;

        Axios.get(`${BASE_URL}/search.php?s=${cocktail_name}`).then(
            (response) => {
                var response_data = applyFilters(response.data.drinks, alco_value)
                setCocktailData(response_data)
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
                                <input placeholder='Cocktail Name' id='name' type='text' name='name' autoComplete="off" required />
                            </li>
                            <li>
                                <input type="radio" id="alco" name="alco-filter" value="Alcoholic" defaultChecked />
                                <label htmlFor="alco">Alcoholic</label>
                                <input type="radio" id="non-alco" name="alco-filter" value="Non alcoholic" />
                                <label htmlFor="non-alco">Non-Alcoholic</label>
                                <input type="radio" id="optional" name="alco-filter" value="Optional alcohol" />
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