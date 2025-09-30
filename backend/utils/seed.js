import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

dotenv.config({ path: './.env' });

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding.");

    // Clear existing data
    await Application.deleteMany({});
    await Job.deleteMany({});
    await Company.deleteMany({});
    await User.deleteMany({});
    console.log("Cleared existing data.");

    // Create Users
    const hashedPassword = await bcrypt.hash("password123", 10);
    const users = await User.create([
      // Students
      { fullname: "Alice Wonder", email: "alice@example.com", phoneNumber: "1234567890", password: hashedPassword, role: "student", profile: { bio: "Aspiring software developer.", skills: ["JavaScript", "React", "Node.js"] } },
      { fullname: "Charlie Bucket", email: "charlie@example.com", phoneNumber: "1234567891", password: hashedPassword, role: "student", profile: { bio: "Data science enthusiast.", skills: ["Python", "TensorFlow", "scikit-learn"] } },
      { fullname: "Diana Prince", email: "diana@example.com", phoneNumber: "1234567892", password: hashedPassword, role: "student", profile: { bio: "Creative UI/UX designer.", skills: ["Figma", "Adobe XD", "Sketch"] } },
      // Recruiters
      { fullname: "Bob Builder", email: "bob@example.com", phoneNumber: "0987654321", password: hashedPassword, role: "recruiter", profile: { bio: "Hiring for Tech Solutions Inc." } },
      { fullname: "Eve Moneypenny", email: "eve@example.com", phoneNumber: "0987654322", password: hashedPassword, role: "recruiter", profile: { bio: "Recruiting for Innovate LLC." } },
      { fullname: "Frank Castle", email: "frank@example.com", phoneNumber: "0987654323", password: hashedPassword, role: "recruiter", profile: { bio: "Finding talent for Green Energy Corp." } },
    ]);
    console.log("Created users.");

    const student1 = users[0];
    const student2 = users[1];
    const student3 = users[2];
    const recruiter1 = users[3];
    const recruiter2 = users[4];
    const recruiter3 = users[5];

    // Create Companies
    const companies = await Company.create([
      { name: "Tech Solutions Inc.", description: "A leading provider of innovative tech solutions.", website: "https://techsolutions.example.com", location: "San Francisco, CA", userId: recruiter1._id },
      { name: "Innovate LLC", description: "Pioneering new technologies.", website: "https://innovate.example.com", location: "New York, NY", userId: recruiter2._id },
      { name: "Green Energy Corp", description: "Sustainable energy solutions.", website: "https://greenenergy.example.com", location: "Austin, TX", userId: recruiter3._id },
    ]);
    console.log("Created companies.");

    const company1 = companies[0];
    const company2 = companies[1];
    const company3 = companies[2];

    await User.findByIdAndUpdate(recruiter1._id, { 'profile.company': company1._id });
    await User.findByIdAndUpdate(recruiter2._id, { 'profile.company': company2._id });
    await User.findByIdAndUpdate(recruiter3._id, { 'profile.company': company3._id });

    // Create Jobs
    const jobs = await Job.create([
      // Tech Solutions Inc. Jobs
      { title: "Frontend Developer", description: "Develop and maintain our web applications.", requirements: ["React", "CSS", "HTML"], salary: 85000, experienceLevel: 2, location: "Remote", jobType: "Full-time", position: 3, company: company1._id, created_by: recruiter1._id },
      { title: "Backend Developer", description: "Work on our server-side logic and database.", requirements: ["Node.js", "Express", "MongoDB"], salary: 95000, experienceLevel: 3, location: "San Francisco, CA", jobType: "Full-time", position: 2, company: company1._id, created_by: recruiter1._id },
      // Innovate LLC Jobs
      { title: "Data Scientist", description: "Analyze large datasets to extract meaningful insights.", requirements: ["Python", "R", "SQL"], salary: 120000, experienceLevel: 4, location: "New York, NY", jobType: "Full-time", position: 1, company: company2._id, created_by: recruiter2._id },
      { title: "UX/UI Designer", description: "Design user-friendly interfaces for our products.", requirements: ["Figma", "Sketch", "User Research"], salary: 75000, experienceLevel: 2, location: "Remote", jobType: "Contract", position: 5, company: company2._id, created_by: recruiter2._id },
      // Green Energy Corp Jobs
      { title: "DevOps Engineer", description: "Manage and improve our CI/CD pipeline.", requirements: ["AWS", "Docker", "Kubernetes"], salary: 110000, experienceLevel: 3, location: "Austin, TX", jobType: "Full-time", position: 2, company: company3._id, created_by: recruiter3._id },
      { title: "Marketing Manager", description: "Lead our marketing campaigns and strategies.", requirements: ["SEO", "Content Marketing", "Social Media"], salary: 80000, experienceLevel: 4, location: "Austin, TX", jobType: "Full-time", position: 1, company: company3._id, created_by: recruiter3._id },
    ]);
    console.log("Created jobs.");

    // Create Applications
    await Application.create([
      { job: jobs[0]._id, applicant: student1._id, status: 'pending' },
      { job: jobs[2]._id, applicant: student2._id, status: 'accepted' },
      { job: jobs[3]._id, applicant: student3._id, status: 'pending' },
      { job: jobs[1]._id, applicant: student1._id, status: 'rejected' },
      { job: jobs[4]._id, applicant: student2._id, status: 'pending' },
    ]);
    console.log("Created applications.");

    console.log("Database seeded successfully with diverse data!");

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
};

seedDatabase();
