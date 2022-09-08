import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import CocktailInfo from './cocktailInfo'
import AlcoFilters from './cocktailFilters'
import { useEffect, useState } from 'react'
import Axios from 'axios'

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1'

const applyFilters = (data, filters) => {
    let data_filtered = data
    let empty_filter = ""

    for (let i in filters) {
        let filter = filters[i]
        data_filtered = data_filtered.filter((obj) => (filter["filter_value"].includes(obj[filter["filter_key"]])))
        if (data_filtered.length === 0) {
            empty_filter = filter["filter_name"]
        }
    }

    data_filtered = data_filtered[0] || { "error_message": `Change filter - ${empty_filter}` }
    return data_filtered
}

function showResults(div_el, terms) {
    div_el.innerHTML = '';
    let list = '';

    for (var i = 0; i < terms.length; i++) {
        list += '<option value="' + terms[i] + '" />';
    }

    div_el.innerHTML = '<datalist id="suggestions">' + list + '</datalist>';
}

const checkList = (e) => {
    Axios.get(`${BASE_URL}/search.php?s=${e.target.value}`).then(
        (response) => {
            const submit_button = document.getElementById("form-button")
            const div_el = document.getElementById("autocomplete-list");

            if (!response.data.drinks) {
                submit_button.disabled = true;
                div_el.innerHTML = "No such cocktail"
            } else if (e.target.value === "") {
                div_el.innerHTML = ""
            } else {
                var cocktails = response.data.drinks.map(x => x["strDrink"]).slice(0, 3)
                showResults(div_el, cocktails)
                submit_button.disabled = false
            }
        }
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

    const [alco_filters, setAlcoFilters] = useState([])
    useEffect(() => {
        setTimeout(() => {
            Axios.get(`${BASE_URL}/list.php?a=list`).then(
                (response) => {
                    var values = response.data.drinks.map((x) => x["strAlcoholic"])
                    setAlcoFilters(values)
                }
            )
        }, 0)
    }, [])

    const [cocktailData, setCocktailData] = useState('')
    const getCocktailData = (e) => {
        e.preventDefault()
        var filters = []
        var name_obj = document.getElementById("name");
        var cocktail_name = name_obj.value;
        var alco_obj = document.querySelector("input[type='radio'][name=alco-filter]:checked") || { "value": "" };
        var alco_value = alco_obj.value;

        filters.push(
            {
                "filter_name": "alcohol",
                "filter_value": alco_value,
                "filter_key": "strAlcoholic"
            }
        )

        Axios.get(`${BASE_URL}/search.php?s=${cocktail_name}`).then(
            (response) => {
                var response_data = applyFilters(response.data.drinks, filters)
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
                            <li className='filters'>
                                <input list="suggestions" onChange={checkList} placeholder='Cocktail Name' id='name' type='text' name='name' autoComplete='off' />
                                <div id="autocomplete-list" className='error-message'></div>
                            </li>
                            <AlcoFilters alco_filters={alco_filters} />
                            <li className='filters'>
                                <input id='form-button' type='submit' className='flat-button' value='apply' />
                            </li>
                        </ul>
                    </form>
                    <input onClick={() => { console.log("RANDOM") }} id='random-button' type='submit' className='flat-button' value='random' />
                </div>
                <div className='cocktail-data'>
                    <CocktailInfo cocktailData={cocktailData} />
                </div>
            </div>
        </>
    )
}

export default Cocktail