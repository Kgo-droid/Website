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