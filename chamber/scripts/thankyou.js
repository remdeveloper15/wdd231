   document.addEventListener("DOMContentLoaded", () => {
            const params = new URLSearchParams(window.location.search);

            const fields = [
                "firstName",
                "lastName",
                "email",
                "phone",
                "organization",
                "timestamp"
            ];

            fields.forEach(field => {
                const span = document.getElementById("out-" + field);
                if (span) {
                    span.textContent = params.get(field) || "";
                }
            });
        });