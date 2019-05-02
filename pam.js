function Canvas(width, height) {
    const canvas = { width: width, height: height };

    canvas.element = document.getElementById('canvas');
    canvas.element.innerHTML = '';
    canvas.element.style.backgroundColor = '#e5e5e5';

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
            pixel.style.border = '1px solid';
            pixel.style.borderColor = canvas.element.style.backgroundColor;

            row.appendChild(pixel);
        }
        canvas.element.appendChild(row);
    }

    canvas.element.addEventListener('click', function(ev) {
        ev.target.style.backgroundColor = '#ff0000';
    });
}

let canvas = Canvas(4, 4);
