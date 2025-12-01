// --- 1. CONFIGURACIÓN DEL VIDEO (HLS) ---
var video = document.getElementById("video");
var source = "/hls/prueba.m3u8"; // Tu ruta original

if (Hls.isSupported()) {
  var hls = new Hls();
  hls.loadSource(source);
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED, function () {
    video
      .play()
      .catch((e) =>
        console.log("Autoplay bloqueado por navegador, requiere click")
      );
  });
} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
  video.src = source;
  video.addEventListener("loadedmetadata", function () {
    video.play();
  });
}

// --- 2. LOGICA DEL CHAT SIMULADO ---

const chatArea = document.getElementById("chatArea");
const chatInput = document.getElementById("chatInput");

// Colores aleatorios para los nombres
const userColors = [
  "#ff0000",
  "#00ff00",
  "#e91916",
  "#9146FF",
  "#1E90FF",
  "#FF69B4",
];

// Base de datos de nombres falsos
const fakeUsers = [
  "oadamuz",
  "pgteodoro",
  "cincoRaspao",
  "jjramos",
  "juanjo",
  "mariomontecatine",
  "acallejon",
  "suspenso",
  "Wireshark",
  "Innovasur",
  "wuolah",
  "atv",
  "banqueri",
];

// Base de datos de mensajes falsos
const fakeMessages = [
  "holaaaaaa",
  "cuanto queda???",
  "fornait",
  "Grandes",
  "Vamos oscarrrr",
  "eyy",
  "lol",
  "Ese rector va con lag",
  "no va",
  "se ha quedado pillado",
  "mola",
  "el que lea esto va a suspender RM",
  "oleeeeee",
  "diselo vieo",
  "por fin joder",
];

function addMessage(user, text, isUser = false) {
  const div = document.createElement("div");
  div.className = "chat-line";

  const color = isUser
    ? "#9146FF"
    : userColors[Math.floor(Math.random() * userColors.length)];
  const nameSpan = `<span class="chat-user" style="color:${color}">${user}:</span>`;

  div.innerHTML = `${nameSpan} <span style="color: #efeff1;">${text}</span>`;
  chatArea.appendChild(div);

  // Auto scroll abajo
  chatArea.scrollTop = chatArea.scrollHeight;
}
function scheduleNextMessage() {
  // Definir el rango de tiempo aleatorio (en milisegundos)
  // Por ejemplo: entre 500ms (medio segundo) y 6000ms (6 segundos)
  const minDelay = 500;
  const maxDelay = 3000;
  // Fórmula para obtener un número aleatorio entre min y max
  const randomDelay = Math.floor(
    Math.random() * (maxDelay - minDelay + 1) + minDelay
  );

  setTimeout(() => {
    // 1. Enviar el mensaje actual
    const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
    const randomMsg =
      fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
    addMessage(randomUser, randomMsg);

    // 2. Volver a llamarse a sí misma para programar el siguiente
    scheduleNextMessage();
  }, randomDelay);
}

// Iniciar el bucle llamando a la función por primera vez
scheduleNextMessage();

// Función para enviar mensaje del usuario real
function sendUserMessage() {
  const text = chatInput.value.trim();
  if (text) {
    addMessage("Tú", text, true);
    chatInput.value = "";
  }
}

// Permitir enviar con ENTER
chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendUserMessage();
  }
});

const viewerElement = document.getElementById("viewerCount");

let currentViewers = 143;

function updateViewers() {
  const change = Math.floor(Math.random() * 30) - 20;

  currentViewers += change;

  if (currentViewers < 0) currentViewers = 0;

  const formatted = currentViewers.toLocaleString("es-ES");

  viewerElement.textContent = `${formatted} espectadores`;

  const nextDelay = Math.floor(Math.random() * 7000) + 1000;
  setTimeout(updateViewers, nextDelay);
}

updateViewers();
