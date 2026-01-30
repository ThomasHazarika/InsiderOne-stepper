let currentStep = 1;
const totalSteps = 4;

// Store user selections
const answers = {
  step1: null,
  step2: null,
  step3: null,
  confirm: false,
};

const errorBox = document.getElementById("error-box");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");

// Step content blocks
const stepContents = document.querySelectorAll(".step-content");

// Step indicators
const circles = [
  document.getElementById("circle-1"),
  document.getElementById("circle-2"),
  document.getElementById("circle-3"),
  document.getElementById("circle-4"),
];

const lines = [
  document.getElementById("line-1"),
  document.getElementById("line-2"),
  document.getElementById("line-3"),
];

// Confirmation checkbox
const confirmCheckbox = document.getElementById("confirm");

init();

function init() {
  updateUI();
  bindRadioInputs();
  bindConfirmation();
}

function bindRadioInputs() {
  const radios = document.querySelectorAll("input[type='radio']");

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      answers[`step${currentStep}`] = radio.value;
      errorBox.classList.add("hidden");
    });
  });
}

function bindConfirmation() {
  if (!confirmCheckbox) return;

  confirmCheckbox.addEventListener("change", () => {
    answers.confirm = confirmCheckbox.checked;
  });
}

function handleNext() {
  // Validation
  if (currentStep <= 3 && !answers[`step${currentStep}`]) {
    errorBox.classList.remove("hidden");
    return;
  }

  if (currentStep === 4 && !answers.confirm) {
    errorBox.textContent = "Please confirm!";
    errorBox.classList.remove("hidden");
    return;
  }

  errorBox.classList.add("hidden");

  if (currentStep < totalSteps) {
    currentStep++;
    updateUI();
  } else {
    showSuccess();
  }
}

function handleBack() {
  if (currentStep === 1) return;

  currentStep--;
  errorBox.classList.add("hidden");
  updateUI();
}

function goToStep(step) {
  if (step < currentStep) {
    currentStep = step;
    errorBox.classList.add("hidden");
    updateUI();
  }
}

function updateUI() {
  // Step content visibility
  stepContents.forEach((el) => el.classList.remove("active"));
  document
    .getElementById(`step-content-${currentStep}`)
    ?.classList.add("active");

  // Back button visibility
  backBtn.style.visibility = currentStep === 1 ? "hidden" : "visible";

  // Button text
  nextBtn.textContent = currentStep === totalSteps ? "Complete" : "Continue";

  updateIndicators();
}

function updateIndicators() {
  circles.forEach((circle, index) => {
    const stepNumber = index + 1;

    if (stepNumber < currentStep) {
      // Completed
      circle.textContent = "✓";
      circle.className =
        "flex h-6 w-6 items-center justify-center bg-[#0096C7] text-black font-bold";
    } else if (stepNumber === currentStep) {
      // Active
      circle.textContent = "";
      circle.className =
        "flex h-6 w-6 items-center justify-center bg-[#0096C7] ring-4 ring-[#03045E]";
    } else {
      // Upcoming
      circle.textContent = "";
      circle.className =
        "flex h-6 w-6 items-center justify-center bg-neutral-300";
    }
  });

  lines.forEach((line, index) => {
    line.style.width = index + 2 <= currentStep ? "100%" : "0%";
  });
}

function showSuccess() {
  stepContents.forEach((el) => el.classList.remove("active"));
  document.getElementById("step-content-final").classList.add("active");

  document.getElementById("footer").classList.add("hidden");

  console.log("User Answers:", answers);
}

const btn = document.getElementById("menuBtn");
const sidebar = document.getElementById("site__sidebar");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menu-icon");
const crossIcon = document.getElementById("cross-icon");

btn.addEventListener("click", () => {
  const isExpanded = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", !isExpanded);

  sidebar.classList.toggle("!-translate-x-0");
});

btn.addEventListener("click", () => {
  menuIcon.classList.toggle("hidden");
  crossIcon.classList.toggle("hidden");
});