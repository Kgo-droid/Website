const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// ==========================================
// 2. THE ABOUT MODAL LOGIC
// ==========================================
const aboutBtn = document.getElementById('about-btn');
const aboutModal = document.getElementById('about-modal');
const closeModal = document.getElementById('close-modal');

// Open the modal when "About" is clicked
aboutBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Stops the screen from jumping to the top
    aboutModal.classList.add('show');
});

// Close the modal when clicking the invisible [X] button
closeModal.addEventListener('click', () => {
    aboutModal.classList.remove('show');
});

// Close the modal if the user clicks anywhere on the blurred background
window.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
        aboutModal.classList.remove('show');
    }
});
const linksBtn = document.getElementById('links-btn');
const linksModal = document.getElementById('links-modal');
const closeLinksBtn = document.querySelector('.close-links');

// Open the Links Modal when the Links menu button is clicked
linksBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Stops the page from jumping to the top
    linksModal.classList.add('show');
});

// Close the Modal when the X is clicked
closeLinksBtn.addEventListener('click', () => {
    linksModal.classList.remove('show');
});

// Close the Modal if you click anywhere in the empty dark space
linksModal.addEventListener('click', (e) => {
    if (e.target === linksModal) {
        linksModal.classList.remove('show');
    }
});

const faqBtn = document.getElementById('faq-btn');
const faqModal = document.getElementById('faq-modal');
const closeFaqBtn = document.getElementById('close-faq');

// Open the Modal
faqBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    faqModal.classList.add('show');
});

// Close the Modal (X button)
closeFaqBtn.addEventListener('click', () => {
    faqModal.classList.remove('show');
});

// Close the Modal (Clicking empty space)
faqModal.addEventListener('click', (e) => {
    if (e.target === faqModal) {
        faqModal.classList.remove('show');
    }
});

// The Accordion Dropdown Animation
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = item.querySelector('.accordion-content');
        const isActive = item.classList.contains('active');

        // Close all other open tabs (optional, but looks cleaner)
        document.querySelectorAll('.accordion-item').forEach(child => {
            child.classList.remove('active');
            child.querySelector('.accordion-content').style.maxHeight = null;
        });

        // Open the clicked tab
        if (!isActive) {
            item.classList.add('active');
            // Dynamically calculates the exact height needed for the text
            content.style.maxHeight = content.scrollHeight + "px"; 
        }
    });
});

const dayMusic = new Audio('Hakata_Bay_Vigil.mp3');
dayMusic.loop = true; 
dayMusic.volume = 0.4;

const dayHover = new Audio('koto-hit.mp3');
dayHover.volume = 0.5; 
dayHover.preload = 'auto'; // Preloaded to kill latency

const dayClick = new Audio('traditional-stamp.mp3');
dayClick.volume = 0.7; 
dayClick.preload = 'auto';

// 2. Load the Night Audio
const nightMusic = new Audio('Final_Bell.mp3');
nightMusic.loop = true; 
nightMusic.volume = 0.4;

const nightHover = new Audio('koto-night.mp3');
nightHover.volume = 0.5; 
nightHover.preload = 'auto';

const nightClick = new Audio('drum-night.mp3');
nightClick.volume = 0.7; 
nightClick.preload = 'auto';

// 3. Load the Ambient Waves (Plays for both day and night!)
const bgWaves = new Audio('waves.mp3');
bgWaves.loop = true; 
bgWaves.volume = 0.15;

// 4. Global State
let isMuted = true;
const soundToggleBtn = document.getElementById('sound-toggle');
const soundIconImg = document.getElementById('sound-icon-display');
const themeToggleBtn = document.getElementById('theme-toggle'); // Grabbing your sun/moon button

// 5. The Play/Mute Button Logic
soundToggleBtn.addEventListener('click', () => {
    isMuted = !isMuted;

    if (isMuted) {
        dayMusic.pause();
        nightMusic.pause();
        bgWaves.pause();
        soundIconImg.src = "mute.png";
        soundIconImg.alt = "Muted";
    } else {
        bgWaves.play();
        // Check which theme is active right now to play the right BGM
        if (document.body.classList.contains('dark-mode')) {
            nightMusic.play();
        } else {
            dayMusic.play();
        }
        soundIconImg.src = "sound.png";
        soundIconImg.alt = "Playing";
    }
});

// 6. Theme Swap Audio Logic (Runs when you click the Sun/Moon)
themeToggleBtn.addEventListener('click', () => {
    // Only swap the music if the site is currently unmuted
    if (!isMuted) {
        // We give the browser 50 milliseconds to visually change the theme before swapping the audio
        setTimeout(() => {
            if (document.body.classList.contains('dark-mode')) {
                dayMusic.pause();
                nightMusic.currentTime = 0; // Start night track from the beginning
                nightMusic.play();
            } else {
                nightMusic.pause();
                dayMusic.currentTime = 0; // Start day track from the beginning
                dayMusic.play();
            }
        }, 50);
    }
});

// 7. Attach SFX to all buttons and links dynamically
const allInteractives = document.querySelectorAll('button, a');

allInteractives.forEach(element => {
    
    // Hover Sound Logic
    element.addEventListener('mouseenter', () => {
        if (!isMuted) {
            if (document.body.classList.contains('dark-mode')) {
                nightHover.currentTime = 0;
                nightHover.play().catch(e => console.log("Suppressed"));
            } else {
                dayHover.currentTime = 0;
                dayHover.play().catch(e => console.log("Suppressed"));
            }
        }
    });

    // Click Sound Logic
    element.addEventListener('click', () => {
        if (!isMuted) {
            if (document.body.classList.contains('dark-mode')) {
                nightClick.currentTime = 0;
                nightClick.play().catch(e => console.log("Suppressed"));
            } else {
                dayClick.currentTime = 0;
                dayClick.play().catch(e => console.log("Suppressed"));
            }
        }
    });
});