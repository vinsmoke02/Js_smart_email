const categories = ['work', 'personal', 'promotions', 'spam'];

window.onload = function () {
categories.forEach(cat => {
const savedEmails = JSON.parse(localStorage.getItem(cat)) || [];
const container = document.querySelector(`#${cat} .emails`);
container.innerHTML = '';
savedEmails.forEach((email, idx) => {
    container.innerHTML += generateEmailHTML(email.subject, email.body, idx, cat);
});
});
};

function generateEmailHTML(subject, body, index, category) {
return `
<div class="email-entry" data-index="${index}" data-category="${category}">
    <strong>Subject:</strong> ${subject}<br/>
    <strong>Body:</strong> ${body}<br/>
    <button onclick="removeEmail(this)">Remove</button>
</div>
`;
}

function organizeEmail() {
const subject = document.getElementById("subject").value.trim();
const body = document.getElementById("body").value.trim();
const content = (subject + " " + body).toLowerCase();

const keywords = {
work: ['project', 'meeting', 'deadline', 'invoice', 'client', 'schedule','job'],
personal: ['family', 'friend', 'party', 'weekend', 'vacation', 'dinner'],
promotions: ['sale', 'discount', 'offer', 'deal', 'promo', 'bargain'],
spam: ['lottery', 'prize', 'win', 'click', 'urgent', 'money', 'claim']
};

let category = 'personal';
let found = false;

for (let key in keywords) {
for (let word of keywords[key]) {
    if (content.includes(word)) {
    category = key;
    found = true;
    break;
    }
}
if (found) break;
}

const email = { subject, body };
let storedEmails = JSON.parse(localStorage.getItem(category)) || [];
storedEmails.push(email);
localStorage.setItem(category, JSON.stringify(storedEmails));
const index = storedEmails.length - 1;

const container = document.querySelector(`#${category} .emails`);
container.innerHTML += generateEmailHTML(subject, body, index, category);

document.getElementById("subject").value = '';
document.getElementById("body").value = '';
}

function removeEmail(button) {
const emailDiv = button.parentElement;
const category = emailDiv.getAttribute('data-category');
const index = parseInt(emailDiv.getAttribute('data-index'));

let storedEmails = JSON.parse(localStorage.getItem(category)) || [];
storedEmails.splice(index, 1);
localStorage.setItem(category, JSON.stringify(storedEmails));

// Re-render emails
const container = document.querySelector(`#${category} .emails`);
container.innerHTML = '';
storedEmails.forEach((email, idx) => {
container.innerHTML += generateEmailHTML(email.subject, email.body, idx, category);
});
}