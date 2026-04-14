const journalEntries = [
    {
        log: "August 3, 1492: Logic dictates that by sailing West, we find the East. The symmetry of the globe is absolute.",
        progress: 10,
        rotation: 45
    },
    {
        log: "September 14: The compass needle behaves strangely. A 'Fine Print' error in magnetic north? I must not tell the crew.",
        progress: 40,
        rotation: 120
    },
    {
        log: "October 11: Floating branches and birds. Reality check complete. Land is imminent.",
        progress: 85,
        rotation: 280
    },
    {
        log: "October 12: Land ho! The logic of the voyage has manifested into reality.",
        progress: 100,
        rotation: 360
    }
];

let currentStep = 0;

// UI Elements
const subtitle = document.getElementById('narration-text');
const progressBar = document.getElementById('progress-bar');
const needle = document.getElementById('compass-needle');

// Interaction Logic
document.getElementById('compass-group').addEventListener('click', () => {
    if (currentStep < journalEntries.length) {
        const entry = journalEntries[currentStep];
        
        // Update 3D World
        needle.setAttribute('animation', `property: rotation; to: 0 ${entry.rotation} 0; dur: 1500`);
        
        // Update 2D UI
        progressBar.style.width = entry.progress + "%";
        triggerNarration(entry.log);
        
        currentStep++;
    } else {
        triggerNarration("The voyage is complete. We have reached the New World.");
    }
});

// Logic for reading the logbook specifically
document.getElementById('logbook').addEventListener('click', () => {
    triggerNarration("Logbook entry: " + (currentStep > 0 ? journalEntries[currentStep-1].log : "The voyage hasn't started yet."));
});

// Voice Synthesis (No external assets needed)
function triggerNarration(text) {
    subtitle.innerText = text;
    
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    const speech = new SpeechSynthesisUtterance(text);
    speech.pitch = 0.85; // Lower pitch for authority
    speech.rate = 0.95;
    window.speechSynthesis.speak(speech);
}
