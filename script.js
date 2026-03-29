let debts = JSON.parse(localStorage.getItem("debts")) || [];

function save() {
  localStorage.setItem("debts", JSON.stringify(debts));
}

function render() {
  const list = document.getElementById("debtList");
  list.innerHTML = "";

  // Сортировка по срочности (меньше дней сначала)
  debts.sort((a,b) => getDaysLeft(a.dueDate) - getDaysLeft(b.dueDate));

  debts.forEach((debt, index) => {
    const li = document.createElement("li");

    const daysLeft = getDaysLeft(debt.dueDate);
    let color = "green";
    if (daysLeft <= 20 && daysLeft >= 7) color = "orange";
    if (daysLeft < 7) color = "red";

    const info = document.createElement("span");
    info.innerHTML = `<strong>${debt.card}</strong> — ${debt.amount}₽ — до ${debt.dueDate} (${daysLeft} дн.)`;
    info.style.color = color;
    if (debt.done) info.classList.add("done");

    const actions = document.createElement("div");
    actions.className = "actions";

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✓";
    doneBtn.className = "small-btn";
    doneBtn.onclick = () => toggleDone(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.className = "small-btn";
    delBtn.onclick = () => deleteDebt(index);

    actions.appendChild(doneBtn);
    actions.appendChild(delBtn);

    li.appendChild(info);
    li.appendChild(actions);

    list.appendChild(li);
  });
}

function getDaysLeft(due) {
  const today = new Date();
  const dueDate = new Date(due);
  const diffTime = dueDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function addDebt() {
  const card = document.getElementById("cardName").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const purchaseDate = document.getElementById("purchaseDate").value;
  const period = parseInt(document.getElementById("period").value);

  if (!card || !amount || !purchaseDate || !period) return;

  const purchase = new Date(purchaseDate);
  const dueDate = new Date(purchase.getTime() + period*24*60*60*1000)
      .toISOString().split("T")[0];

  debts.push({ card, amount, purchaseDate, period, dueDate, done: false });

  document.getElementById("cardName").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("purchaseDate").value = "";
  document.getElementById("period").value = "";

  save();
  render();
}

function toggleDone(index) {
  debts[index].done = !debts[index].done;
  save();
  render();
}

function deleteDebt(index) {
  if (confirm("Удалить запись?")) {
    debts.splice(index, 1);
    save();
    render();
  }
}

// Enter для добавления
["cardName","amount","purchaseDate","period"].forEach(id => {
  document.getElementById(id).addEventListener("keydown", e => {
    if (e.key === "Enter") addDebt();
  });
});

render();
