console.group("--- Task 1: Promise & Async Flow Controls ---");

function fetchUser(id) {
    return fetch('https://jsonplaceholder.typicode.com/users/' + id)
        .then(response => response.json())
        .then(user => {
            console.log(`Step 45 (.then) User Name: ${user.name}`);
            return user;
        });
}
fetchUser(1);

async function fetchUserAsync(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) throw new Error("User retrieval failed");
        const user = await response.json();
        console.log(`Step 46 (async/await) User Name: ${user.name}`);
    } catch (error) {
        console.error("Error inside fetchUserAsync:", error.message);
    }
}
fetchUserAsync(2);

const localMockCourses = [
    { id: 1, name: "Introduction to Web Development", code: "CS101", credits: 5 },
    { id: 2, name: "Data Structures & Algorithms", code: "CS201", credits: 3 },
    { id: 3, name: "Database Management Systems", code: "CS301", credits: 4 }
];

function fetchAllCourses() {
    return new Promise(resolve => {
        setTimeout(() => resolve(localMockCourses), 1000);
    });
}

async function loadPortalCourses() {
    const loader = document.getElementById('course-loading');
    const grid = document.querySelector('.course-grid');
    
    try {
        const courses = await fetchAllCourses();
        loader.style.display = 'none'; // Clear out message element
        
        grid.innerHTML = courses.map(course => `
            <article class="course-card">
                <h3>${course.name}</h3>
                <p>Code: <strong>${course.code}</strong></p>
                <span class="credits">Credits: ${course.credits}</span>
            </article>
        `).join('');
    } catch (err) {
        loader.textContent = "Failed to render academic data.";
    }
}
loadPortalCourses();

async function fetchMultipleUsersConcurrent() {
    try {
        const [user1, user2] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users/1').then(res => res.json()),
            fetch('https://jsonplaceholder.typicode.com/users/2').then(res => res.json())
        ]);
        console.log(`Step 49 (Promise.all) Resolved Names: [ ${user1.name} ] and [ ${user2.name} ]`);
    } catch (error) {
        console.error("Concurrent extraction encountered errors:", error);
    }
}
fetchMultipleUsersConcurrent();

console.groupEnd();

axios.interceptors.request.use((config) => {
    console.log(`%c[AXIOS INTERCEPTOR] API call started: ${config.url}`, "color: #0284c7; font-weight: bold;");
    return config;
}, (error) => {
    return Promise.reject(error);
});

async function apiFetch(endpoint, useBadUrl = false) {
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    const targetUrl = useBadUrl ? `${baseUrl}/nonexistentRoute404` : `${baseUrl}${endpoint}`;
    
    const response = await axios.get(targetUrl, {
        params: endpoint === '/posts' && !useBadUrl ? { userId: 1 } : {}
    });
    
    return response.data;
}

async function loadCampusNotifications(triggerErrorState = false) {
    const statusArea = document.getElementById('notify-status-area');
    const notifyGrid = document.querySelector('.notification-grid');
    
    statusArea.innerHTML = `<div class="loading-indicator"> Fetching Live Campus Notifications...</div>`;
    notifyGrid.innerHTML = '';

    try {
        const posts = await apiFetch('/posts', triggerErrorState);
        
        statusArea.innerHTML = '';
        
        notifyGrid.innerHTML = posts.slice(0, 4).map(post => `
            <div class="notification-card">
                <h4>${post.title}</h4>
                <p>${post.body}</p>
            </div>
        `).join('');
        
    } catch (error) {
        statusArea.innerHTML = `
            <div class="error-banner">
                <span><strong>Network Exception:</strong> Unable to process endpoint data streams (${error.message}).</span>
                <button id="btn-retry-action" class="btn-retry">Retry Fetch</button>
            </div>
        `;
        
        document.getElementById('btn-retry-action').addEventListener('click', () => {
            loadCampusNotifications(false);
        });
    }
}

loadCampusNotifications(false);