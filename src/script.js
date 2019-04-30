/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */

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
        let coords = getCoords(obj);
        const shiftX = e.pageX - coords.left;
        const shiftY = e.pageY - coords.top;
        let par = this.parentNode;

        obj.className = 'element-active';
        obj.style.position = 'absolute';

        function moveAt(e) {
            coords = getCoords(obj);
            obj.style.left = `${e.pageX - shiftX}px`;
            obj.style.top = `${e.pageY - shiftY}px`;
        }

        drawArea.onmousemove = e => {
            moveAt(e);
        };

        moveAt(e);

        obj.onmouseup = () => {
            const blockContainer = document.querySelectorAll(".parentElement");
            blockContainer.forEach(item => {
              let x = this.offsetLeft;
              let y = this.offsetTop;
              let x1 = item.offsetLeft;
              let y1 = item.offsetTop;
              if (x > x1 - 142 && x < x1 + 142 &&
              y > y1 - 142 && y < y1 + 142) {
                let parent1 = item;
                if (!parent1.firstChild) {
                  let child0 = this;
                  this.style.left = 0;
                  this.style.top = 0;
                  parent1.insertBefore(child0, null);
                }
                else {
                  let child1 = parent1.querySelector(".element");
                  let parent0 = par;
                  let child0 = this;
                  this.style.left = 0;
                  this.style.top = 0;
                  parent1.appendChild(child0);
                  parent0.appendChild(child1);
                }
              }
            });
            obj.style.left = null;
            obj.style.top = null;
            obj.className = 'element';
            drawArea.onmousemove = null;
            obj.onmouseup = null;
        };

        this.ondragstart = () => {
            return false;
        };
    }

    function changeElementForm() {
        if (getComputedStyle(this).borderRadius === '0px') {
            this.style.borderRadius = '50%';
            return 0;
        }
        this.style.borderRadius = '0px';
        return 0;
    }

    function changeBackgroundColor() {
        this.style.background = window.getComputedStyle(currentColor).background;
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
      colChoose.className = "active";
      move.classList.remove("active");
      transform.classList.remove("active");
      bucket.classList.remove("active");
        if (chooseBar.style.display === 'flex') {
            chooseBar.style.display = 'none';
        } else chooseBar.style.display = 'flex';
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
      bucket.className = "active";
      move.classList.remove("active");
      transform.classList.remove("active");
      colChoose.classList.remove("active");
        elementBlock.forEach(elem => {
            elem.removeEventListener('mousedown', changeElementPosition);
            elem.removeEventListener('click', changeElementForm);
            elem.addEventListener('click', changeBackgroundColor);
        });
    }

    function transformElement() {
      transform.className = "active";
      bucket.classList.remove("active");
      move.classList.remove("active");
      colChoose.classList.remove("active");
        elementBlock.forEach(elem => {
            elem.removeEventListener('mousedown', changeElementPosition);
            elem.removeEventListener('click', changeBackgroundColor);
            elem.addEventListener('click', changeElementForm);
        });
    }

    function moveElement() {
      move.className = "active";
      bucket.classList.remove("active");
      transform.classList.remove("active");
      colChoose.classList.remove("active");
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

    document.addEventListener('keypress', () => {
      if(event.code === 'KeyP'){
        changeElementColor();
      }
      else if(event.code === 'KeyC'){
        openBar();
      }
      else if(event.code === 'KeyM'){
        moveElement();
      }
      else if(event.code === 'KeyT'){
        transformElement();
      }
    });
})();
