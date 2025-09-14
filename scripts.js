let $shapeContainer = $('.draw-area');

// Functionality on page load
$(function () {
    // Prevents the page from reloading when submiting a form
    $('.myForm').submit(function (e) {
        e.preventDefault();
    })
    $shapeContainer.css('height', $shapeContainer.css('width'));

    $(window).on('resize', () => $shapeContainer.css('height', $shapeContainer.css('width')));

    // Event listenners for the buttons
    $('#drawRectangle').on('click', drawRectangle);
    $('#drawSquare').on('click', drawSquare);
    $('#drawCircle').on('click', drawCircle);
    $('#drawTriangle').on('click', drawTriangle);

})

// Draws a rectangle on screen
function drawRectangle() {
    let width = $('#rectangleWidth').val();
    let height = $('#rectangleHeight').val();
    new Rectangle(width, height);
}

// Draws a square on screen
function drawSquare() {
    let sideLength = $('#lengthSquare').val();
    new Square(sideLength);
}

// Draws a circle on screen
function drawCircle() {
    let radius = $('#circleRadius').val();
    new Circle(radius);
}

// Draws a triangle on screen
function drawTriangle() {
    let height = $('#triangleHeight').val();
    new Triangle(height);
}

// Definition of the class Shape
class Shape {

    constructor(width, height) {

        this.width = width;
        this.height = height;
        this.area = this.shapeArea();

        this.divShape = $('<div class="shape"></div>');
        this.shapeDef();
        this.divShape.appendTo($shapeContainer);
        this.eventListenners();
    }

    shapeArea() {
        return this.width * this.height;
    }

    // randomValue(0, (MAX - this.width))
    shapeDef() {
        let containerWidth = parseInt($($shapeContainer).css('width'), 10);
        let containerHeight = parseInt($($shapeContainer).css('height'), 10);
        this.relativePosition(containerWidth, containerHeight);
        this.relativeSize(containerWidth, containerHeight);
    }

    // Removes previous info and shows the info of the current shape
    describe() {

        let $info = $('.shapeName');
        $($info).find('span').remove();
        this.nameInfo.appendTo($info);

        $info = $('.width');
        $($info).find('span').remove();
        this.widthInfo.appendTo($info);

        $info = $('.height');
        $($info).find('span').remove();
        this.heightInfo.appendTo($info);

        $info = $('.radius');
        $($info).find('span').remove();
        this.radiusInfo.appendTo($info);

        $info = $('.area');
        $($info).find('span').remove();
        this.areaInfo.appendTo($info);

        $info = $('.perimeter');
        $($info).find('span').remove();
        this.perimeterInfo.appendTo($info);
    }

    // Defines de spans with the info of the shape
    shapeInfo() {
        this.nameInfo = $(`<span> -</span>`);
        this.widthInfo = $(`<span> ${this.width}</span>`);
        this.heightInfo = $(`<span> ${this.height}</span>`);
        this.radiusInfo = $(`<span> -</span>`);
        this.areaInfo = $(`<span> ${this.area}</span>`);
        this.perimeterInfo = $(`<span> -</span>`);
    }

    eventListenners() {
        this.divShape.on('click', () => this.describe());
        this.divShape.on('dblclick', () => this.divShape.remove());
    }

    relativePosition(containerWidth, containerHeight) {
        let percentageWidth = percentageOf(containerWidth, randomValue(0, (containerWidth - this.width)));
        let percentageHeight = percentageOf(containerHeight, randomValue(0, (containerHeight - this.height)));
        this.divShape.css({ left: `${percentageWidth}%`, top: `${percentageHeight}%` });
    }

    relativeSize(containerWidth, containerHeight) {
        let percentageWidth = percentageOf(containerWidth, this.width);
        let percentageHeight = percentageOf(containerHeight, this.height);
        this.divShape.css({ width: `${percentageWidth}%`, height: `${percentageHeight}%` });
    }
}

// Definition of the class circle
class Circle extends Shape {
    constructor(radius) {
        super((radius * 2), (radius * 2));

        this.shapeName = 'Circle';
        this.radius = radius;
        this.area = this.shapeArea();
        this.perimeter = this.shapePerimeter();

        this.shapeInfo();
    }

