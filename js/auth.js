const API = "http://localhost:3000/users";

async function login() {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) throw "Campos vacíos";

    const res = await fetch(`${API}?email=${email}&password=${password}`);
    const data = await res.json();

    if (data.length === 0) throw "Credenciales incorrectas";

    localStorage.setItem("user", JSON.stringify(data[0]));
    alert("Login exitoso");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error);
  }
}

async function register() {
  try {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !password) throw "Campos vacíos";

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        role: "user"
      })
    });

    alert("Registro exitoso");
    window.location.href = "login.html";
  } catch (error) {
    alert(error);
  }
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// Conectar botón logout
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});
