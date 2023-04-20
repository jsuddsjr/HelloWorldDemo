(() => {
    let current = 0;
    const messages = [
        "Hello, World!",
        "This typing effect",
        "using CSS Animation",
        "and CSS Variables",
        "is simple to do",
        "once you know how.",
        "Animation uses steps",
        "so changes are discrete",
        "rather than continuous.",
        "JavaScript listeners",
        "add a line of text",
        "when animation ends.",
        "Check out the README",
        "for more details.",
    ];

    const container = document.getElementById("container");

    /**
     * @this {HTMLElement}
     * @param {AnimationEvent} ev
     */
    const animationEnd = (ev) => {
        const msg = messages[current++];

        const newLine = container.firstElementChild.cloneNode(true);
        const typing = newLine.firstElementChild;

        if (current < messages.length) {
            typing.addEventListener("animationend", animationEnd, { once: true });
        }

        typing.dataset.message = msg;
        typing.style.setProperty("--steps", msg.length + 1);

        container.insertBefore(newLine, container.firstChild);
    }

    animationEnd();
})()