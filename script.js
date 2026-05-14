// --- Sticky Navbar ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// --- Scroll Reveal Animations using Intersection Observer ---
const reveals = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
});

// --- Animated Counters ---
const counters = document.querySelectorAll('.counter');
let hasCounted = false;

const counterObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    
                    // Lower increment makes it slower, higher makes it faster
                    const inc = target / 100;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                updateCount();
            });
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if(aboutSection) {
    counterObserver.observe(aboutSection);
}

// --- BMI Calculator Logic ---
const bmiForm = document.getElementById('bmi-form');
const bmiResult = document.getElementById('bmi-result');

if(bmiForm) {
    bmiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const heightVal = document.getElementById('height').value;
        const weightVal = document.getElementById('weight').value;
        
        if (heightVal === '' || weightVal === '') {
            bmiResult.innerHTML = "<span style='color: #ff0033;'>Please fill in all fields.</span>";
            return;
        }
        
        // Convert height to meters
        const heightMeters = heightVal / 100;
        const bmi = (weightVal / (heightMeters * heightMeters)).toFixed(1);
        
        let category = '';
        let color = '';
        
        if (bmi < 18.5) {
            category = 'Underweight';
            color = '#ffaa00'; // Warning color
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            category = 'Normal weight';
            color = '#25d366'; // Green success
        } else if (bmi >= 25 && bmi <= 29.9) {
            category = 'Overweight';
            color = '#ffaa00';
        } else {
            category = 'Obese';
            color = '#ff0033'; // Neon red danger
        }
        
        bmiResult.innerHTML = `Your BMI is <span>${bmi}</span>. Category: <span style="color: ${color};">${category}</span>`;
    });
}
