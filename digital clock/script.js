function updateClock() {
  const now = new Date(); //date object

  // digital clock
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let seconds = now.getSeconds().toString().padStart(2, "0");
  document.getElementById(
    "clock"
  ).textContent = `${hours}:${minutes}:${seconds}`;

  //date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.getElementById("date").textContent = now.toLocaleDateString(
    "en-US",
    options
  );

  // Analog clock

  // angles of analgo clock rotation
  const hourDeg = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;
  const minuteDeg = now.getMinutes() * 6 + now.getSeconds() * 0.1;
  const secondDeg = now.getSeconds() * 6;

  // applying the dom to rotations
  document.getElementById(
    "hour-hand"
  ).style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
  document.getElementById(
    "minute-hand"
  ).style.transform = `translate(-50%, -100%) rotate(${minuteDeg}deg)`;
  document.getElementById(
    "second-hand"
  ).style.transform = `translate(-50%, -100%) rotate(${secondDeg}deg)`;
}

setInterval(updateClock, 1000);
updateClock();

function toggleTheme() {
  document.body.classList.toggle("light");
}
