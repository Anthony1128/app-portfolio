import './index.scss';
import AnimatedLetters from "../AnimatedLetters";
import { useEffect, useState } from "react";

const Pyramid = () => {

    const pyramid_txt = ["P", "Y", "R", "A", "M", "I", "D"]
    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        var pyramid = document.getElementById('pyramid');
        var brick_obj = document.getElementById("brick");
        var brick_item = brick_obj.value;

        brick_obj.addEventListener("click", function () {
            brick_item = brick_obj.value;
            pyramid.innerHTML = printPyramid(brick_item, height_item);
        });

        var height_obj = document.getElementById("hight");
        var height_item = Number(height_obj.value);
        var height_display = document.getElementById("height_display");
        height_display.textContent = height_item;

        height_obj.addEventListener("click", function () {
            height_item = Number(height_obj.value);
            pyramid.innerHTML = printPyramid(brick_item, height_item);
            height_display.textContent = height_item;
        });

        pyramid.innerHTML = printPyramid(brick_item, height_item);
        function printPyramid(item, height) {
            var res = "";

            for (var i = 2; i <= height + 1; i++) {
                res += `<span class=text-animate-hover>${item}</span>`.repeat(i) + "<br>";
            };

            return res;
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)
    }, [])

    return (
        <>
            <div className='container pyramid-page'>
                <table className='header'>
                    <tbody>
                        <tr>
                            <td>
                                <p><AnimatedLetters letterClass={letterClass} strArray={pyramid_txt} idx={15} /></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className='parameters'>
                    <tbody>
                        <tr>
                            <td>
                                <form action="#" id="brick_form">
                                    <label htmlFor="brick">Brick symbol</label>
                                    <select name="brick_symbol" id="brick">
                                        <option value="#">#</option>
                                        <option value="+">+</option>
                                        <option value="@">@</option>
                                        <option value="X">X</option>
                                    </select>
                                </form>
                            </td>
                            <td>
                                <form action="#">
                                    <label htmlFor="hight">How High ?</label>
                                    <input type="range" id="hight" name="hight_range" min="2" max="20" defaultValue="10" step="1" />
                                    <label id="height_display"></label>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className='pyramid-zone'>
                    <tbody>
                        <tr>
                            <td width="12%"></td>
                            <td>
                                <div id="pyramid"></div>
                            </td>
                            <td width="20%"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Pyramid