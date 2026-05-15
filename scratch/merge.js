const fs = require('fs');
const path = require('path');

const projectPath = 'c:/Users/Admin/Documents/LapTrinhWeb/BestWebDesign';

// Read all three files
const appDataContent = fs.readFileSync(path.join(projectPath, 'js/app-data.js'), 'utf8');
const majorsDataContent = fs.readFileSync(path.join(projectPath, 'js/majors.js'), 'utf8');
const unisDataContent = fs.readFileSync(path.join(projectPath, 'js/universities.js'), 'utf8');

// Extract the objects by using eval. 
// Since they are defined as const, we just append a module.exports to the end.
let majorsData, universitiesData;
try {
  majorsData = eval(majorsDataContent + '; majorsData;');
  universitiesData = eval(unisDataContent + '; universitiesData;');
} catch (e) {
  console.error("Eval failed:", e);
  process.exit(1);
}

// 1. Process Majors
const newMajors = majorsData.majors.map(m => {
  // Map combos based on category roughly
  let combos = ["A00", "A01", "D01"];
  if (m.category === "yte") combos = ["B00", "A00", "D07"];
  if (m.category === "design") combos = ["V00", "H00", "D01"];
  if (m.category === "luat") combos = ["C00", "D01", "D14"];
  if (m.category === "nn") combos = ["D01", "D14", "D15"];
  if (m.category === "sudp") combos = ["C00", "D01", "A00"];

  return {
    id: m.id,
    name: m.name,
    category: m.category,
    description: m.description,
    careers: m.careers,
    salary: m.avgSalary,
    difficulty: m.difficulty,
    employment: parseInt(m.employmentRate) || 90,
    combos: combos
  };
});

// 2. Process Universities
function getRegion(location) {
  const north = ["Hà Nội", "Thái Nguyên"];
  const central = ["Đà Nẵng", "Huế", "Nghệ An"];
  if (north.some(n => location.includes(n))) return "north";
  if (central.some(n => location.includes(n))) return "central";
  if (location.includes("Nhiều cơ sở")) return "all";
  return "south"; // TP.HCM, Cần Thơ, Bình Dương
}

function getLat(location) {
  if (location.includes("Hà Nội")) return 21.0285 + (Math.random() - 0.5) * 0.1;
  if (location.includes("TP. Hồ Chí Minh") || location.includes("TP.HCM")) return 10.8231 + (Math.random() - 0.5) * 0.1;
  if (location.includes("Đà Nẵng")) return 16.0544 + (Math.random() - 0.5) * 0.1;
  if (location.includes("Huế")) return 16.4637;
  if (location.includes("Cần Thơ")) return 10.0452;
  return 16.0;
}

function getLng(location) {
  if (location.includes("Hà Nội")) return 105.8542 + (Math.random() - 0.5) * 0.1;
  if (location.includes("TP. Hồ Chí Minh") || location.includes("TP.HCM")) return 106.6297 + (Math.random() - 0.5) * 0.1;
  if (location.includes("Đà Nẵng")) return 108.2022 + (Math.random() - 0.5) * 0.1;
  if (location.includes("Huế")) return 107.5909;
  if (location.includes("Cần Thơ")) return 105.7469;
  return 106.0;
}

const allUnis = [...universitiesData.public.map(u => ({...u, _type: 'public'})), ...universitiesData.private.map(u => ({...u, _type: 'private'}))];

const newUnis = allUnis.map(u => {
  const id = u.shortName.toLowerCase();
  
  // Create fake cutoffs based on their categories
  const cutoffs = {};
  const uniCats = u.categories || [];
  
  // Pick up to 4 majors from the newMajors that match the university's categories
  const matchingMajors = newMajors.filter(m => uniCats.includes(m.category)).slice(0, 4);
  
  matchingMajors.forEach(m => {
    const baseCutoff = 18 + Math.random() * 8; // 18 to 26
    cutoffs[m.id] = {
      2023: parseFloat((baseCutoff).toFixed(1)),
      2024: parseFloat((baseCutoff + Math.random() * 0.5 - 0.2).toFixed(1)),
      2025: parseFloat((baseCutoff + Math.random() * 1.0 - 0.2).toFixed(1))
    };
  });

  return {
    id: id,
    name: u.name,
    shortName: u.shortName,
    type: u._type,
    city: u.location === "TP. Hồ Chí Minh" ? "TP.HCM" : u.location,
    region: getRegion(u.location),
    website: u.website,
    tuition: Math.floor(15 + Math.random() * 25), // 15 to 40
    students: u.students,
    majorsCount: parseInt(u.majors) || 20,
    lat: parseFloat(getLat(u.location).toFixed(4)),
    lng: parseFloat(getLng(u.location).toFixed(4)),
    categories: u.categories,
    cutoffs: cutoffs
  };
});

// Now stringify nicely
const newMajorsStr = JSON.stringify(newMajors, null, 4).replace(/"([^"]+)":/g, '$1:');
const newUnisStr = JSON.stringify(newUnis, null, 4).replace(/"([^"]+)":/g, '$1:');

// Replace in appDataContent
let updatedAppContent = appDataContent.replace(
  /const majors = \[[\s\S]*?\];\n\n  const universities = \[/, 
  `const majors = ${newMajorsStr};\n\n  const universities = [`
);

updatedAppContent = updatedAppContent.replace(
  /const universities = \[[\s\S]*?\];\n\n  function getCategory/,
  `const universities = ${newUnisStr};\n\n  function getCategory`
);

fs.writeFileSync(path.join(projectPath, 'js/app-data.js'), updatedAppContent);
console.log("Successfully merged majors and universities into app-data.js!");
console.log(`Total Majors: ${newMajors.length}, Total Universities: ${newUnis.length}`);
