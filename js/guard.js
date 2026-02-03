const userRaw = localStorage.getItem("user");

if (!userRaw) {
  window.location.href = "login.html";
} else {
  try {
    window.user = JSON.parse(userRaw);
  } catch (error) {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  }
}
