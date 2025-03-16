document.addEventListener("DOMContentLoaded", function () {
  const authBtn = document.getElementById("authBtn");
  const formTitle = document.getElementById("formTitle");
  const toggleSignUp = document.getElementById("toggleSignUp");
  const toggleLogin = document.getElementById("toggleLogin");

  let isSignUp = true;

  function updateToggle() {
    formTitle.innerText = isSignUp ? "Sign Up" : "Login";
    authBtn.innerText = isSignUp ? "Sign Up" : "Login";
    toggleSignUp.classList.toggle("active", isSignUp);
    toggleLogin.classList.toggle("active", !isSignUp);
  }

  toggleSignUp.addEventListener("click", function () {
    isSignUp = true;
    updateToggle();
  });

  toggleLogin.addEventListener("click", function () {
    isSignUp = false;
    updateToggle();
  });

  authBtn.addEventListener("click", async function () {
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;

    if (!email.includes("@") || !email.includes(".")) {
      alert("Invalid email format.");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must have at least one uppercase letter, number, and special character."
      );
      return;
    }

    const endpoint = isSignUp ? "/signup" : "/login";
    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password}),
    });

    const result = await response.json();
    alert(result.message);

    if (!isSignUp && result.success) {
      window.location.href = "homepage.html";
    }
  });

  updateToggle();
});
