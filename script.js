// Get references to the color buttons
const colorBoxes = [
    document.getElementById("color1"),
    document.getElementById("color2"),
    document.getElementById("color3"),
    document.getElementById("color4")
  ];
  
  const colorIds = ["color1", "color2", "color3", "color4"]; // IDs of the color buttons
  let sequence = [];  // Holds the sequence of colors to be remembered by the user
  let userSequence = [];  // Holds the user’s guesses
  let score = 0;  // User's score
  
  // Load sound effects
  const flashSound = new Audio('sound/myClick.mp3');  // Adjust path if needed
  const clickSound = new Audio('sound/comClick.wav');  // Adjust path if needed
  const gameOverSound = new Audio('sound/game-over-39-199830.mp3'); //gameoverefound
  
  // Function to flash a color box with sound
  function flashBox(box) {
    const originalColor = box.style.backgroundColor;
  
    box.style.backgroundColor = "white";  // Temporarily change the color to white to flash
    flashSound.play();  // Play flash sound
    setTimeout(() => {
      box.style.backgroundColor = originalColor;  // Revert back to the original color
    }, 300);  // The box flashes for 300ms
  }
  
  // Function to show the sequence to the user
  function showSequence() {
    let i = 0;
    const interval = setInterval(() => {
      const colorId = sequence[i];
      const box = document.getElementById(colorId);
      flashBox(box);
      i++;
      if (i >= sequence.length) clearInterval(interval);  // Stop when the sequence is fully shown
    }, 600);  // 600ms delay between flashes
  }
  
  // Function to add a random color to the sequence
  function addToSequence() {
    const randomColor = colorIds[Math.floor(Math.random() * colorIds.length)];
    sequence.push(randomColor);  // Add the random color to the sequence
    showSequence();  // Show the updated sequence to the user
  }
  
  // Function to start the game
  function startGame() {
    sequence = [];
    userSequence = [];
    score = 0;
    document.getElementById("score").innerText = "Score: 0";  // Reset score display
    addToSequence();  // Start the game by adding the first color to the sequence
  }
  
  // Function to check if the user's answer is correct
  function checkAnswer(index) {
    if (userSequence[index] !== sequence[index]) {
      gameOverSound.play();  // 🔊 Play the game over sound
  
      setTimeout(() => {
        alert("Wrong! Game Over.");
        startGame();  // Reset the game if the answer is wrong
      }, 100); // Small delay to let the sound play before alert
      return;
    }
  
    if (userSequence.length === sequence.length) {
      score++;
      document.getElementById("score").innerText = "Score: " + score;
      userSequence = [];
      setTimeout(addToSequence, 1000);
    }
  }
  
  
  // Event listeners for color boxes
  colorBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      const clickedId = box.id;
      userSequence.push(clickedId);  // Add clicked color to user sequence
      clickSound.play();  // Play click sound
      checkAnswer(userSequence.length - 1);  // Check if the user's answer is correct
    });
  });
  
  // Start the game when the page loads
  window.onload = startGame;
  