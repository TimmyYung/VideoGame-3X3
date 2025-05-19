const codeLook = '86d358c9d9c342c08104ee51d705d7c4'; 

const grid = document.getElementById('grid');
const placeholders = [
    "Click to add", "Click to add", "Click to add",
    "Click to add", "Click to add", "Click to add",
    "Click to add", "Click to add", "Click to add"
];

for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = placeholders[i];
    cell.addEventListener('click', handleCellClick);
    grid.appendChild(cell);
}

async function handleCellClick(event) {
    const gameTitle = prompt('Enter video game title:');
    if (!gameTitle) return;

    event.target.textContent = "Searching...";

    try {
        const url = `https://api.rawg.io/api/games?key=${codeLook}&search=${encodeURIComponent(gameTitle)}&page_size=1`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('RAWG API error');

        const data = await response.json();
        const game = data.results[0];

        if (game && game.background_image) {
            event.target.style.backgroundImage = `url(${game.background_image})`;
            event.target.textContent = "";
        } else {
            event.target.style.backgroundImage = "";
            event.target.textContent = "Not found";
            setTimeout(() => {
                event.target.textContent = "Click to add";
            }, 2000);
        }
    } catch (error) {
        console.error('Error fetching game cover:', error);
        event.target.textContent = "Error";
        setTimeout(() => {
            event.target.textContent = "Click to add";
        }, 2000);
    }
}
