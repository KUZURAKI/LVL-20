document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("registrationModal");
  const openBtn = document.querySelector(".openModalBtn");
  const closeBtn = document.querySelector(".closeBtn");

  const toggleModal = (shouldOpen) => {
    if (shouldOpen) {
      modal.showModal();
    } else {
      modal.close();
    }
  };

  openBtn.addEventListener("click", () => toggleModal(true));
  closeBtn.addEventListener("click", () => toggleModal(false));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) toggleModal(false);
  });

  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("focus", function () {
    if (!this.value.startsWith("+7")) this.value = "+7";
  });

  phoneInput.addEventListener("input", function (e) {
    const cursorPosition = this.selectionStart;
    let cleaned = this.value.replace(/\D/g, "");

    if (cleaned.startsWith("7") && !cleaned.startsWith("+7")) {
      cleaned = "7" + cleaned.substring(1);
    } else if (!cleaned.startsWith("7")) {
      cleaned = "7" + cleaned;
    }

    let formatted = "+7";
    if (cleaned.length > 1) {
      const rest = cleaned.substring(1);
      if (rest.length <= 3) {
        formatted += ` (${rest}`;
      } else if (rest.length <= 6) {
        formatted += ` (${rest.substring(0, 3)}) ${rest.substring(3)}`;
      } else if (rest.length <= 8) {
        formatted += ` (${rest.substring(0, 3)}) ${rest.substring(
          3,
          6
        )}-${rest.substring(6)}`;
      } else {
        formatted += ` (${rest.substring(0, 3)}) ${rest.substring(
          3,
          6
        )}-${rest.substring(6, 8)}-${rest.substring(8, 10)}`;
      }
    }

    this.value = formatted;
    this.setSelectionRange(
      e.inputType === "deleteContentBackward"
        ? cursorPosition
        : this.value.length,
      e.inputType === "deleteContentBackward"
        ? cursorPosition
        : this.value.length
    );
  });

  const emailInput = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fullNameInput = document.getElementById("full_name");

  const validateEmail = () => {
    const isValid = emailRegex.test(emailInput.value);
    emailInput.setCustomValidity(
      isValid ? "" : "Пожалуйста, введите корректный email адрес"
    );
    if (!isValid) emailInput.reportValidity();
    return isValid;
  };

  const validateFullName = () => {
    const words = fullNameInput.value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const isValid = words.length >= 3;
    fullNameInput.setCustomValidity(
      isValid ? "" : "Пожалуйста, введите Фамилию, Имя и Отчество (3 слова)"
    );
    if (!isValid) fullNameInput.reportValidity();
    return isValid;
  };

  emailInput.addEventListener("blur", validateEmail);
  fullNameInput.addEventListener("blur", validateFullName);

  emailInput.addEventListener("input", function () {
    const isValid = validateEmail();
    document.querySelectorAll("input, textarea, button").forEach((element) => {
      if (element !== emailInput && element.id !== "submitButton") {
        element.disabled = !isValid;
      }
    });
  });

  document.querySelectorAll(".togglePassword").forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.parentElement.querySelector("input");
      input.type = input.type === "password" ? "text" : "password";
    });
  });
});
