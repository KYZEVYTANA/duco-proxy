const PROXY = "https://duco-proxy.onrender.com"; // твой сервер-прокси

// функция загрузки данных по логину
async function loadData() {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Введите логин DuinoCoin");
        return;
    }

    try {
        const res = await fetch(`${PROXY}/duco/${username}`);
        const data = await res.json();

        if (!data.success) {
            alert("Ошибка загрузки данных");
            return;
        }

        // баланс
        const user = data.result.balance;
        document.getElementById("balance").innerText = user.balance.toFixed(2);

        // список майнеров
        const miners = data.result.miners;
        const minersTable = document.getElementById("miners");
        minersTable.innerHTML = ""; // очистим перед обновлением

        miners.forEach(miner => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${miner.identifier}</td>
                <td>${miner.software}</td>
                <td>${miner.hashrate}</td>
                <td>${miner.accepted}</td>
                <td>${miner.rejected}</td>
                <td>${miner.lastShare}</td>
            `;
            minersTable.appendChild(row);
        });

    } catch (err) {
        console.error("Ошибка:", err);
        alert("Ошибка соединения с сервером");
    }
}

// автообновление каждые 5 секунд
setInterval(loadData, 5000);
