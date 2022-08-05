import './index.scss';
import AnimatedLetters from "../AnimatedLetters";
import { useEffect, useState } from "react";

const PixelDraw = () => {

    const pyramid_txt = ["P", "I", "X", "E", "L", " ", "D", "R", "A", "W"]
    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        // todo undo 
        // todo save - LocalStorage, Save and Load drawing. JSON.stringify and JSON.parse
        var canvas = document.getElementById("main_canvas");
        var context = canvas.getContext("2d");

        var color_selector_obj = document.getElementById("color_selector");
        var reset_button_obj = document.getElementById("reset");
        var save_button_obj = document.getElementById("save");
        const savedImg = document.getElementById('savedImg');

        var window_width = window.innerWidth;
        var window_height = window.innerHeight;

        var canvas_step = 30;
        var canvas_width = Math.floor(window_width * 0.7 / canvas_step) * canvas_step;
        var canvas_height = Math.floor(window_height * 0.7 / canvas_step) * canvas_step;

        main()

        function main() {
            canvas.width = canvas_width;
            canvas.height = canvas_height;
            reset_canvas();
            canvas.addEventListener("click", change_color, false);
            reset_button_obj.addEventListener("click", reset_canvas, false);
            save_button_obj.addEventListener("click", saveImg, false);
        }

        function Cell(row, column) {
            this.row = row;
            this.column = column;
        }

        function change_color(pos) {
            var cell = getCursorPosition(pos);
            var color = color_selector_obj.value;
            context.beginPath();
            context.rect(cell.column * canvas_step, cell.row * canvas_step, canvas_step, canvas_step);
            context.fillStyle = color;
            context.fill();
        };

        function getCursorPosition(pos) {
            var x;
            var y;

            if (pos.pageX != undefined && pos.pageY != undefined) {
                x = pos.pageX;
                y = pos.pageY;
            }
            else {
                x = pos.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                y = pos.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            x -= canvas.offsetLeft;
            y -= canvas.offsetTop;
            y -= document.getElementsByClassName('container pixeldraw-page')[0].offsetTop;
            var cell = new Cell(Math.floor(y / canvas_step), Math.floor(x / canvas_step));
            return cell;
        };

        function reset_canvas() {
            canvas.width = canvas.width;
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);

            for (var x = 0; x < canvas_width; x += canvas_step) {
                context.moveTo(x, 0);
                context.lineTo(x, canvas_height);
            }

            for (var y = 0; y < canvas_height; y += canvas_step) {
                context.moveTo(0, y);
                context.lineTo(canvas_width, y);
            }

            context.strokeStyle = "Black";
            context.stroke();
        };

        function saveImg() {
            console.log("hello")
            const data = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            const link = document.createElement("a");
            link.href = data;
            link.setAttribute("download", "masterpiece.png");
            link.innerHTML = `<img src="${data}" alt="masterpiece" />`;
            savedImg.insertBefore(link, savedImg.firstChild);
            link.click();
            savedImg.removeChild(link);
        };
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)
    }, [])

    return <>
        <div className='container pixeldraw-page'>
            <table className='header'>
                <tbody>
                    <tr>
                        <td>
                            <p><AnimatedLetters letterClass={letterClass} strArray={pyramid_txt} idx={15} /></p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='pixel-canvas'>
                <canvas id="main_canvas">
                    Your browser does not support HTML5 Canvas.
                </canvas>
            </div>
            <table className='parameters'>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="color_selector">Select color:</label>
                            <input type="color" id="color_selector" name="color_selector" defaultValue="#000000" />
                        </td>
                        <td>
                            <button id="reset">
                                Reset
                            </button>
                        </td>
                        <td>
                            <button id="save">
                                Save
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="savedImg"></div>
        </div>
    </>
}

export default PixelDraw