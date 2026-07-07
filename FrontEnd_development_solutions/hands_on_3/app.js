import { coursesData } from './data.js';

let workingCourses = [...coursesData];

console.group("--- Task 1: ES6+ Syntax Validations ---");

const formattedStrings = workingCourses.map(({ name, code, credits }) => `${code} — ${name} (${credits} credits)`);
console.log("Formatted Course Strings:", formattedStrings);

const highCreditCount = workingCourses.filter(course => course.credits >= 4).length;
console.log(`Count of courses with >= 4 credits: ${highCreditCount}`);

const aggregateCredits = workingCourses.reduce((sum, course) => sum + course.credits, 0);
console.log(`Calculated Aggregated Credits: ${aggregateCredits}`);

console.groupEnd();

const courseGrid = document.querySelector('.course-grid');
const totalCreditsDisplay = document.getElementById('total-credits');
const searchInput = document.getElementById('search-courses');
const sortButton = document.getElementById('sort-credits');
const selectedPanel = document.getElementById('selected-course-panel');
const selectedText = document.getElementById('selected-course-text');

const renderCourses = (coursesArray) => {
    courseGrid.innerHTML = '';

    const fragment = document.createDocumentFragment();

    coursesArray.forEach(course => {
        const article = document.createElement('article');
        article.className = 'course-card';
        
        article.setAttribute('data-id', course.id);

        article.innerHTML = `
            <div>
                <h3>${course.name}</h3>
                <p>Course Code: <strong>${course.code}</strong></p>
            </div>
            <span class="credits">Credits: ${course.credits}</span>
        `;
        
        fragment.appendChild(article);
    });

    courseGrid.appendChild(fragment);

    const contextCredits = coursesArray.reduce((acc, curr) => acc + curr.credits, 0);
    totalCreditsDisplay.textContent = `Total Dynamically Calculated Credits: ${contextCredits}`;
};

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    const filtered = coursesData.filter(course => 
        course.name.toLowerCase().includes(query) || 
        course.code.toLowerCase().includes(query)
    );
    
    workingCourses = filtered;
    renderCourses(workingCourses);
});

sortButton.addEventListener('click', () => {
    workingCourses.sort((a, b) => b.credits - a.credits);
    renderCourses(workingCourses);
});

courseGrid.addEventListener('click', (event) => {
    const card = event.target.closest('.course-card');
    
    if (card) {
        const courseId = parseInt(card.getAttribute('data-id'), 10);
        const matchData = coursesData.find(c => c.id === courseId);
        
        if (matchData) {
            selectedPanel.style.display = "block";
            selectedText.textContent = `${matchData.name} (${matchData.code}) — Grade Earned: [ ${matchData.grade} ]`;
            
            console.log(`Inspecting element context target: ${matchData.name}`);
        }
    }
});

renderCourses(workingCourses);