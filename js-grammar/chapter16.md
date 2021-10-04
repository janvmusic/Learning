### Chapter 16 - Creating HTML elements dynamically
- **DOM** Document Object Model.
- Javascript **creates** and HTML unique object for each tag presented in your DOM
- _createElement_ is a native tool from Javascript to create HTML objects
```javascript
  let E1 = document.createElement("div");
  let E2 = document.createElement("span");
  let E3 = document.createElement("p");
  let E4 = document.createElement("img");
  let E5 = document.createElement("input");
```
- At this point these elements only exists in **Javascript** context. Not in DOM
- You can add some _CSS_ styling via **Javascript**
```javascript
  let div = document.createElement("div");
  
  // set id of the element
  div.setAttribute("id", "element");

  // set the class attribute
  div.setAttribute("class", "box");

  // Set attributes via style property
  div.style.position        = "absolute";
  div.style.display         = "block";
  div.style.width	    = "100px";
  div.style.heigth          = "100px";
  div.style.top             = 0;
  div.style.left            = 1000;
  div.style.backgroundColor = "white";
```
- In _CSS_ dash (-) is a legal property name character. But Javascript interprets it as **minus** sign
- Multi-word property names are changed to **camel case** format. In example: `border-style` for `borderStyle`
- To add our new element to the DOM, you will need to call `element.appendChild(object);`. In example could be: `document.body.appendChild(div);`
- You can also call `document.getElementById("id").appendChild(div)`
- Or you can add it using `document.querySelector( selector ).appendChild(div)`

#### **16.0.4 Create objects using functions constructors**
```javascript
  function Season(name) {
    this.name = name;
    this.getName = function() { return this.name };
  }
```
- This function creates a season and adds a name
- Now let's instantiate them!
```javascript
  let winter = new Season("Winter");
  let spring = new Season("Spring");
  let summer = new Season("Summer");
  let autumn = new Season("Autumn");
```
- This creates a problem because `getName` is copied 4 times. Not reused!

