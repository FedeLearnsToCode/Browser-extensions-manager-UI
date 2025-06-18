// ====================== VARIABLES ====================== 
const allBtn = document.getElementById('all');
const activeBtn = document.getElementById('active');
const inactiveBtn = document.getElementById('inactive');
const toggleTheme = document.querySelector('.toggle-theme');
const html = document.querySelector('html');

// ====================== CREATE CARDS ====================== 
fetch('data.json')
    .then(response => response.json())
    .then(data => renderCards(data))
    .catch(error => console.error('Loading error:', error));
    
function renderCards(cards) {
    const container = document.querySelector('.cards');
    container.innerHTML = '';

    cards.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Info section
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card-info');

        const img = document.createElement('img');
        img.src = item.logo;
        img.alt = '';
        img.setAttribute('aria-hidden', 'true');

        const cardInfoText = document.createElement('div');
        cardInfoText.classList.add('card-info-text');

        const title = document.createElement('h2');
        title.textContent = item.name
        
        const description = document.createElement('p');
        description.textContent = item.description;

        cardInfoText.appendChild(title);
        cardInfoText.appendChild(description);

        cardInfo.appendChild(img);
        cardInfo.appendChild(cardInfoText);

        // Buttons section 
        const cardBtns = document.createElement('div');
        cardBtns.classList.add('buttons');

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('card-btn');
        removeBtn.textContent = 'Remove';
        removeBtn.setAttribute('type', 'button');
        removeBtn.setAttribute('aria-label', `Remove the ${item.name} extension`);
        removeBtn.addEventListener('click', () => {
            card.remove();
            allBtn.focus();
            const toastMsg = document.querySelector('.toast-wrapper');
            toastMsg.classList.remove('hidden');
            setTimeout(() => {
                toastMsg.classList.add('show');
            }, 10); 
            setTimeout(() => {
                toastMsg.classList.remove('show');
                setTimeout(() => {
                    toastMsg.classList.add('hidden');
                }, 300)
            }, 3000);
        })

        const switchLabel = document.createElement('label');
        switchLabel.classList.add('switch');
        const cardCheckbox = document.createElement('input');
        cardCheckbox.type = 'checkbox';
        cardCheckbox.id = 'active-toggle-' + item.name.toLowerCase().replace(/\s+/g, '-');;
        cardCheckbox.setAttribute('aria-label', `Turn on/off the ${item.name} extension`);
        const slider = document.createElement('span');
        slider.classList.add('slider');

        switchLabel.appendChild(cardCheckbox);
        switchLabel.appendChild(slider);

        cardBtns.appendChild(removeBtn);
        cardBtns.appendChild(switchLabel);

        card.appendChild(cardInfo);
        card.appendChild(cardBtns);

        container.appendChild(card);        
    
        // Active class on input element
        cardCheckbox.addEventListener('change', () => {
        if (cardCheckbox.checked) {
            switchLabel.classList.add('active');
        } else {
            switchLabel.classList.remove('active');
        }
        });

    });
}

// ====================== FILTERS ====================== 
activeBtn.addEventListener('click',() => {
    allBtn.classList.remove('selected');
    allBtn.setAttribute('aria-pressed', 'false');
    inactiveBtn.classList.remove('selected');
    inactiveBtn.setAttribute('aria-pressed', 'false');
    activeBtn.classList.add('selected');
    activeBtn.setAttribute('aria-pressed', 'true');

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const switchLabel = card.querySelector('.switch');
        if (!switchLabel.classList.contains('active')) {
            card.classList.add('hidden');
        } else {
            card.classList.remove('hidden');
        }
    }) 
})

inactiveBtn.addEventListener('click',() => {
    allBtn.classList.remove('selected');
    allBtn.setAttribute('aria-pressed', 'false');
    activeBtn.classList.remove('selected');
    activeBtn.setAttribute('aria-pressed', 'false');
    inactiveBtn.classList.add('selected');
    inactiveBtn.setAttribute('aria-pressed', 'true');

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const switchLabel = card.querySelector('.switch');
        if (switchLabel.classList.contains('active')) {
            card.classList.add('hidden');
        } else {
            card.classList.remove('hidden');
        }
    }) 
})

allBtn.addEventListener('click',() => {
    inactiveBtn.classList.remove('selected');
    inactiveBtn.setAttribute('aria-pressed', 'false');
    activeBtn.classList.remove('selected');
    activeBtn.setAttribute('aria-pressed', 'false');
    allBtn.classList.add('selected');
    allBtn.setAttribute('aria-pressed', 'true');

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.classList.remove('hidden');
    }) 
})

// ====================== TOGGLE THEME ====================== 
toggleTheme.addEventListener('click', () => {
    html.classList.toggle('dark');

    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    const toggleLogo = document.getElementById('toggle-logo');
    const logoText = document.getElementById('logo-text');

    if (isDark) {
        toggleLogo.src = './assets/images/icon-sun.svg';
        logoText.setAttribute('fill', '#fff');
    } else {
        toggleLogo.src = './assets/images/icon-moon.svg';
        logoText.setAttribute('fill', '#091540');
    }
})

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    html.classList.add('dark');

    const toggleLogo = document.getElementById('toggle-logo');
    const logoText = document.getElementById('logo-text');

    toggleLogo.src = './assets/images/icon-sun.svg';
    logoText?.setAttribute('fill', '#fff');
}
