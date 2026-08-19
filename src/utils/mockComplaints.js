const STORAGE_KEY = "mockComplaints";

// Format a date string/object into "12 Jun, 2023" style
const formatDateReported = (date) => {
  if (!date) return "N/A";
  const parsed = new Date(date);
  if (isNaN(parsed)) return "N/A";
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Seed data - what you'd normally get back from a GET request
const seedComplaints = [
  {
    id: 1,
    complaintType: "Hostile work environment",
    date: "2026-01-15",
    dateReported: "15 Jan, 2026",
    description: "Sample complaint description here.",
    submittedTo: "hr",
    filedAgainst: "N/A",
    witness: "N/A",
    status: "Pending",
    stage: "N/A",
    decision: "N/A",
  },
];

// Initialize localStorage with seed data if it's empty
const initStorage = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedComplaints));
  }
};

export const getComplaints = () => {
  initStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
};

export const addComplaint = (complaint) => {
  const complaints = getComplaints();
  const newComplaint = {
    ...complaint,
    id: Date.now(), // fake unique id
    dateReported: formatDateReported(complaint.date),
    filedAgainst:
      complaint.submittedTo === "an employee" && complaint.filedAgainstName
        ? complaint.filedAgainstName
        : "N/A",
    witness:
      complaint.submittedTo === "an employee" && complaint.witnessName
        ? complaint.witnessName
        : "N/A",
    status: "Pending",
    stage: "N/A",
    decision: "N/A",
  };
  const updated = [newComplaint, ...complaints];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newComplaint;
};

export const deleteComplaint = (id) => {
  const complaints = getComplaints();
  const updated = complaints.filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const getComplaintsAgainstEmployee = (employeeName) => {
  const complaints = getComplaints();
  return complaints.filter((e) => e.filedAgainst === employeeName);
};
