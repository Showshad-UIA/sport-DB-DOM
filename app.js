const allPlayers = () => {
	document.getElementById("player-container").innerHTML = "";
	// input field
	const searchBox = document.getElementById("search-box").value;

	const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchBox}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => showPleayerDetails(data.player));
};

const showPleayerDetails = (players) => {
	for (const player of players) {
		const parent = document.getElementById("player-container");

		// inside parent div create a child div where dinamically insert data

		const div = document.createElement("div");
		div.innerHTML = `	<div class="card border p-5">
    <div class="pro-pic">
        <img  class="w-25" src=" ${player.strThumb}" alt="">
    </div>
    <h2>Name: ${player.strPlayer}</h2>
    <h4>Country: ${player.strNationality}</h4>
    <div class="all-button">
        <button class="btn btn-danger">Delete</button>
        <button onclick="details('${player.idPlayer}')" class="btn btn-success">Details</button>
    </div>

</div>`;
		// push to show the data inside html
		parent.appendChild(div);
	}
};
// data call by ID to see the players details
const details = (id) => {
	const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => setDetails(data.players[0]));
};

const setDetails = (info) => {
	// using condition for showing the male/female
	if (info.strGender == "Male") {
		document.getElementById("male").style.display = "block";
		document.getElementById("female").style.display = "none";
	} else {
		document.getElementById("male").style.display = "none";
		document.getElementById("female").style.display = "block";
	}
	// show the details of the player
	document.getElementById("deatails-container").innerHTML = `
                    <div>            
                    <img  class="w-25" src=" ${info.strThumb}" alt="">
					<h1>Name:${info.strPlayer}</h1>	
					<h1>Country:${info.strNationality}</h1>	
                    <h3>Id: ${info.idPlayer}</h3>
					</div>
 `;
};
