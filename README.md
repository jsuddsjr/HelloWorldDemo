# Typing effect with CSS animation and variables

> **Challenge**: Print "Hello World" to the screen.

## Overview

To be honest, I've done this challenge a million times already. I didn't want to
use a Python `print` statement (too easy), nor would I be satisfied by spinning
up a web site from a template and sticking "Hello World" on the home page (not
enough of a challenge). So, decided to use a bit of basic HTML and fancy CSS (no
scripting allowed).

I first headed over to [Codepen.io](https://codepen.io), because who doesn't
like a little bit of inspiration? The first pen that caught my eye was for a
[Terminal Text Effect](https://codepen.io/Tbgse/pen/dYaJyJ) that displayed the
text one character at a time. It looked promising, but I was disappointed to
discover that the effect was created entirely by JavaScript. Even the cursor
blink was controlled by JavaScript.

![screen capture](media/console-text-js.gif)

> Rule #1: Never use JavaScript to do something that CSS can do.

### Tutorial: How to create a typing effect with CSS animation

I decided to animate the cursor first. There's no reason to fiddle with the
`visibility` property in script when you can easily change the `opacity` with
CSS animation. Here's how to do it.

#### Using step-wise easing functions

Here's all the HTML and CSS we will need.

```html
<div id="cursor">_</div>
```

```css
#cursor {
    font-size: 5.5em;
    animation: blink 1s step-end infinite;
}

@keyframes blink {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
}
```

I divided the animation into two equally spaced steps. Normally, CSS will
animate the value of `opacity` smoothly between 0 and 1. To prevent this, I used
the `step-end` easing function to jump between states. This technique will also
factor into the typing effect.

> Use step easing functions to abruptly change between animation states.

[Click here to see it action](flashing.html)

#### Animating the width of an element

You can emulate typing with a sliding window, where each step of the animation
exposes just a little more of the text until, voila! It's important that I use a
monospace font, so each character is guaranteed to be the same width as all the
others.

> <span style="font-family: monospace">Each character in a monospace font is the
> same width.</span>

| :warning: Change of plans :warning: | | --- | | As I am trying to animate the
width of the element, I discovered that only `position: fixed` or
`position: absolute` elements will let you animate the `width` property. This is
a problem because I was counting on the width of the element to push the cursor
along, but absolutely positioned elements exist outside the document flow. I
tried putting the cursor inside the `div` with the text, but that quickly proved
impractical. I cannot use a sliding window AND have a cursor unless I animate
them separately. After trying a few options, I decide to replace the flat cursor
with a vertical one. |

```html
<div class="typed">Hello World</div>
```

```css
#typed {
    font-family: Consolas, monospace;
    box-sizing: content-box;
    position: absolute;
    white-space: nowrap;
    overflow-x: hidden;

    /* "cursor" */
    border-right-width: .2ch;
    border-right-style: solid;
    border-right-color: black;

    animation: blink 800ms step-start infinite,
        typing 3s steps(12, end) infinite alternate;
}

@keyframes typing {
    from {
        width: 0;
    }

    to {
        width: 12ch;
    }
}

@keyframes blink {
    0% {
        border-right-color: black;
    }

    50% {
        border-right-color: transparent;
    }
}
```

##### Notes

* First, we set the `font-family` to monospace.
* Setting `position: absolute` allows us to animate the `width`
* `overflow-x: hidden` and `white-space: nowrap` hides letters outside the box.
* I use just the `border-right-color` property to create a flashing cursor.
  (Animating the `border-right` shorthand property would require me to specify
  the entire shorthand in the animation sequence.)
* I also ensure that `box-sizing: content-box` is set to ensure the border
  doesn't mess up the rendering.
* Finally, the animation is broken into 12 discrete steps from 0 to 11
  characters of "Hello World". So that each character fills exactly one step of
  the animation, the final width is `12ch`.

> We need 12 steps for a word with 11 characters.

![screen capture](media/console-text-css.gif)

[Click here to see it action](flashing.html)

### Digging deeper

This is only the beginning. Check out the full demo to see:

* How to configure the animation for different string lengths using CSS variables.
* How to respond to `animationend` events in JavaScript to change the string.
* How to use flexbox and reverse-column flow to generate a text crawl
  reminiscent of Star Wars.
* How to use media queries to reduce the size of the text for smaller screens.

![screen capture](media/console-text-final.gif)

## Demo videos

[Software Demo Video](https://youtu.be/8NTZNljfAKM)

## Development Environment

I recommend using [Visual Studio Code](https://code.visualstudio.com/) with the
[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
extension to develop HTML and CSS projects. I also highly recommend also
installing
[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
to avoid embarrasing [sic] typos.

## Useful Websites

* [&lt;easing-function&gt; (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function)
* [Animating with CSS Variables](https://valhead.com/2017/07/21/animating-with-css-variables)
* [A Complete Guide to Data Attributes](https://css-tricks.com/a-complete-guide-to-data-attributes/)
* [Sass/SCSS for, each & while loops](https://www.koderhq.com/tutorial/sass/iteration-control/)
