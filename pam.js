const leftMouseButton = 0;

function Pixel() {
    const pixelSize = '8px';

    const pixel = document.createElement('div');
    pixel.style.width = pixelSize;
    pixel.style.height = pixelSize;
    pixel.style.backgroundColor = palette.currentColor;
    pixel.style.display = 'inline-block';
    pixel.style.border = '1px solid #e5e5e5';
    pixel.className = 'Pixel';

    pixel.paint = function(color) {
        this.style.backgroundColor = color;
        this.style.borderColor = color;
    }

    pixel.sibling = function(dx, dy) {
        const line = this.parentNode.parentNode.childNodes[this.yIndex + dy];
        if (line != null) {
            return line.childNodes[this.xIndex + dx];
        }
        return null;
    }

    return pixel;
}

function Canvas(width, height, element) {
    const canvas = { width: width, height: height, element: element };

    canvas.element.innerHTML = '';
    canvas.element.style.textAlign = 'center';

    canvas.isPenDown = false;

    for (let y = 0; y < height; ++y) {
        const row = document.createElement('div');
        row.style.lineHeight = '0';

        for (let x = 0; x < width; ++x) {
            const pixel = new Pixel();
            pixel.xIndex = x;
            pixel.yIndex = y;
            row.appendChild(pixel);
        }
        canvas.element.appendChild(row);
    }

    canvas.element.addEventListener('mousedown', function(ev) {
        if (ev.target.paint != null && ev.button == leftMouseButton) {
            ev.preventDefault();
            canvas.isPenDown = true;
            toolBar.currentTool.paint(ev.target, palette.currentColor);
        }
    });

    canvas.element.addEventListener('mousemove', function(ev) {
        if (canvas.isPenDown && ev.target.paint != null) {
            toolBar.currentTool.paint(ev.target, palette.currentColor);
        }
    });

    canvas.element.addEventListener('mouseup', function(ev) {
        if (canvas.isPenDown && ev.button == leftMouseButton) {
            canvas.isPenDown = false;
        }
    });

    return canvas;
}

function Palette(element) {
    const palette = { element: element };

    element.style.padding = '1em';
    element.style.lineHeight = '0';

    const sampleSize = '56px';

    const colorSample = document.createElement('div');
    colorSample.style.display = 'inline-block';
    colorSample.style.width = sampleSize;
    colorSample.style.height = sampleSize;
    colorSample.style.backgroundColor = '#ffffff';
    colorSample.style.float = 'left';
    colorSample.style.marginRight = '1em';
    element.appendChild(colorSample);

    const blockSize = '20px';

    const colors = [
        '#a6443b', '#ef6255', '#f07c74', '#dd9d4d', '#f6af56', '#f9c685',
        '#e7d84e', '#fff158', '#fff597', '#69c14c', '#84f260', '#84f260',
        '#2c53af', '#3f78fb', '#8faafc', '#8faafc', '#8068fc', '#b29efd',
        '#714298', '#bd6ffd', '#d5a2fe', '#000000', '#323232', '#666666',
        '#999999', '#cccccc', '#ffffff', '#37231b', '#4d3025', '#6f4636',
        '#8b695d', '#a88f85'
    ];
    for (let color of colors) {
        const colorBlock = document.createElement('div');
        colorBlock.style.display = 'inline-block';
        colorBlock.style.backgroundColor = color;
        colorBlock.style.width = blockSize;
        colorBlock.style.height = blockSize;
        colorBlock.style.margin = '4px';
        colorBlock.style.borderRadius = '10px';
        colorBlock.className = 'ColorBlock';
        element.appendChild(colorBlock);
    }

    palette.currentColor = colorSample.style.backgroundColor;

    element.addEventListener('click', function(ev) {
        if (ev.target.className == 'ColorBlock') {
            palette.currentColor = ev.target.style.backgroundColor;
            colorSample.style.backgroundColor = palette.currentColor;
        }
    });

    return palette;
}

function paintSolid1(pixel, color) {
    pixel.paint(color);
}

