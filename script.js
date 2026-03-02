let transactions = JSON.parse(localStorage.getItem("rpTransactions")) || [];

function saveData() {
    localStorage.setItem("rpTransactions", JSON.stringify(transactions));
}

function addTransaction() {
    const name = document.getElementById("name").value;
    const reason = document.getElementById("reason").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (!name || !reason || isNaN(amount)) {
        alert("Fyll ut alle feltene!");
        return;
    }

    const transaction = {
        id: Date.now(),
        name,
        reason,
        amount,
        type,
        date: new Date().toLocaleString()
    };

    transactions.push(transaction);
    saveData();
    updateUI();

    document.getElementById("name").value = "";
    document.getElementById("reason").value = "";
    document.getElementById("amount").value = "";
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveData();
    updateUI();
}

function updateUI() {
    const list = document.getElementById("transactionList");
    list.innerHTML = "";

    let balance = 0;

    transactions.forEach(t => {
        balance += t.type === "inn" ? t.amount : -t.amount;

        const row = `
            <tr>
                <td>${t.name}</td>
                <td>${t.reason}</td>
                <td>${t.amount} kr</td>
                <td class="${t.type}">${t.type === "inn" ? "Innbetaling" : "Utgift"}</td>
                <td>${t.date}</td>
                <td><button onclick="deleteTransaction(${t.id})">❌</button></td>
            </tr>
        `;
        list.innerHTML += row;
    });

    document.getElementById("balance").textContent =
        "Total Balanse: " + balance + " kr";
}

updateUI();