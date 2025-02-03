document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.querySelector(".progress-bar");
    const valueInput = document.getElementById("value-input");
    const animateToggle = document.getElementById("animateToggle");
    const hideToggle = document.getElementById("hideToggle");
    const progressBlock = document.querySelector(".progress-block");
    const toHideBlocks = document.querySelectorAll(".toHide");

    const savedValue = localStorage.getItem("progressValue") || 0;
    const savedAnimate = localStorage.getItem("progressAnimate") === "true";

    valueInput.value = savedValue;
    animateToggle.checked = savedAnimate;

    const updateProgress = (value) => {
        const offset = 314 - (314 * value) / 100;
        progressBar.style.strokeDashoffset = offset;
    };

    valueInput.addEventListener("input", (e) => {
        const value = Math.min(100, Math.max(0, e.target.value));
        updateProgress(value);
        localStorage.setItem("progressValue", value);
    });

    valueInput.addEventListener("input", (e) => {
        let value = parseFloat(e.target.value);

        if (isNaN(value)) {
            value = 0;
        }

        value = Math.min(100, Math.max(0, value));

        e.target.value = value;
    });

    animateToggle.addEventListener("change", (e) => {
        if (e.target.checked) {
            e.target.parentNode.style.background = "#007bff";
            progressBlock.classList.add("animate");
        } else {
            e.target.parentNode.style.background = "#d9e2ec";
            progressBlock.classList.remove("animate");
        }
        localStorage.setItem("progressAnimate", e.target.checked);
    });

    hideToggle.addEventListener("change", (e) => {
        if (e.target.checked) {
            e.target.parentNode.style.background = "#007bff";
            toHideBlocks.forEach((item) => {
                item.classList.add("hideContent");
            });
        } else {
            e.target.parentNode.style.background = "#d9e2ec";
            toHideBlocks.forEach((item) => {
                item.classList.remove("hideContent");
            });
        }
    });

    updateProgress(savedValue);
    if (savedAnimate) progressBlock.classList.add("animate");
    if (savedHide) progressBlock.style.display = "none";
});
