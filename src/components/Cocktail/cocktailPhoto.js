const CocktailPhoto = ({ cocktailPhoto }) => {

    if (cocktailPhoto === "") return;

    return (
        <img className="cocktail-img" src={cocktailPhoto} alt="CocktailImg" />
    )
}

export default CocktailPhoto