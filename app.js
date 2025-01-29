document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const boxes = document.querySelectorAll(".box");
    const resetBtn = document.querySelector("#resetbtn");
    const newGameBtn = document.querySelector("#newbtn");
    const msg = document.querySelector("#msgBtn");
    const msgContainer = document.querySelector(".msg-container");

    if (!msg || !msgContainer) {
        console.error("Error: DOM elements with IDs 'msg' or 'msg-container' not found.");
        return;
    }

    // Initialize game variables
    let turn0 = true; // True for "0", false for "X"
    let gameActive = true;

    // Winning patterns
    const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];


     
    // Add click event listeners to boxes
    boxes.forEach((box) => {
        box.addEventListener("click", () => handleBoxClick(box));
    });

    // Handle box click
    const handleBoxClick = (box) => {
        if (!gameActive || box.innerText !== "") return; // Ignore invalid clicks

        box.innerText = turn0 ? "0" : "X"; // Mark the box
        box.disabled = true; // Disable further clicks
        turn0 = !turn0; // Switch turn

        checkWinner(); // Check for winner or draw
    };
    
     const enableboxes = () => {
        for( let box of boxes){
            box.disabled = true;
            box.innerText = "";
        }
     }
    // Check for a winner or a draw
    const checkWinner = () => {
        // Check winning patterns
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                boxes[a].innerText !== "" &&
                boxes[a].innerText === boxes[b].innerText &&
                boxes[a].innerText === boxes[c].innerText
            ) {
                showWinner(boxes[a].innerText); // Declare winner
                return;
            }
        }

        // Check for a draw
        if (Array.from(boxes).every((box) => box.innerText !== "")) {
            showDraw(); // Declare draw
        }
    };

    // Display the winner
    const showWinner = (winner) => {
        msg.innerText = `Congratulations, the winner is ${winner}!`;
        msgContainer.classList.remove("hide");
        gameActive = false; // End the game
    };

    // Display a draw message
    const showDraw = () => {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        gameActive = false; // End the game
    };

    // Reset the game board
    const resetGame = () => {
        boxes.forEach((box) => {
            box.innerText = ""; // Clear box text
            box.disabled = false; // Enable clicking
        });
        msgContainer.classList.add("hide"); // Hide message
        turn0 = true; // Reset turn
        gameActive = true; // Reactivate game
    };

    // Add event listeners to reset and new game buttons
    resetBtn.addEventListener("click", resetGame);
    newGameBtn.addEventListener("click", resetGame);
});
