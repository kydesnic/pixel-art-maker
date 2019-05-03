function Canvas(width, height, element) {
    const canvas = { width: width, height: height, element: element };

    canvas.element.innerHTML = '';

    const pixelSize = '8px';

    for (let y = 0; y < height; ++y) {
        const row = document.createElement('div');
        row.style.lineHeight = '0';

        for (let x = 0; x < width; ++x) {
            const pixel = document.createElement('div');
            pixel.style.width = pixelSize;
            pixel.style.height = pixelSize;
            pixel.style.backgroundColor = '#ffffff';
            pixel.style.display = 'inline-block';
            pixel.style.border = '1px solid #e5e5e5';

            row.appendChild(pixel);
        }
        canvas.element.appendChild(row);
    }

    canvas.element.addEventListener('click', function(ev) {
        ev.target.style.backgroundColor = palette.currentColor;
    });

    return canvas;
}

function Palette(element) {
    const palette = { element: element };

    element.style.padding = '1em';

    const sampleSize = '40px';

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
        colorBlock.style.margin = '2px';
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

let canvas = new Canvas(64, 50, document.getElementById('canvas'));
let palette = new Palette(document.getElementById('palette'));
