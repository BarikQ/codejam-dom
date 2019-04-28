/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
(function main() {
    const colChoose = document.querySelector('#color-picker');
    const prevCol = document.querySelector('#prev-circle');
    const chooseBar = document.querySelector('#color-bar');
    const whiteCol = document.querySelector('#white');
    const blackCol = document.querySelector('#black');
    const greenCol = document.querySelector('#green');
    const redCol = document.querySelector('#red-circle');
    const blueCol = document.querySelector('#blue-circle');
    const magentaCol = document.querySelector('#magenta');
    const currentColor = document.querySelector('#current-circle');
    const drawArea = document.querySelector('#draw-block');
    const colorElements = [];
    const bucket = document.querySelector('#bucket');
    const transform = document.querySelector('#transform');
    const move = document.querySelector('#move');
    const elementBlock = document.querySelectorAll('#element');

    function getCoords(elem) {
        const box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    function changeElementPosition(e) {
        const obj = this;
        const coords = getCoords(obj);
        const shiftX = e.pageX - coords.left;
        const shiftY = e.pageY - coords.top;
        const areaCoords = getCoords(drawArea);
        const elementCoords = {
            top: coords.top - areaCoords.top,
            left: coords.left - areaCoords.left
        };
        const cursorCoords = {};
        obj.className = 'element-active';

        function moveAt(e) {
            cursorCoords.left = e.pageX - areaCoords.left;
            cursorCoords.top = e.pageY - areaCoords.top;
            obj.style.left = `${cursorCoords.left -
                shiftX -
                elementCoords.left}px`;
            obj.style.top = `${cursorCoords.top -
                shiftY -
                elementCoords.top}px`;
        }

        drawArea.onmousemove = function abc(e) {
            moveAt(e);
        };

        moveAt(e);

        obj.onmouseup = function abcabc() {
            obj.className = 'element';
            obj.style.position = 'relative';
            drawArea.onmousemove = null;
            obj.onmouseup = null;
        };
    }

    function changeElementForm() {
        if (this.style.borderRadius === '0%') {
            this.style.borderRadius = '50%';
            return 0;
        }
        this.style.borderRadius = '0%';
        return 0;
    }

    function changeBackgroundColor() {
        this.style.background = window.getComputedStyle(
            currentColor
        ).background;
    }

    function changeCurrentColor() {
        if (currentColor.style.background === this.style.background) return 0;
        if (this === prevCol) {
            const swap = prevCol.style.background;
            prevCol.style.background = currentColor.style.background;
            currentColor.style.background = swap;
            return 0;
        }
        prevCol.style.background = currentColor.style.background;
        currentColor.style.background = this.style.background;
        return 0;
    }

    function openBar() {
        if (chooseBar.style.display === 'flex') {
            chooseBar.style.display = 'none';
        } else chooseBar.style.display = 'flex';
    }

    function setupColors() {
        currentColor.style.background = window.getComputedStyle(
            currentColor
        ).background;
        whiteCol.style.background = window.getComputedStyle(
            whiteCol
        ).background;
        blueCol.style.background = window.getComputedStyle(blueCol).background;
        blackCol.style.background = window.getComputedStyle(
            blackCol
        ).background;
        greenCol.style.background = window.getComputedStyle(
            greenCol
        ).background;
        magentaCol.style.background = window.getComputedStyle(
            magentaCol
        ).background;
        prevCol.style.background = window.getComputedStyle(prevCol).background;
        redCol.style.background = window.getComputedStyle(redCol).background;
    }

    function setupColorElements() {
        colorElements.push(
            whiteCol,
            blueCol,
            redCol,
            blackCol,
            greenCol,
            magentaCol,
            prevCol
        );
    }

    function changeElementColor() {
        elementBlock.forEach(elem => {
            elem.removeEventListener('mousedown', changeElementPosition);
            elem.removeEventListener('click', changeElementForm);
            elem.addEventListener('click', changeBackgroundColor);
        });
    }

    function transformElement() {
        elementBlock.forEach(elem => {
            elem.removeEventListener('mousedown', changeElementPosition);
            elem.removeEventListener('click', changeBackgroundColor);
            elem.addEventListener('click', changeElementForm);
        });
    }

    function moveElement() {
        elementBlock.forEach(elem => {
            elem.removeEventListener('click', changeBackgroundColor);
            elem.removeEventListener('click', changeElementForm);
            elem.addEventListener('mousedown', changeElementPosition);
        });
    }

    setupColors();
    setupColorElements();

    colChoose.addEventListener('click', openBar);

    bucket.addEventListener('click', changeElementColor);

    transform.addEventListener('click', transformElement);

    move.addEventListener('click', moveElement);

    colorElements.forEach(elem => {
        elem.addEventListener('click', changeCurrentColor);
    });
})();
