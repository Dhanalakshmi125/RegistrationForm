document.addEventListener('DOMContentLoaded', function() {
    const modeForm = document.getElementById('modeForm');

    modeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedMode = document.querySelector('input[name="examMode"]:checked');

        if (selectedMode) {
            localStorage.setItem('examMode', selectedMode.value);
            window.location.href = 'exam-details.html';
        } else {
            alert('Please select an exam mode.');
        }
    });
});
