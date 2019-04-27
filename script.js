(function () {
    let colChoose = document.querySelector('#color-picker'),
        prevCol = document.querySelector('#prev-circle');
        chooseBar = document.querySelector('#color-bar'),
        whiteCol = document.querySelector('#white'),
        blackCol = document.querySelector('#black'),
        greenCol = document.querySelector('#green'),
        redCol = document.querySelector('#red-circle'),
        blueCol = document.querySelector('#blue-circle'),
        magentaCol = document.querySelector('#magenta'),
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

    colorElements.forEach(function (elem, i) {
        elem.addEventListener('click', changeCurrentColor);
    });

    //////////////////////////////////////////////////////////////////////////////////////////////

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

    function changeElementPosition(e) {    
        let obj = this;
        obj.className = "element-active";
        
        let coords = getCoords(obj);
        let shiftX = e.pageX - coords.left + obj.style.left;
        let shiftY = e.pageY - coords.top + obj.style.top;
        let areaCoords = getCoords(drawArea);
        let elementCoords = {
            top: coords.top - areaCoords.top,
            left: coords.left - areaCoords.left
        };
        console.log(obj.style.left, obj.style.top); 
        
        moveAt(e);

        function moveAt(e){
            obj.style.left = e.pageX - coords.left - shiftX  + 'px';
            obj.style.top = e.pageY - coords.top - shiftY + 'px';
            console.log(obj.style.left, obj.style.top);
            console.log(shiftX, shiftY);                                // позиция курсора внутри элемента
            console.log(coords.left, coords.top);                       // начальная позиция элемента относительно страницы
            console.log(e.pageX, e.pageY);                              // позиция курсора относительно страницы
        }

        drawArea.onmousemove = function(e) {
            moveAt(e);
        };

        obj.onmouseup = function() {
            obj.className = 'element';
            obj.style.position = 'absolute';
            // obj.top = coords.top + 'px';
            // obj.left = coords.left + 'px';
            drawArea.onmousemove = null;
            obj.onmouseup = null;
        };
        
    }

    function getCoords(elem) { 
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    function changeElementForm() {
        if (this.style.borderRadius === '50%') {
            this.style.borderRadius = '0%';
            return 0;
        }
        this.style.borderRadius = '50%';
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
            return 0;
        }
        prevCol.style.background = currentColor.style.background;
        currentColor.style.background = this.style.background;
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
