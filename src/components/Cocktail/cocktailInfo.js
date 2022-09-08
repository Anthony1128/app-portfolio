const CocktailInfo = ({ cocktailData }) => {
    var ingredients = Object.entries(cocktailData).filter(
        (key, value) => (/strIngredient/.test(key))
    ).filter(([_, v]) => v != null).map(x => x[1]).join(', ')

    return (
        <div>
            <p className='error-message'>{cocktailData.error_message}</p>
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

export default CocktailInfo