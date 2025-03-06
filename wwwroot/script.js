// Global variables for players
const positionEnum = {
    0: "Vratar",
    1: "Branič",
    2: "Veznjak",
    3: "Napadač"
};
let editingPlayerId = null;
let currentPlayersData = {};

// Global variables for clubs
let editingClubId = null;
let currentClubsData = {};

// Global variables for matches
let editingMatchId = null;
let currentMatchesData = {};

document.addEventListener("DOMContentLoaded", function () {
    // Page detection based on specific element IDs

    // Matches listing page (index.html)
    if (document.getElementById("matchesTable")) {
        loadMatches();
        document.getElementById("filterButton").addEventListener("click", filterMatches);
    }

    // Clubs management page
    if (document.getElementById("clubsTable")) {
        loadClubs();
        document.getElementById("clubForm").addEventListener("submit", function (e) {
            e.preventDefault();
            addClub();
        });
        document.getElementById("cancelClubEdit").addEventListener("click", function () {
            editingClubId = null;
            document.getElementById("clubForm").reset();
            document.querySelector("#clubForm button[type='submit']").innerText = "Dodaj Klub";
            document.getElementById("cancelClubEdit").style.display = "none";
        });
    }

    // Players management page
    if (document.getElementById("playersTable")) {
        loadPlayers();
        populateClubDropdown();
        document.getElementById("playerForm").addEventListener("submit", function (e) {
            e.preventDefault();
            addPlayer();
        });
        document.getElementById("cancelEdit").addEventListener("click", function () {
            editingPlayerId = null;
            document.getElementById("playerForm").reset();
            document.querySelector("#playerForm button[type='submit']").innerText = "Dodaj Igrača";
            document.getElementById("cancelEdit").style.display = "none";
        });
    }

    // Matches management page (manageMatches.html)
    if (document.getElementById("matchesManageTable")) {
        loadMatchesManagement();
        populateClubsDropdownForMatches();
        document.getElementById("matchForm").addEventListener("submit", function (e) {
            e.preventDefault();
            addMatch();
        });
        document.getElementById("cancelMatchEdit").addEventListener("click", function () {
            editingMatchId = null;
            document.getElementById("matchForm").reset();
            document.querySelector("#matchForm button[type='submit']").innerText = "Dodaj Utakmicu";
            document.getElementById("cancelMatchEdit").style.display = "none";
        });
    }
});

/* --------- Matches Listing Functions (index.html) --------- */
async function loadMatches() {
    try {
        const response = await fetch("/api/match");
        const matches = await response.json();
        const tbody = document.querySelector("#matchesTable tbody");
        tbody.innerHTML = "";
        matches.forEach(match => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${match.id}</td>
                            <td>${new Date(match.date).toLocaleString("hr-HR")}</td>
                            <td>${match.home_TeamName || match.home_Team}</td>
                            <td>${match.away_TeamName || match.away_Team}</td>
                            <td>${match.home_Pts}</td>
                            <td>${match.away_Pts}</td>`;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Greška pri učitavanju utakmica:", error);
    }
}

async function filterMatches() {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    try {
        const response = await fetch("/api/match");
        let matches = await response.json();
        if (startDate) {
            const start = new Date(startDate);
            matches = matches.filter(m => new Date(m.date) >= start);
        }
        if (endDate) {
            const end = new Date(endDate);
            matches = matches.filter(m => new Date(m.date) <= end);
        }
        const tbody = document.querySelector("#matchesTable tbody");
        tbody.innerHTML = "";
        matches.forEach(match => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${match.id}</td>
                            <td>${new Date(match.date).toLocaleString("hr-HR")}</td>
                            <td>${match.home_TeamName || match.home_Team}</td>
                            <td>${match.away_TeamName || match.away_Team}</td>
                            <td>${match.home_Pts}</td>
                            <td>${match.away_Pts}</td>`;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Greška pri filtriranju utakmica:", error);
    }
}

/* --------- Clubs Functions --------- */
async function loadClubs() {
    try {
        const response = await fetch("/api/club");
        const clubs = await response.json();
        const tbody = document.querySelector("#clubsTable tbody");
        tbody.innerHTML = "";
        currentClubsData = {};
        clubs.forEach(club => {
            currentClubsData[club.id] = club;
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${club.id}</td>
                            <td>${club.name}</td>
                            <td>${club.stadium}</td>
                            <td>${new Date(club.established_At).toLocaleDateString("hr-HR")}</td>
                            <td>
                                <button onclick="editClub(${club.id})">Uredi</button>
                                <button onclick="deleteClub(${club.id})">Obriši</button>
                            </td>`;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Greška pri učitavanju klubova:", error);
    }
}

async function addClub() {
    const name = document.getElementById("clubName").value;
    const stadium = document.getElementById("stadium").value;
    const established = document.getElementById("established").value;
    const club = {
        name: name,
        stadium: stadium,
        established_At: established
    };
    try {
        let response;
        if (editingClubId) {
            response = await fetch(`/api/club/${editingClubId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(club)
            });
            editingClubId = null;
            document.querySelector("#clubForm button[type='submit']").innerText = "Dodaj Klub";
            document.getElementById("cancelClubEdit").style.display = "none";
        } else {
            response = await fetch("/api/club", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(club)
            });
        }
        if (response.ok) {
            loadClubs();
            document.getElementById("clubForm").reset();
        } else {
            console.error("Greška pri spremanju kluba.");
        }
    } catch (error) {
        console.error("Greška pri spremanju kluba:", error);
    }
}

