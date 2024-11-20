const questions = [
    "What is your name?",
    "A train is coming, and you can pull the lever to save one person. On one side is a 12-year-old boy who is suffering from cancer, with a very high chance of dying. On the other side is a 60-year-old man whose body still looks young. Who would you save?",
    "Do you believe in God?",
    "A train is coming, and you can pull the lever to save one person. On one side is a 12-year-old from Pakistan with a bright future ahead for his country, and on the other side is a 25-year-old from India. Who would you save?",
    "Would you do anything for your religion, or would you prioritize humanity more?",
    "If you were given a choice to save one person in a dangerous situation, would you prioritize their race, religion, or personal merit? if not, what would you prioritize?",
    "If you could help make the world a better place, what changes would you make first?",
    "What do you think is more important in life: freedom of thought or the freedom of others?",
    "If you had one wish to come true, what would it be?",
    "What do you want to become in the future? (e.g., Job, career)",
    "Share one of your secrets (This is part of the survey)"
];

let currentQuestionIndex = 0;
const answers = [];

document.getElementById("next-button").addEventListener("click", function() {
    const answer = document.getElementById("answer").value.trim();

    if (answer === "") {
        alert("Please provide an answer.");
        return;
    }

    // Save the answer
    answers.push(answer);

    // Clear the input field
    document.getElementById("answer").value = "";

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        // Update question and number
        updateQuestion();
    } else {
        // Send data and show confirmation
        sendToDiscord();
        document.getElementById("question-container").style.display = "none";
        document.getElementById("confirmation").style.display = "block";
    }
});

function updateQuestion() {
    document.getElementById("question-number").textContent = `Question ${currentQuestionIndex + 1} / 11`;
    document.getElementById("question-text").textContent = questions[currentQuestionIndex];

    // Add highlight class to each question for the background color effect
    document.getElementById("question-text").classList.add("question-highlight");
}

function sendToDiscord() {
    const webhookUrl = "https://discord.com/api/webhooks/1302971459907489833/zqlADy2eEchnQUAtzWq9VBuLZjY9VyBtJoXss8cs_Gm5WnAb8wsYUr7OGfT-M7bOiaez";
    
    const embedData = {
        username: "Kamalsaras's slave",
        embeds: [{
            title: "Survey Responses",
            description: "Here are the responses collected:",
            fields: answers.map((answer, index) => ({
                name: `Question ${index + 1}`,
                value: answer,
                inline: false
            })),
            color: 8388736 // You can change the color to fit your preference
        }]
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(embedData)
    })
    .then(response => response.json())
    .then(data => console.log("Survey results sent to Discord:", data))
    .catch(error => console.error("Error sending data:", error));
}

// Initialize the first question
updateQuestion();
