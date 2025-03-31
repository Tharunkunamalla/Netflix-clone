document.addEventListener("DOMContentLoaded", function () {
  const signInBtn = document.getElementById("signInBtn");
  if (signInBtn) {
    signInBtn.addEventListener("click", function () {
      window.location.href = "login.html";
    });
  } else {
    console.error("Element with ID 'signInBtn' not found.");
  }
});
