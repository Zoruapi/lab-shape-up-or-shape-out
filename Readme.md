# Shape Up or Shape Out

The purpose of this lab is to help solidify the OOP Class inheritance concepts you've learned from the lectures.
* You will be building a webpage that will enable users to draw shapes of varying sizes on the screen
* When a shape is clicked, you should update the sidepanel with the metrics for that shape
* Each type of shape will have its own input box(es) for getting size information, and an insert button for drawing the shape on the page

## Steps

### Setup

* Create an index.html file, script.js file, and a css file for styling
    * You can optionally use Bootstrap to also add style to your webpage

### HTML Objectives

* Your shape painter should handle four shapes: Square, Rectangle, Circle, and Triangle
* In your index.html, go ahead and add labeled input fields and insert buttons for each shape type:
    * Rectangle: Inputs for width and height, and an insert button
    * Square: Input for side length and an insert button
    * Circle: Input for radius and an insert button
    * Isosceles Right Triangle: Input for height and an insert button
* Each of the insert buttons above should create a new instance of that particular shape, which should draw itself on the screen with the specified size and placed in a random location (object details are below)
* Create a 600px by 600px div with the background color of your choosing. All the shapes you insert will be drawn within this div
* Show a sidepanel beside this shape canvas. It should display the following information for a clicked shape:
    * Shape Name:
    * Width:
    * Height:
    * Radius:
    * Area:
    * Perimeter:

### JavaScript Objectives

* You must use OOP. Specifically, you must use the classes defined below and properly use inheritance
* Class- Shape
    * Shape is very generic
    * Try to put as much logic in this class as you can, but remember, sometimes you have to put logic in child classes for more custom behavior
* Class- Circle
    * Needs to take a single parameter, radius, in its constructor
    * Needs to call the constructor of its logical parent class
    * Can have methods that define behavior/calculations specific to Circles
* Class- Triangle
    * This will be a right isosceles Triangle
    * Needs to take a single parameter, height, in its constructor
    * Since it is a right isosceles Triangle, height/width/base will all be the same
    * Needs to call teh constructor of its logical parent class
    * Can have methods that define behavior/calculations specific to Triangles
* Class- Restangle
    * Needs to take two parameters, width and height, in its constructor
    * Needs to call the constructor of its logical parent class
    * Can have methods that define behavior/calculations specific to Rectangles
* Class- Square
    * Needs to take a single parameter, sideLength, in its constructor
    * Needs to call the constructor of its logical parent class
    * A square is a special type of rectangle
    * Can have methods that define behavior/calculations specific to Squares
* **Additional details:**
    * Clicking on any shape should call a method named describe(), which should update the statistics in teh sidepanel in index.html
    * Double clicking on any shape should remove the shape from the screen
    * Every shape draws itself when created. The shape will be drawn according to the size specified when the shape was created, and the shape will be placed in a random location withint the shape canvas
    * To keep things simple, it helps to think of every shape having a width and height (even the circle and triangle have a "bounding box" we cannot see that can be derived from their single measurment)
    * Remember that a circle's perimeter is the same as its circumference
    * Drawing a triangle is going to be tricky!
    * Circles should be purple, Squares should be red, Triangles should be yellos, and Rectangles should be green

### Hints/Resources

* Try to use CSS class names and write as many styles onto those class names as you can
    * ONly use inline-styles when necessary (and some things will require it in this lab)
* It may help to review relative vs absolute positioning, and how `top` and `left` can be used to specify the location of an html element
* You may find _this guide_ (https://css-tricks.com/the-shapes-of-css/) helpful for drawing shapes with CSS (For triangle, use Top-Left, Top-Right, Bottom-Left, or Bottom-Right)
* Triangle area: `0.5 * base * height`
* Triangle perimeter (right isosceles): `2 * height + (square root of 2) * height`