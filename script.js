(function () {
    let colChoose = document.getElementById('color-picker'),
        prevCol = document.querySelector('#prev-circle');
        chooseBar = document.getElementById('color-bar'),
        whiteCol = document.getElementById('white'),
        blackCol = document.getElementById('black'),
        greenCol = document.getElementById('green'),
        redCol = document.querySelector('#red-circle'),
        blueCol = document.querySelector('#blue-circle'),
        magentaCol = document.getElementById('magenta'),
        colorItem = document.querySelectorAll('.color-item'),
        currentColor = document.querySelector('#current-circle'),
        drawArea = document.querySelector('#draw-block'),
        colorElements = [];

    let bucket = document.querySelector('#bucket'),
        transform = document.querySelector('#transform'),
        move = document.querySelector('#move');
    let elementBlock = document.querySelectorAll('#element');

    //////////////////////////////////////////////////////////////////////////////////////////////

    setupColors();
    setupColorElements();

    //////////////////////////////////////////////////////////////////////////////////////////////  

    colChoose.addEventListener('click', openBar);

    bucket.addEventListener('click', changeElementColor);

    transform.addEventListener('click', transformElement);

    move.addEventListener('click', moveElement);

    //////////////////////////////////////////////////////////////////////////////////////////////

    colorElements.forEach(function (elem, i) {
        elem.addEventListener('click', changeCurrentColor);
    });

    function changeElementColor() {
        elementBlock.forEach(function (elem, i) {
            elem.removeEventListener('mousedown', changeElementPosition);
            elem.removeEventListener('click', changeElementForm);
            elem.addEventListener('click', changeBackgroundColor);
        });
    }

    function transformElement() {
        elementBlock.forEach(function (elem, i) {
            elem.removeEventListener('mousedown', changeElementPosition);
            elem.removeEventListener('click', changeBackgroundColor);
            elem.addEventListener('click', changeElementForm);
        });
    }

    function moveElement() {
        elementBlock.forEach(function (elem, i) {
            elem.removeEventListener('click', changeBackgroundColor);
            elem.removeEventListener('click', changeElementForm);
            elem.addEventListener('mousedown', changeElementPosition);       
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

    function changeElementForm() {
        if (this.style.borderRadius === '50%') {
            this.style.borderRadius = '0%';
            return 0;
        }
        this.style.borderRadius = '50%';
    }

    function changeElementPosition() {

    this.style.position = 'absolute';
    this.style.zIndex = '100';
    this.style.border = '5px solid red';
    this.style.boxShadow = '0px 0px 10px 1px red';
    let elementAreaCoords = getCoords(this),                    // координаты элемента относительно window
        drawCoords = getCoords(drawArea)                        // координаты draw-block
        elementCoords = {                                       // координаты элемента относительно draw-block
            top: elementAreaCoords.top - drawCoords.top, 
            left: elementAreaCoords.left - drawCoords.left
        };
    this.style.left = elementCoords.left + 'px';
    this.style.top = elementCoords.top + 'px';

    let obj = this;
    
    drawArea.addEventListener('mousemove', (e) =>{
        moveAt(e);
    });

    function moveAt(e){
        obj.style.left = e.pageX - drawCoords.left -  elementCoords.left - obj.offsetWidth / 2 + 'px';
        obj.style.top = e.pageY - drawCoords.top -  elementCoords.top - obj.offsetWidth / 2 + 'px';
        console.log(obj.style.left, obj.style.top);
    }


    function getCoords(elem) { 
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    this.ondragstart = function() {
        return false;
    };

////////////////////////////// MOUSE UP 
        this.addEventListener('mouseup', setNewPosition); 

        function setNewPosition(){
            drawArea.removeEventListener('mousemove', (e) =>{
                moveAt(e);
            });
            this.style.border = '5px solid lightgreen';
            this.style.boxShadow = '0px 0px 18px 3px lightgreen';
        }
    }

    function changeBackgroundColor() {
        this.style.background = window.getComputedStyle(currentColor).background;
    }

    function changeCurrentColor() {
        if (currentColor.style.background === this.style.background) return 0;
        if (this === prevCol) {
            let swap;
            swap = prevCol.style.background;
            prevCol.style.background = currentColor.style.background;
            currentColor.style.background = swap;
            console.log(window.getComputedStyle(currentColor).background);
            return 0;
        }
        prevCol.style.background = currentColor.style.background;
        currentColor.style.background = this.style.background;
        console.log(window.getComputedStyle(currentColor).background);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

    function openBar() {
        if (chooseBar.style.display === "flex") chooseBar.style.display = "none";
        else chooseBar.style.display = "flex";
    }

    function setupColors() {
        currentColor.style.background = window.getComputedStyle(currentColor).background;
        whiteCol.style.background = window.getComputedStyle(whiteCol).background;
        blueCol.style.background = window.getComputedStyle(blueCol).background;
        blackCol.style.background = window.getComputedStyle(blackCol).background;
        greenCol.style.background = window.getComputedStyle(greenCol).background;
        magentaCol.style.background = window.getComputedStyle(magentaCol).background;
        prevCol.style.background = window.getComputedStyle(prevCol).background;
        redCol.style.background = window.getComputedStyle(redCol).background;
    }

    function setupColorElements() {
        colorElements.push(whiteCol, blueCol, redCol, blackCol, greenCol, magentaCol, prevCol);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

})();
