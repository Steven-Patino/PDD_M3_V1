const API_EVENTS = "http://localhost:3000/events";

// =========================
// VALIDAR SESIÓN
// =========================
if (!window.user) {
  window.location.href = "login.html";
}

// =========================
// DOM
// =========================
const list = document.getElementById("eventList");
const adminDiv = document.getElementById("admin");

if (!list || !adminDiv) {
  console.error("Faltan contenedores en el HTML");
}

// =========================
// UI ADMIN
// =========================
if (user.role === "admin") {
  adminDiv.innerHTML = `
    <div class="bg-white p-6 rounded-xl shadow mb-6">
      <h3 class="text-lg font-semibold mb-4">Crear Evento</h3>

      <input
        id="title"
        type="text"
        placeholder="Título"
        class="w-full mb-3 p-3 border rounded"
      />

      <input
        id="capacity"
        type="number"
        placeholder="Capacidad"
        class="w-full mb-4 p-3 border rounded"
      />

      <button
        id="createBtn"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Crear evento
      </button>
    </div>
  `;

  document
    .getElementById("createBtn")
    .addEventListener("click", createEvent);
}

// =========================
// CARGAR EVENTOS
// =========================
async function loadEvents() {
  try {
    const res = await fetch(API_EVENTS);
    if (!res.ok) throw new Error("Error al cargar eventos");

    const events = await res.json();
    list.innerHTML = "";

    if (events.length === 0) {
      list.innerHTML = `<li class="text-gray-500">No hay eventos</li>`;
      return;
    }

    events.forEach(event => {
      const disponibles = event.capacity - event.attendees.length;

      const li = document.createElement("li");
      li.className =
        "bg-white p-4 rounded shadow flex justify-between items-center";

      li.innerHTML = `
        <div>
          <strong>${event.title}</strong>
          <p class="text-sm">Cupos: ${disponibles}</p>
        </div>

        <div class="flex gap-2">
          ${
            user.role === "admin"
              ? `<button
                    class="delete-btn bg-red-500 text-white px-3 py-1 rounded"
                    data-id="${event.id}">
                  Eliminar
                </button>`
              : ""
          }

          <button
            class="register-btn bg-green-500 text-white px-3 py-1 rounded"
            data-id="${event.id}">
            Inscribirme
          </button>
        </div>
      `;

      list.appendChild(li);
    });

    // listeners dinámicos
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", () =>
        deleteEvent(btn.dataset.id)
      );
    });

    document.querySelectorAll(".register-btn").forEach(btn => {
      btn.addEventListener("click", () =>
        registerEvent(btn.dataset.id)
      );
    });

  } catch (error) {
    alert("Error cargando eventos");
    console.error(error);
  }
}

// =========================
// CRUD
// =========================
async function createEvent() {
  const title = document.getElementById("title").value.trim();
  const capacity = Number(document.getElementById("capacity").value);

  if (!title || capacity <= 0) {
    alert("Datos inválidos");
    return;
  }

  await fetch(API_EVENTS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      capacity,
      attendees: []
    })
  });

  document.getElementById("title").value = "";
  document.getElementById("capacity").value = "";

  loadEvents();
}

async function deleteEvent(id) {
  if (!confirm("¿Eliminar este evento?")) return;

  await fetch(`${API_EVENTS}/${id}`, {
    method: "DELETE"
  });

  loadEvents();
}

async function registerEvent(id) {
  const res = await fetch(`${API_EVENTS}/${id}`);
  const event = await res.json();

  if (event.attendees.includes(user.id)) {
    alert("Ya estás inscrito");
    return;
  }

  if (event.attendees.length >= event.capacity) {
    alert("Evento lleno");
    return;
  }

  event.attendees.push(user.id);

  await fetch(`${API_EVENTS}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event)
  });

  loadEvents();
}

// =========================
// INIT
// =========================
loadEvents();
