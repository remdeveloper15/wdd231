document.addEventListener("DOMContentLoaded", () => {
    // Timestamp hidden field
    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
        const now = new Date();
        // ISO para que sea fácil leer en thankyou.html
        timestampInput.value = now.toISOString();
    }

    // Modals: open
    const openLinks = document.querySelectorAll(".membership-more");
    openLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const modalId = link.dataset.modal;
            const dialog = document.getElementById(modalId);
            if (dialog && typeof dialog.showModal === "function") {
                dialog.showModal();
            }
        });
    });

    // Modals: close
    const closeButtons = document.querySelectorAll("[data-close]");
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const dialog = button.closest("dialog");
            if (dialog) {
                dialog.close();
            }
        });
    });
});
