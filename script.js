const datesContainer = document.getElementById("dates");
const monthYear = document.getElementById("monthYear");
const img = document.getElementById("monthImage");
const noteInput = document.getElementById("noteInput");

let date = new Date();

/* RANGE + SELECT */
let startDate = null;
let endDate = null;
let selectedDate = null;

/* Images */
const images = [
  "https://cdn.shopify.com/s/files/1/0065/4999/5573/files/snowdrops_1024x1024.png?v=1665726431",
  "https://www.1800flowers.com/blog/wp-content/uploads/2024/01/february-birth-flowers-violets-1.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQomvsWFkq4mCtbI-ukTjGRVNRQW4fQuZtyig&s",
  "https://thursd.com/storage/media/51873/May-birth-flower-lily-of-the-valley-.jpg",
  "https://www.odealarose.com/blog/wp-content/uploads/2025/03/honeysuckle-june-birth-flower-1024x683.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd71Kcwl6AyVwBs-4sKhjaLIQAI9SCDDzqnQ&s",
  "https://www.odealarose.com/blog/wp-content/uploads/2025/03/gladiolus-august-birth-flower-1024x683.jpg",
  "https://www.odealarose.com/blog/wp-content/uploads/2025/03/september-birth-flowers.jpg",
  "https://bouqs.com/blog/wp-content/uploads/2018/10/shutterstock_1459997339-min.jpg",
  "https://i.pinimg.com/originals/81/49/fe/8149fe6bac952df22ff104975b682dad.jpg",
  "https://hips.hearstapps.com/hmg-prod/images/november-birth-flower-mums-peonies-mums-672d665176ae7.jpg?crop=0.665xw:1.00xh;0.144xw,0&resize=980:*",
  "https://bouqs.com/blog/wp-content/uploads/2023/09/shutterstock_1023553387-min-691x550.jpg"
];

/* FORMAT DATE KEY */
function getKey(d) {
  return d.toISOString().split("T")[0];
}

function renderCalendar() {
  datesContainer.innerHTML = "";

  let year = date.getFullYear();
  let month = date.getMonth();

  let firstDay = new Date(year, month, 1).getDay();
  let lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.innerText = date.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  img.src = images[month];

  for (let i = 0; i < firstDay; i++) {
    datesContainer.innerHTML += "<div></div>";
  }

  for (let i = 1; i <= lastDate; i++) {
    let current = new Date(year, month, i);
    let day = current.getDay();

    let div = document.createElement("div");
    div.innerText = i;

    let key = getKey(current);

    /* Day Colors */
    if (day === 0) div.classList.add("sunday");
    else if (day === 6) div.classList.add("saturday");
    else div.classList.add("normal");

    /* RANGE HIGHLIGHT */
    if (startDate && endDate && current >= startDate && current <= endDate) {
      div.style.background = "lightgreen";
    }

    /* SELECTED DATE */
    if (selectedDate && getKey(selectedDate) === key) {
      div.style.border = "2px solid black";
    }

    /* CLICK EVENT */
    div.onclick = () => {

      /* RANGE LOGIC */
      if (!startDate) {
        startDate = current;
      } else if (!endDate) {
        endDate = current;
      } else {
        startDate = current;
        endDate = null;
      }

      /* SELECT DATE */
      selectedDate = current;

      /* LOAD NOTE */
      noteInput.value = localStorage.getItem(key) || "";

      renderCalendar();
    };

    datesContainer.appendChild(div);
  }
}

/* SAVE NOTE PER DATE */
function saveNote() {
  if (!selectedDate) {
    alert("Select a date first!");
    return;
  }

  let key = getKey(selectedDate);
  localStorage.setItem(key, noteInput.value);

  alert("Note saved for " + key);
}

/* NAVIGATION */
document.getElementById("next").onclick = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

document.getElementById("prev").onclick = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};

/* DARK MODE */
document.getElementById("toggleTheme").onclick = () => {
  document.body.classList.toggle("dark");

  localStorage.setItem("theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
};

/* LOAD */
window.onload = () => {
  renderCalendar();

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
};