    // Calculates area of a circle
    shapeArea() {
        return (Math.PI * this.radius * this.radius).toFixed(2);
    }

    // Calculates perimeter of a circle
    shapePerimeter() {
        return (2 * Math.PI * this.radius).toFixed(2);
    }

    // Defines the specific shape
    shapeDef() {
        super.shapeDef();
        this.divShape.attr('class', 'shape circle');
        this.divShape.css('border-radius', '50%');
    }

    // Defines the span of the specific shape
    shapeInfo() {
        super.shapeInfo();
        this.nameInfo = $(`<span> ${this.shapeName}</span>`);
        this.radiusInfo = $(`<span> ${this.radius}</span>`);
        this.areaInfo = $(`<span> ${this.area}</span>`);
        this.perimeterInfo = $(`<span> ${this.perimeter}</span>`);
    }
}

// Definition of the class Triangle
class Triangle extends Shape {
    constructor(height) {
        super(height, height);
        this.shapeName = 'Triangle';
        this.area = this.shapeArea();
        this.perimeter = this.shapePerimeter();
        this.shapeInfo();
        $(window).on('resize', () => this.calcSize());
    }

    // Calculates area of a triangle
    shapeArea() {
        return (super.shapeArea() / 2).toFixed(2);
    }

    // Calculates perimeter of a triangle
    shapePerimeter() {
        return (2 * this.height + (Math.sqrt(2) * this.height)).toFixed(2);
    }

    // Defines the specific shape
    shapeDef() {
        super.shapeDef();
        this.divShape.css({ width: '0px', height: '0px' });
        this.calcSize();
    }

    calcSize() {
        let containerWidth = parseInt($($shapeContainer).css('width'), 10);
        if (containerWidth === 600) {
            this.divShape.css(`border-bottom`, `${this.height}px solid yellow`);
            this.divShape.css(`border-right`, `${this.height}px solid transparent`);
        } else {
            let percentageWidth = percentageOf(600, containerWidth);

            this.divShape.css(`border-bottom`, `${((percentageWidth * this.width) / 100).toFixed(2)}px solid yellow`);
            this.divShape.css(`border-right`, `${((percentageWidth * this.width) / 100).toFixed(2)}px solid transparent`);
        }
    }

    // Defines the span of the specific shape
    shapeInfo() {
        super.shapeInfo();
        this.nameInfo = $(`<span> ${this.shapeName}</span>`);
        this.areaInfo = $(`<span> ${this.area}</span>`);
        this.perimeterInfo = $(`<span> ${this.perimeter}</span>`);
    }
}

// Definition of the class Rectangle
class Rectangle extends Shape {
    constructor(width, height) {
        super(width, height);
        this.shapeName = 'Rectangle';
        this.perimeter = this.shapePerimeter();
        this.shapeInfo();
    }

    // Calculates perimeter of a rectangle
    shapePerimeter() {
        return (2 * this.width) + (2 * this.height);
    }

    // Defines the specific shape
    shapeDef() {
        super.shapeDef();
        this.divShape.attr('class', 'shape rectangle');
    }

    // Defines the span of the specific shape
    shapeInfo() {
        super.shapeInfo();
        this.nameInfo = $(`<span> ${this.shapeName}</span>`);
        this.perimeterInfo = $(`<span> ${this.perimeter}</span>`);
    }
}

// Definition of the class Square
class Square extends Rectangle {
    constructor(sideLength) {
        super(sideLength, sideLength);
        this.shapeName = 'Square';
        this.shapeInfo();
    }

    // Defines the specific shape
    shapeDef() {
        super.shapeDef();
        this.divShape.attr('class', 'shape square');
    }

    // Defines the span of the specific shape
    shapeInfo() {
        super.shapeInfo();
        this.nameInfo = $(`<span> ${this.shapeName}</span>`);
    }
}

// Generic function that creates a random value given it's maximum and minimum
function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function percentageOf(max, value) {
    return ((value * 100) / max).toFixed(2);
}