// --- VIDEO HLS ---
var video = document.getElementById("video");
var liveBadge = document.getElementById("liveBadge");
var videoSrc = "/hls/graduacion.m3u8";

if (Hls.isSupported()) {
  var hls = new Hls();
  hls.loadSource(videoSrc);
  hls.attachMedia(video);

  hls.on(Hls.Events.MANIFEST_PARSED, function () {
    liveBadge.textContent = "EN DIRECTO";
    liveBadge.classList.add("active");
    video.play().catch(() => {});
  });

  hls.on(Hls.Events.ERROR, function (evt, data) {
    if (data.fatal) {
      liveBadge.textContent = "Reconectando…";
      switch (data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          hls.startLoad();
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          hls.recoverMediaError();
          break;
        default:
          hls.destroy();
          break;
      }
    }
  });
} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
  video.src = videoSrc;
  video.addEventListener("loadedmetadata", function () {
    liveBadge.textContent = "EN DIRECTO";
    liveBadge.classList.add("active");
    video.play();
  });
}

// --- CHAT SIMULADO ---
const chatArea = document.getElementById("chatArea");
const chatInput = document.getElementById("chatInput");

const userColors = [
  "#ff0000",
  "#00ff00",
  "#e91916",
  "#9146FF",
  "#1E90FF",
  "#FF69B4",
];

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

  div.innerHTML =
    `<span class="chat-user" style="color:${color}">${user}:</span>` +
    ` <span style="color: #efeff1;">${text}</span>`;

  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function scheduleNextMessage() {
  const randomDelay = Math.floor(Math.random() * (3000 - 500 + 1) + 500);

  setTimeout(() => {
    const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
    const randomMsg =
      fakeMessages[Math.floor(Math.random() * fakeMessages.length)];

    addMessage(randomUser, randomMsg);
    scheduleNextMessage();
  }, randomDelay);
}

scheduleNextMessage();

function sendUserMessage() {
  const text = chatInput.value.trim();
  if (text) {
    addMessage("Tú", text, true);
    chatInput.value = "";
  }
}

chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendUserMessage();
});

// --- VIEWERS ---
const viewerElement = document.getElementById("viewerCount");
let currentViewers = 143;

function updateViewers() {
  const change = Math.floor(Math.random() * 30) - 20;
  currentViewers += change;
  if (currentViewers < 0) currentViewers = 0;

  viewerElement.textContent = `${currentViewers.toLocaleString(
    "es-ES"
  )} espectadores`;

  const nextDelay = Math.floor(Math.random() * 7000) + 1000;
  setTimeout(updateViewers, nextDelay);
}

updateViewers();
