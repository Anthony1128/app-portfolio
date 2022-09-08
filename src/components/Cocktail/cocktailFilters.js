import { useState } from 'react'

const AlcoFilters = ({ alco_filters }) => {

    const [option, setOption] = useState(alco_filters[0])

    const onOptionChange = e => {
        setOption(e.target.value)
    }

    return (
        <li id="alco-filter" className='filters' >
            {alco_filters.map((char, i) => (
                <label key={`${char} _label`} htmlFor={char}>{char}
                    <input
                        className='alco-radio'
                        type="radio"
                        key={char}
                        id={char}
                        name="alco-filter"
                        value={char}
                        checked={option === char}
                        onChange={onOptionChange} />
                </label>
            ))}
        </li>
    )
}
// {/* <>
// <span type="radio" key={char + i} id={char} name={char} value={char} defaultChecked />
// <span key={`${char + i} _label`} htmlFor={char}>{char}</span>
// </> */}
export default AlcoFilters
