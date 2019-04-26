(function() {
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
        colorElements = [];  

    let bucket = document.querySelector('#bucket'),
        transform = document.querySelector('#transform');
    let elementBlock = document.querySelectorAll('#element');
    
    console.log(elementBlock);
    console.log(transform);

    setupColors();
    setupColorElements();
        
    colChoose.addEventListener('click', openBar);
    
    bucket.addEventListener('click', changeBlockColor);  

    transform.addEventListener('click', transformElement);


    colorElements.forEach(function(elem, i){
        elem.addEventListener('click', changeCurrentColor);
    });

    function changeBlockColor(){
        elementBlock.forEach(function(elem, i){
            elem.removeEventListener('click', changeElementForm);
            elem.addEventListener('click', changeBackgroundColor);
        });
    }
    
    function transformElement(){
        elementBlock.forEach(function(elem, i){
            elem.removeEventListener('click', changeBackgroundColor);
            elem.addEventListener('click', changeElementForm);
        });
    }


    function changeElementForm(){
        if(this.style.borderRadius === '50%') {
            this.style.borderRadius = '0%';
            return 0;
        }
        this.style.borderRadius = '50%';
    }



    function changeBackgroundColor(){
        this.style.background = window.getComputedStyle(currentColor).background;
    }

    function changeCurrentColor(){  
        if(currentColor.style.background === this.style.background) return 0;
        if(this === prevCol) {
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

    function openBar(){
        if(chooseBar.style.display === "flex") chooseBar.style.display = "none";
        else chooseBar.style.display = "flex";
    }

    function setupColors(){
        currentColor.style.background = window.getComputedStyle(currentColor).background;
        whiteCol.style.background = window.getComputedStyle(whiteCol).background;
        blueCol.style.background = window.getComputedStyle(blueCol).background;
        blackCol.style.background = window.getComputedStyle(blackCol).background;
        greenCol.style.background = window.getComputedStyle(greenCol).background;
        magentaCol.style.background = window.getComputedStyle(magentaCol).background;
        prevCol.style.background = window.getComputedStyle(prevCol).background;
        redCol.style.background = window.getComputedStyle(redCol).background;
    }

    function setupColorElements(){
        colorElements.push(whiteCol, blueCol, redCol, blackCol, greenCol, magentaCol, prevCol);
    }

})();