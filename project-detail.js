// ===================================
// PROJECT DETAIL PAGE SCRIPT
// ===================================

// Get project ID from URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

// Load project data
if (projectId) {
    const project = getProjectById(projectId);

    if (project) {
        loadProjectData(project);
        loadRelatedProjects(project);
    } else {
        // Project not found, redirect to home
        window.location.href = 'index.html#portfolio';
    }
} else {
    // No ID provided, redirect to home
    window.location.href = 'index.html#portfolio';
}

// ===================================
// LOAD PROJECT DATA
// ===================================

function loadProjectData(project) {
    // Update page title
    document.title = `${project.title} - Robby William Pascal`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', project.description);
    }

    // Update header
    document.getElementById('projectCategory').textContent = project.categoryLabel;
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectDescription').textContent = project.description;

    // Update project info
    document.getElementById('projectClient').textContent = project.client;
    document.getElementById('projectYear').textContent = project.year;
    document.getElementById('projectRole').textContent = project.role;
    document.getElementById('projectTools').textContent = project.tools.join(', ');

    // Load images in grid
    const imagesGrid = document.getElementById('projectImages');
    imagesGrid.innerHTML = '';

    // Add special class if only one image
    if (project.images.length === 1) {
        imagesGrid.classList.add('single-image');
    } else {
        imagesGrid.classList.remove('single-image');
    }

    project.images.forEach((image, index) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'project-image-wrapper';
        imageWrapper.innerHTML = `
            <img src="${image}" alt="${project.title} - Image ${index + 1}" loading="lazy">
        `;
        imagesGrid.appendChild(imageWrapper);
    });

    // Update project details
    document.getElementById('projectChallenge').textContent = project.challenge;
    document.getElementById('projectSolution').textContent = project.solution;
    document.getElementById('projectResult').textContent = project.result;
}

// ===================================
// LOAD RELATED PROJECTS
// ===================================

function loadRelatedProjects(currentProject) {
    const relatedContainer = document.getElementById('relatedProjects');
    relatedContainer.innerHTML = '';

    // Get projects from same category, excluding current project
    let relatedProjects = projectsData.filter(project =>
        project.category === currentProject.category &&
        project.id !== currentProject.id
    );

    // If less than 3 related projects, add random projects
    if (relatedProjects.length < 3) {
        const otherProjects = projectsData.filter(project =>
            project.id !== currentProject.id &&
            !relatedProjects.includes(project)
        );

        while (relatedProjects.length < 3 && otherProjects.length > 0) {
            const randomIndex = Math.floor(Math.random() * otherProjects.length);
            relatedProjects.push(otherProjects[randomIndex]);
            otherProjects.splice(randomIndex, 1);
        }
    }

    // Limit to 3 projects
    relatedProjects = relatedProjects.slice(0, 3);

    // Create project cards
    relatedProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'related-project-card';
        projectCard.innerHTML = `
            <a href="project-detail.html?id=${project.id}">
                <div class="related-project-image">
                    <img src="${project.thumbnail}" alt="${project.title}">
                    <div class="related-project-overlay">
                        <span>Lihat Detail →</span>
                    </div>
                </div>
                <div class="related-project-info">
                    <span class="related-project-category">${project.categoryLabel}</span>
                    <h3>${project.title}</h3>
                </div>
            </a>
        `;
        relatedContainer.appendChild(projectCard);
    });
}

// ===================================
// MOBILE MENU
// ===================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// IMAGE LAZY LOAD ANIMATION
// ===================================

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            imageObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Observe images after they're loaded
setTimeout(() => {
    const projectImages = document.querySelectorAll('.project-image-wrapper');
    projectImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'translateY(30px)';
        img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        imageObserver.observe(img);
    });
}, 100);
