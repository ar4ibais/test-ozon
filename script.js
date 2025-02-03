document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.querySelector(".progress-bar");
    const valueInput = document.getElementById("value-input");
    const animateToggle = document.getElementById("animateToggle");
    const hideToggle = document.getElementById("hideToggle");
    const progressBlock = document.querySelector(".progress-block");

    // Инициализация из localStorage
    const savedValue = localStorage.getItem("progressValue") || 0;
    const savedAnimate = localStorage.getItem("progressAnimate") === "true";
    const savedHide = localStorage.getItem("progressHide") === "true";

    valueInput.value = savedValue;
    animateToggle.checked = savedAnimate;
    hideToggle.checked = savedHide;

    // Функция обновления дуги
    const updateProgress = (value) => {
        const offset = 314 - (314 * value) / 100;
        progressBar.style.strokeDashoffset = offset;
    };

    // Обновление значений
    valueInput.addEventListener("input", (e) => {
        const value = Math.min(100, Math.max(0, e.target.value));
        updateProgress(value);
        localStorage.setItem("progressValue", value);
    });

    // Анимация
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

    // Скрытие блока
    hideToggle.addEventListener("change", (e) => {
        if (e.target.checked) {
            e.target.parentNode.style.background = "#007bff";
            progressBlock.style.display = "none";
        } else {
            e.target.parentNode.style.background = "#d9e2ec";
            progressBlock.style.display = "block";
        }
        localStorage.setItem("progressHide", e.target.checked);
    });

    // Инициализация состояния
    updateProgress(savedValue);
    if (savedAnimate) progressBlock.classList.add("animate");
    if (savedHide) progressBlock.style.display = "none";
});
