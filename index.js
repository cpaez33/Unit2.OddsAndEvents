// === State ===

let bank = [];
let odds = [];
let evens = [];

function addNumToBank(num) {
  //   console.log(num);
  bank.push(num);
  render();
}

function numSort() {
  const number = bank.shift();
  if (number % 2 === 0) {
    evens.push(number);
  } else {
    odds.push(number);
  }
}

function sortOne() {
  numSort();
  render();
}

function sortAll() {
  while (bank.length) {
    numSort();
  }
  render();
}

// === Components ===
function userNumberInput() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
        Add a number to the bank
        <input name="count" type="number" />
    </label>
    <button value="add">Add number</button>
    <button value="sort-1">Sort 1</button>
    <button value="sort-all">Sort All</button>
    `;
  $form.addEventListener("submit", function (e) {
    e.preventDefault();
    const action = e.submitter.value;
    if (action === "add") {
      const data = new FormData($form);
      const number = data.get("count");
      if (number === "") return;
      // const num = document.querySelector("input[name='count']").value;
      addNumToBank(+number);
    } else if (action === "sort-1") {
      sortOne();
    } else if (action === "sort-all") {
      sortAll();
    }
  });
  return $form;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
      <h1>Odds and Events</h1>
      <form></form>
      <h2>Bank<h2>
      <input id="bank-number-box" type="text" readonly />
      <h2>Odds</h2>
      <input id="odds-box" type="text" readonly />
      <h2>Evens</h2>
      <input id="evens-box" type="text" readonly />
    `;
  $app.querySelector("form").replaceWith(userNumberInput());
  $app.querySelector("#bank-number-box").value = bank.join(" ");
  $app.querySelector("#odds-box").value = odds.join(" ");
  $app.querySelector("#evens-box").value = evens.join(" ");
}
render();
