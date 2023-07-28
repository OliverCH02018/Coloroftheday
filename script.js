const searchForm = document.querySelector("#search-form");
const dateInput = document.querySelector("#date-input");
const historyList = document.querySelector("#history-list");
const clearHistoryBtn = document.querySelector("#clear-history");

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
const apiUrl = "https://colors.zoodinkers.com/api";

searchForm.addEventListener("submit", handleColorSearch);

clearHistoryBtn.addEventListener("click", clearSearchHistory);

function handleColorSearch(event) {
  event.preventDefault();

  const date = dateInput.value;
  const url = `${apiUrl}?date=${date}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const search = {
        date: data.date,
        hex: data.hex,
      };
      const existingSearch = searchHistory.find((s) => s.date === search.date);
      if (!existingSearch) {
        searchHistory.push(search);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        updateSearchHistory();
      }
      updateColorDisplay(data.hex, data.date);
    });
}


function clearSearchHistory() {
  searchHistory = [];
  localStorage.removeItem("searchHistory");
  updateSearchHistory();
}


function updateSearchHistory() {
  historyList.innerHTML = "";
  searchHistory.forEach((search) => {
    const searchItem = document.createElement("li");
    searchItem.innerHTML = `<div class="color-swatch" style="background-color: ${search.hex}"></div><p>Hex: ${search.hex}</p><p>Date: ${search.date}</p>`;
    historyList.appendChild(searchItem);
  });
}

updateSearchHistory();
