// === Навигация ===
function showPage(p){
document.getElementById('cards-page').classList.toggle('hidden',p!=='cards');
document.getElementById('subs-page').classList.toggle('hidden',p!=='subs');
}

// === Данные ===
let cards=JSON.parse(localStorage.getItem("cards"))||[];
let subs=JSON.parse(localStorage.getItem("subs"))||[];

// === Кредитки ===
function saveCards(){ localStorage.setItem("cards",JSON.stringify(cards)); }

function addCard(){
const name=document.getElementById("cardName").value.trim();
const debt=+document.getElementById("amount").value;
const limit=+document.getElementById("limit").value;
const dueDate=document.getElementById("dueDate").value;

if(!name||!debt||!limit||!dueDate) return;

cards.push({name,debt,limit,dueDate});
saveCards();
renderCards();
}

function renderCards(){
const list=document.getElementById("cardList");
list.innerHTML="";
cards.forEach((c,i)=>{
const div=document.createElement("div");
div.className="card";
div.innerHTML=`
<span>${c.name}</span>
<div class="card-buttons">
<button onclick="editCard(${i})">✎</button>
<button onclick="deleteCard(${i})">✕</button>
</div>`;
list.appendChild(div);
});
}

function deleteCard(i){
cards.splice(i,1);
saveCards();
renderCards();
}

// === Подписки ===
function saveSubs(){ localStorage.setItem("subs",JSON.stringify(subs)); }

function addSub(){
const name=document.getElementById("subName").value.trim();
const price=+document.getElementById("subPrice").value;
const date=document.getElementById("subDate").value;

if(!name||!price||!date) return;

subs.push({name,price,date});
saveSubs();
renderSubs();
}

function renderSubs(){
const list=document.getElementById("subList");
list.innerHTML="";
subs.forEach((s,i)=>{
const li=document.createElement("li");
li.innerHTML=`
<span>${s.name}</span>
<div class="card-buttons">
<button onclick="deleteSub(${i})">✕</button>
</div>`;
list.appendChild(li);
});
}

function deleteSub(i){
subs.splice(i,1);
saveSubs();
renderSubs();
}

// старт
renderCards();
renderSubs();