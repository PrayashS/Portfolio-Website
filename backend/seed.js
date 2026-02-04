const mongoose = require("mongoose");
const Profile = require("./models/Profile");
const Experience = require("./models/Experience");
const Project = require("./models/Project");
const Skill = require("./models/Skill");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

const seedData = async () => {
  try {
    console.log("Clearing existing data...");
    await Profile.deleteMany({});
    await Experience.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});

    console.log("Creating profile...");
    await Profile.create({
      name: "Prayash Kumar Shrestha",
      title: "QA Engineer | MSc Computing Student | Aspiring Software Engineer",
      email: "shresthaprayash023@gmail.com",
      phone: "07751899592",
      location: "45 Becknham Rd, London",
      linkedin: "www.linkedin.com/in/prayash-stha023",
      github: "github.com/prayash",
      summary:
        "QA Engineer with 2 years of professional experience transitioning into software engineering and test automation. Strong understanding of SDLC, testing methodologies, and Agile practices. Currently learning Java and automation frameworks.",
      availability: "Up to 20 hours/week (including evenings and weekends)",
      graduationDate: "September 2026",
    });

    console.log("Creating experiences...");
    await Experience.insertMany([
      {
        title: "Quality Assurance Engineer",
        company: "Virtuosway Pvt. Ltd",
        location: "Kathmandu, Nepal",
        startDate: "Jan 2023",
        endDate: "Sep 2024",
        achievements: [
          "Tested web and mobile applications (Android/iOS) ensuring functionality and reliability",
          "Performed API testing using Postman, validating endpoints and data",
          "Created test cases, test plans, and detailed bug reports in JIRA",
          "Worked in Agile sprints conducting regression, smoke, and sanity testing",
          "Identified 150+ bugs across 4 major projects",
        ],
        order: 1,
      },
      {
        title: "Quality Assurance Intern",
        company: "IEEE Innovation Ghar Pvt. Ltd",
        location: "Kathmandu, Nepal",
        startDate: "Apr 2022",
        endDate: "Dec 2022",
        achievements: [
          "Executed 200+ manual test cases and reported defects",
          "Created and updated test documentation",
          "Performed regression and exploratory testing",
        ],
        order: 2,
      },
    ]);

    console.log("Creating projects...");
    await Project.insertMany([
      {
        name: "SWIFTED",
        description:
          "E-commerce web application built as university group project",
        role: "Scrum Master, Frontend Developer, Tester",
        technologies: ["JavaScript", "React", "HTML5", "CSS3", "Git"],
        highlights: [
          "Developed frontend components using React",
          "Implemented product display and shopping cart",
          "Organized team sprints and coordinated 5 members",
        ],
        order: 1,
      },
      {
        name: "APPYHERE",
        description: "Hiring platform with focus on web and mobile testing",
        role: "QA Tester",
        technologies: ["Postman", "JIRA", "API Testing"],
        highlights: [
          "Performed API testing and created test documentation",
          "Tested web and mobile applications",
        ],
        order: 2,
      },
      {
        name: "CTEVT SAHAPATHI",
        description: "Nepal exam preparation mobile app",
        role: "QA Tester",
        technologies: ["Mobile Testing", "Android", "iOS"],
        highlights: [
          "Conducted regression and UX testing",
          "Tested question bank functionality",
        ],
        order: 3,
      },
      {
        name: "BUSINESS X",
        description: "B2B e-commerce platform",
        role: "QA Tester",
        technologies: ["Web Testing", "Mobile Testing", "JIRA"],
        highlights: [
          "Tested web and mobile applications",
          "Created test documentation",
        ],
        order: 4,
      },
    ]);

    console.log("Creating skills...");
    await Skill.insertMany([
      {
        category: "Testing",
        name: "Manual Testing",
        level: "Advanced",
        order: 1,
      },
      {
        category: "Testing",
        name: "API Testing (Postman)",
        level: "Intermediate",
        order: 2,
      },
      {
        category: "Testing",
        name: "Regression Testing",
        level: "Advanced",
        order: 3,
      },
      {
        category: "Testing",
        name: "Bug Tracking (JIRA)",
        level: "Intermediate",
        order: 4,
      },
      {
        category: "Testing",
        name: "Agile/Scrum",
        level: "Intermediate",
        order: 5,
      },
      { category: "Programming", name: "JavaScript", level: "Basic", order: 1 },
      { category: "Programming", name: "React", level: "Basic", order: 2 },
      { category: "Programming", name: "Java", level: "Learning", order: 3 },
      {
        category: "Programming",
        name: "HTML5/CSS3",
        level: "Intermediate",
        order: 4,
      },
      {
        category: "Tools",
        name: "Git/GitHub",
        level: "Intermediate",
        order: 1,
      },
      { category: "Tools", name: "Postman", level: "Intermediate", order: 2 },
      { category: "Tools", name: "JIRA", level: "Intermediate", order: 3 },
      { category: "Tools", name: "Selenium", level: "Learning", order: 4 },
    ]);

    console.log("✅ Data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedData();
