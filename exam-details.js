document.addEventListener('DOMContentLoaded', function() {
    const examContainer = document.getElementById('examContainer');
    const questionText = document.getElementById('questionText');
    const essayText = document.getElementById('essayText');
    const wordCount = document.getElementById('wordCount');
    const timerDisplay = document.getElementById('timer');
    const warningMessage = document.getElementById('warningMessage');

    const essayQuestions = {
        easy: [
            "Describe your favorite childhood memory.",
            "What are the benefits of exercise?",
            "Explain why you like your favorite hobby.",
            "Discuss the importance of family.",
            "What is your favorite book and why?"
        ],
        moderate: [
            "How does technology affect our daily lives?",
            "Discuss the impact of social media on communication.",
            "What are the challenges of climate change?",
            "Describe the advantages and disadvantages of online education.",
            "How can we improve mental health awareness in schools?"
        ],
        hard: [
            "Analyze the effects of globalization on local cultures.",
            "Discuss the role of government in managing economic crises.",
            "How does artificial intelligence impact the job market?",
            "Evaluate the significance of space exploration for humanity.",
            "What are the ethical implications of genetic engineering?"
        ]
    };

    // Retrieve the selected mode from localStorage
    const mode = localStorage.getItem('examMode');
    if (!mode) {
        alert('No exam mode selected. Redirecting to the registration page.');
        window.location.href = 'registration.html';
        return;
    }

    // Populate the essay question and start the timer based on the mode
    const questions = essayQuestions[mode];
    const question = questions[Math.floor(Math.random() * questions.length)];
    questionText.textContent = question;
    examContainer.style.display = 'block';

    const timeLimits = {
        easy: 5 * 60, // 5 minutes
        moderate: 10 * 60, // 10 minutes
        hard: 15 * 60 // 15 minutes
    };

    const timeLimit = timeLimits[mode];
    let timerInterval;

    function startTimer() {
        const endTime = Date.now() + timeLimit * 1000;

        timerInterval = setInterval(function() {
            const remainingTime = Math.max(0, endTime - Date.now());
            if (remainingTime === 0) {
                clearInterval(timerInterval);
                submitEssay();
            } else {
                const minutes = Math.floor(remainingTime / 60000);
                const seconds = Math.floor((remainingTime % 60000) / 1000);
                timerDisplay.textContent = `Time remaining: ${minutes}m ${seconds}s`;

                // Non-blocking warning
                if (remainingTime <= 2 * 60 * 1000 && !warningMessage.classList.contains('visible')) {
                    warningMessage.classList.add('visible');
                    warningMessage.textContent = `Warning: Less than 2 minutes remaining! Time left: ${minutes}m ${seconds}s`;
                }
            }
        }, 1000);
    }

    function updateWordCount() {
        const text = essayText.value;
        const words = text.match(/\b\w+\b/g) || [];
        const wordCountValue = words.length;
        let minWords, maxWords;

        if (mode === 'easy') {
            minWords = 100;
            maxWords = 150;
        } else if (mode === 'moderate') {
            minWords = 150;
            maxWords = 200;
        } else if (mode === 'hard') {
            minWords = 200;
            maxWords = 250;
        }

        const remainingWords = maxWords - wordCountValue;
        let displayText = `Word Count: ${wordCountValue}/${maxWords}. Remaining words: ${remainingWords}`;

        if (wordCountValue > maxWords) {
            const excessText = text.split(/\s+/).slice(maxWords).join(' ');
            displayText += ` <span style="color: red;">(${excessText})</span>`;
        }

        wordCount.innerHTML = displayText;
    }

    essayText.addEventListener('input', updateWordCount);
    startTimer();

    function submitEssay() {
        clearInterval(timerInterval);
        essayText.disabled = true;
        const text = essayText.value;
        questionText.innerHTML += `<br><br>Your essay: ${text}`;
        warningMessage.textContent = ''; // Clear the warning message
        // Here you can also submit the essay to a server if needed
    }
});
