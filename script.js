let cards = JSON.parse(localStorage.getItem("cards")) || [];
let currentEdit = null;

const cardName = document.getElementById("cardName");
const amountInput = document.getElementById("amount");
const limitInput = document.getElementById("limit");
const dueDateInput = document.getElementById("dueDate");

const editAmount = document.getElementById("editAmount");
const editLimit = document.getElementById("editLimit");
const editDueDate = document.getElementById("editDueDate");
const modal = document.getElementById("modal");

function save(){
  localStorage.setItem("cards", JSON.stringify(cards));
}

function calcDaysLeft(date){
  const today = new Date();
  const due = new Date(date);
  const diff = Math.ceil((due-today)/(1000*60*60*24));
  return diff;
}

function addCard(){
  const name = cardName.value.trim();
  const debt = +amountInput.value;
  const limit = +limitInput.value;
  const dueDate = dueDateInput.value;

  if(!name||!debt||!limit||!dueDate) return;

  cards.push({name,debt,limit,dueDate});
  clearInputs();
  save();
  render();
}

function clearInputs(){
  cardName.value="";
  amountInput.value="";
  limitInput.value="";
  dueDateInput.value="";
}

function editCard(i){
  currentEdit=i;
  const c = cards[i];
  editAmount.value=c.debt;
  editLimit.value=c.limit;
  editDueDate.value=c.dueDate;
  modal.classList.remove("hidden");
}

function saveEdit(){
  const c = cards[currentEdit];
  c.debt = +editAmount.value;
  c.limit = +editLimit.value;
  c.dueDate = editDueDate.value;
  modal.classList.add("hidden");
  save();
  render();
}

function markPaid(i){
  cards[i].debt = 0;
  save();
  render();
}

function deleteCard(i){
  cards.splice(i,1);
  save();
  render();
}

function getColor(days){
  if(days>21) return "green";
  if(days>=7) return "orange";
  if(days>0) return "red";
  return "black";
}

function render(){
  const list = document.getElementById("cardList");
  list.innerHTML="";
  let totalDebt=0, totalLimit=0;

  cards.forEach((c,i)=>{
    const daysLeft = calcDaysLeft(c.dueDate);
    totalDebt += c.debt;
    totalLimit += c.limit;

    const cardDiv = document.createElement("div");
    cardDiv.className="card";

    const header = document.createElement("div");
    header.className="card-header";

    header.innerHTML = `<strong>${c.name}</strong> | ${daysLeft} дн. | ${c.debt} ₽`;

    const btns = document.createElement("div");
    btns.innerHTML = `<button onclick="editCard(${i})">✎</button>
                      <button onclick="markPaid(${i})">✔</button>
                      <button onclick="deleteCard(${i})">✕</button>`;

    header.appendChild(btns);
    cardDiv.appendChild(header);

    // прогресс бар
    const prog = document.createElement("div");
    prog.className="progress";
    const fill = document.createElement("div");
    fill.className="progress-fill";
    fill.style.width = `${Math.min(c.debt/c.limit*100,100)}%`;
    fill.style.background = getColor(daysLeft);
    prog.appendChild(fill);

    cardDiv.appendChild(prog);
    list.appendChild(cardDiv);
  });

  document.getElementById("totalDebt").textContent=`Общий долг: ${totalDebt} ₽`;
  document.getElementById("totalFree").textContent=`Остаток по кредиткам: ${totalLimit-totalDebt} ₽`;
}

// уведомления
function requestNotificationPermission(){
  if(Notification.permission!=="granted") Notification.requestPermission();
}

function checkNotifications(){
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  if(hours===16 && minutes===0){
    cards.forEach(c=>{
      const days = calcDaysLeft(c.dueDate);
      if(days<=7 && days>0){
        new Notification(`Погаси кредитку: ${c.name}`, {body:`Осталось ${days} дней`});
      }
    });
  }
}

// проверка каждую минуту
setInterval(checkNotifications,60000);

// пересчёт дней в 00:00
setInterval(render,60000);

requestNotificationPermission();

// Enter для добавления
[cardName, amountInput, limitInput, dueDateInput].forEach(el=>{
  el.addEventListener("keydown", e=>{
    if(e.key==="Enter") addCard();
  });
});

render();
