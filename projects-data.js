// ===================================
// DATA PROJECT PORTFOLIO
// ===================================
// File ini adalah SATU-SATUNYA tempat untuk mengatur semua data project
// Cukup edit di sini, maka akan otomatis update di halaman home dan detail

const projectsData = [
    {
        id: 1,
        title: "Mobile App Design",
        category: "ui-ux",
        categoryLabel: "UI/UX",
        thumbnail: "assets/project1.webp",
        description: "Aplikasi mobile e-commerce makanan",
        client: "Tech Startup Inc.",
        year: "2024",
        role: "UI/UX Designer",
        tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
        images: [
            "assets/project1.webp"
        ],
        challenge: "Membuat brand identity yang mencerminkan inovasi dan kualitas makanan yang terjamin",
        solution: "Mengembangkan sistem visual yang modern dengan palet warna yang bold namun profesional, dikombinasikan dengan tipografi yang clean dan memorable.",
        result: "Brand identity yang sukses meningkatkan brand awareness sebesar 150% dalam 3 bulan pertama."
    },
    {
        id: 2,
        title: "Fitness Application",
        category: "ui-ux",
        categoryLabel: "UI/UX",
        thumbnail: "assets/project2.png",
        description: "Aplikasi fitness yang membantu pengguna mengatur rutinitas olahraga mereka",
        client: "Evoline",
        year: "2024",
        role: "UI/UX Designer",
        tools: ["Figma", "Adobe XD", "Principle"],
        images: [
            "assets/project2.png"
        ],
        challenge: "Menciptakan karakter yang menarik dan relatable untuk anak-anak usia 5-8 tahun.",
        solution: "Menggunakan warna-warna cerah dan bentuk yang friendly, dengan ekspresi yang ekspresif dan mudah dipahami anak-anak.",
        result: "Ilustrasi diterima dengan sangat baik oleh target audience, buku terjual lebih dari 10,000 copies dalam bulan pertama."
    },
    {
        id: 3,
        title: "Brand Identity Design",
        category: "branding",
        categoryLabel: "Branding",
        thumbnail: "assets/project3.png",
        description: "Desain UI/UX untuk aplikasi mobile e-commerce fashion",
        client: "Fashion Store",
        year: "2024",
        role: "UI/UX Designer",
        tools: ["Figma", "Adobe XD", "Principle"],
        images: [
            "assets/project3.png"
        ],
        challenge: "Membuat user experience yang seamless untuk proses shopping online dengan banyak produk.",
        solution: "Mendesain interface yang clean dengan navigasi intuitif, filter yang powerful, dan checkout process yang simple.",
        result: "Conversion rate meningkat 45% dan bounce rate menurun 30% setelah implementasi desain baru."
    },
];

// ===================================
// FUNGSI HELPER
// ===================================

// Get project by ID
function getProjectById(id) {
    return projectsData.find(project => project.id === parseInt(id));
}

// Get projects by category
function getProjectsByCategory(category) {
    if (category === 'all') {
        return projectsData;
    }
    return projectsData.filter(project => project.category === category);
}

// Get all categories
function getAllCategories() {
    const categories = [...new Set(projectsData.map(project => project.category))];
    return categories;
}