function editClub(id) {
    const club = currentClubsData[id];
    if (club) {
        editingClubId = id;
        document.getElementById("clubName").value = club.name;
        document.getElementById("stadium").value = club.stadium;
        // Format date as YYYY-MM-DD for the input
        const establishedDate = new Date(club.established_At).toISOString().split("T")[0];
        document.getElementById("established").value = establishedDate;
        document.querySelector("#clubForm button[type='submit']").innerText = "Spremi";
        document.getElementById("cancelClubEdit").style.display = "inline-block";
    }
}

async function deleteClub(id) {
    try {
        const response = await fetch(`/api/club/${id}`, { method: "DELETE" });
        if (response.ok) {
            loadClubs();
        }
    } catch (error) {
        console.error("Greška pri brisanju kluba:", error);
    }
}

/* --------- Players Functions --------- */
async function loadPlayers() {
    try {
        const response = await fetch("/api/player");
        const players = await response.json();
        const tbody = document.querySelector("#playersTable tbody");
        tbody.innerHTML = "";
        currentPlayersData = {};
        players.forEach(player => {
            currentPlayersData[player.id] = player;
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${player.id}</td>
                            <td>${player.name}</td>
                            <td>${player.surname}</td>
                            <td>${player.oib}</td>
                            <td>${player.country}</td>
                            <td>${positionEnum[player.position] || player.position}</td>
                            <td>${player.value}</td>
                            <td>${player.clubName || player.club_Id}</td>
                            <td>
                                <button onclick="editPlayer(${player.id})">Uredi</button>
                                <button onclick="deletePlayer(${player.id})">Obriši</button>
                            </td>`;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Greška pri učitavanju igrača:", error);
    }
}

async function addPlayer() {
    const name = document.getElementById("playerName").value;
    const surname = document.getElementById("playerSurname").value;
    const oib = document.getElementById("playerOIB").value;
    const country = document.getElementById("playerCountry").value;
    const position = parseInt(document.getElementById("playerPosition").value);
    const value = parseFloat(document.getElementById("playerValue").value);
    const clubId = parseInt(document.getElementById("playerClub").value);
    const player = {
        name: name,
        surname: surname,
        oib: oib,
        country: country,
        position: position,
        value: value,
        club_Id: clubId
    };
    try {
        let response;
        if (editingPlayerId) {
            response = await fetch(`/api/player/${editingPlayerId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(player)
            });
            editingPlayerId = null;
            document.querySelector("#playerForm button[type='submit']").innerText = "Dodaj Igrača";
            document.getElementById("cancelEdit").style.display = "none";
        } else {
            response = await fetch("/api/player", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(player)
            });
        }
        if (response.ok) {
            loadPlayers();
            document.getElementById("playerForm").reset();
        } else {
            console.error("Greška pri spremanju igrača.");
        }
    } catch (error) {
        console.error("Greška pri spremanju igrača:", error);
    }
}

function editPlayer(id) {
    const player = currentPlayersData[id];
    if (player) {
        editingPlayerId = id;
        document.getElementById("playerName").value = player.name;
        document.getElementById("playerSurname").value = player.surname;
        document.getElementById("playerOIB").value = player.oib;
        document.getElementById("playerCountry").value = player.country;
        document.getElementById("playerPosition").value = player.position;
        document.getElementById("playerValue").value = player.value;
        document.getElementById("playerClub").value = player.club_Id;
        document.querySelector("#playerForm button[type='submit']").innerText = "Spremi";
        document.getElementById("cancelEdit").style.display = "inline-block";
    }
}

async function deletePlayer(id) {
    try {
        const response = await fetch(`/api/player/${id}`, { method: "DELETE" });
        if (response.ok) {
            loadPlayers();
        }
    } catch (error) {
        console.error("Greška pri brisanju igrača:", error);
    }
}