function paintSolid3(pixel, color) {
    [
        pixel, pixel.sibling(-1, -1), pixel.sibling(-1, 0),
        pixel.sibling(-1, 1), pixel.sibling(0, -1), pixel.sibling(0, 1),
        pixel.sibling(1, -1), pixel.sibling(1, 0), pixel.sibling(1, 1)
    ].forEach(function(p) {
        if (p != null) {
            p.paint(color);
        }
    });
}

function paintSolid5(pixel, color) {
    [
        pixel, pixel.sibling(-1, -1), pixel.sibling(-1, 0),
        pixel.sibling(-1, 1), pixel.sibling(0, -1), pixel.sibling(0, 1),
        pixel.sibling(1, -1), pixel.sibling(1, 0), pixel.sibling(1, 1),
        pixel.sibling(-2, -1), pixel.sibling(-2, 0), pixel.sibling(-2, 1),
        pixel.sibling(2, -1), pixel.sibling(2, 0), pixel.sibling(2, 1),
        pixel.sibling(-1, -2), pixel.sibling(0, -2), pixel.sibling(1, -2),
        pixel.sibling(-1, 2), pixel.sibling(0, 2), pixel.sibling(1, 2)
    ].forEach(function(p) {
        if (p != null) {
            p.paint(color);
        }
    });
}

function paintSolid7(pixel, color) {
    [
        pixel, pixel.sibling(-1, -1), pixel.sibling(-1, 0),
        pixel.sibling(-1, 1), pixel.sibling(0, -1), pixel.sibling(0, 1),
        pixel.sibling(1, -1), pixel.sibling(1, 0), pixel.sibling(1, 1),
        pixel.sibling(-2, -1), pixel.sibling(-2, 0), pixel.sibling(-2, 1),
        pixel.sibling(2, -1), pixel.sibling(2, 0), pixel.sibling(2, 1),
        pixel.sibling(-1, -2), pixel.sibling(0, -2), pixel.sibling(1, -2),
        pixel.sibling(-1, 2), pixel.sibling(0, 2), pixel.sibling(1, 2),
        pixel.sibling(-2, -2), pixel.sibling(-2, 2), pixel.sibling(2, -2),
        pixel.sibling(2, 2), pixel.sibling(-3, -2), pixel.sibling(-3, -1),
        pixel.sibling(-3, 0), pixel.sibling(-3, 1), pixel.sibling(-3, 2),
        pixel.sibling(3, -2), pixel.sibling(3, 2), pixel.sibling(3, -1),
        pixel.sibling(3, 1), pixel.sibling(3, 0), pixel.sibling(-2, -3),
        pixel.sibling(-1, -3), pixel.sibling(0, -3), pixel.sibling(0, -3),
        pixel.sibling(1, -3), pixel.sibling(2, -3), pixel.sibling(-2, 3),
        pixel.sibling(-1, 3), pixel.sibling(0, 3), pixel.sibling(1, 3),
        pixel.sibling(2, 3)
    ].forEach(function(p) {
        if (p != null) {
            p.paint(color);
        }
    });
}

function ToolBar(element) {
    const bar = { element: element };

    element.style.padding = '1em';
    element.style.lineHeight = '0';
    element.style.textAlign = 'center';

    createButton = function(imgSrc, painter) {
        const btn = document.createElement('img');
        btn.style.display = 'inline-block';
        btn.setAttribute('src', imgSrc);
        btn.paint = painter;
        element.appendChild(btn);
        return btn;
    }

    createButton('solid7.png', paintSolid7);
    createButton('solid5.png', paintSolid5);
    createButton('solid3.png', paintSolid3);
    const s1 = createButton('solid1.png', paintSolid1);

    bar.currentTool = s1;
    bar.currentTool.style.border = '1px solid #000000';

    element.addEventListener('click', function(ev) {
        if (ev.target.paint != null) {
            bar.currentTool.style.border = 'none';
            bar.currentTool = ev.target;
            bar.currentTool.style.border = '1px solid #000000';
        }
    });

    return bar;
}

let palette = new Palette(document.getElementById('palette'));
let toolBar = new ToolBar(document.getElementById('toolBar'));
let canvas = new Canvas(64, 50, document.getElementById('canvas'));