async function populateClubDropdown() {
    try {
        const response = await fetch("/api/club");
        const clubs = await response.json();
        const dropdown = document.getElementById("playerClub");
        dropdown.innerHTML = '<option value="">Odaberi klub</option>';
        clubs.forEach(club => {
            const option = document.createElement("option");
            option.value = club.id;
            option.textContent = club.name;
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error("Greška pri učitavanju klubova za dropdown:", error);
    }
}

/* --------- Matches Management Functions (manageMatches.html) --------- */
async function loadMatchesManagement() {
    try {
        const response = await fetch("/api/match");
        const matches = await response.json();
        const tbody = document.querySelector("#matchesManageTable tbody");
        tbody.innerHTML = "";
        currentMatchesData = {};
        matches.forEach(match => {
            currentMatchesData[match.id] = match;
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${match.id}</td>
                            <td>${new Date(match.date).toLocaleString("hr-HR")}</td>
                            <td>${match.home_TeamName || match.home_Team}</td>
                            <td>${match.away_TeamName || match.away_Team}</td>
                            <td>${match.home_Pts}</td>
                            <td>${match.away_Pts}</td>
                            <td>
                                <button onclick="editMatch(${match.id})">Uredi</button>
                                <button onclick="deleteMatch(${match.id})">Obriši</button>
                            </td>`;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Greška pri učitavanju utakmica za upravljanje:", error);
    }
}

async function addMatch() {
    // Read form values
    const date = document.getElementById("matchDate").value;
    const homeTeam = parseInt(document.getElementById("homeTeam").value);
    const awayTeam = parseInt(document.getElementById("awayTeam").value);
    const homePts = parseInt(document.getElementById("homePts").value);
    const awayPts = parseInt(document.getElementById("awayPts").value);
    const match = {
        date: date,
        home_Team: homeTeam,
        away_Team: awayTeam,
        home_Pts: homePts,
        away_Pts: awayPts
    };
    try {
        let response;
        if (editingMatchId) {
            response = await fetch(`/api/match/${editingMatchId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(match)
            });
            editingMatchId = null;
            document.querySelector("#matchForm button[type='submit']").innerText = "Dodaj Utakmicu";
            document.getElementById("cancelMatchEdit").style.display = "none";
        } else {
            response = await fetch("/api/match", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(match)
            });
        }
        if (response.ok) {
            loadMatchesManagement();
            document.getElementById("matchForm").reset();
        } else {
            console.error("Greška pri spremanju utakmice.");
        }
    } catch (error) {
        console.error("Greška pri spremanju utakmice:", error);
    }
}

function editMatch(id) {
    const match = currentMatchesData[id];
    if (match) {
        editingMatchId = id;
        // Populate form fields
        // Convert date to proper format for datetime-local input (ISO string without seconds)
        const dateTimeLocal = new Date(match.date).toISOString().slice(0, 16);
        document.getElementById("matchDate").value = dateTimeLocal;
        document.getElementById("homeTeam").value = match.home_Team;
        document.getElementById("awayTeam").value = match.away_Team;
        document.getElementById("homePts").value = match.home_Pts;
        document.getElementById("awayPts").value = match.away_Pts;
        document.querySelector("#matchForm button[type='submit']").innerText = "Spremi";
        document.getElementById("cancelMatchEdit").style.display = "inline-block";
    }
}

async function deleteMatch(id) {
    try {
        const response = await fetch(`/api/match/${id}`, { method: "DELETE" });
        if (response.ok) {
            loadMatchesManagement();
        }
    } catch (error) {
        console.error("Greška pri brisanju utakmice:", error);
    }
}

async function populateClubsDropdownForMatches() {
    try {
        const response = await fetch("/api/club");
        const clubs = await response.json();
        // Populate Home Team dropdown
        const homeDropdown = document.getElementById("homeTeam");
        homeDropdown.innerHTML = '<option value="">Odaberi domaćina</option>';
        // Populate Away Team dropdown
        const awayDropdown = document.getElementById("awayTeam");
        awayDropdown.innerHTML = '<option value="">Odaberi gosta</option>';
        clubs.forEach(club => {
            const option1 = document.createElement("option");
            option1.value = club.id;
            option1.textContent = club.name;
            homeDropdown.appendChild(option1);

            const option2 = document.createElement("option");
            option2.value = club.id;
            option2.textContent = club.name;
            awayDropdown.appendChild(option2);
        });
    } catch (error) {
        console.error("Greška pri učitavanju klubova za utakmice:", error);
    }
}
