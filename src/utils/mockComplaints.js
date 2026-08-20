import { getAccessToken, BASE_URL } from "./api";

export const getComplaints = async () => {
  const token = await getAccessToken();
  const res = await fetch(
    `${BASE_URL}/api/v1/app/complaints?view=reported_by_me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch complaints");
  }
  const json = await res.json();
  return json.data;
};

export const addComplaint = async (complaint) => {
  const token = await getAccessToken();

  const payload = {
    category: complaint.submittedTo === "an employee" ? "employee" : "general",
    complaint_type: complaint.complaintType,
    incident_date: complaint.date
      ? new Date(complaint.date).toISOString().split("T")[0]
      : null,
    frequency: "one_time",
    description: complaint.description,
    visibility: complaint.recipient,
  };

  if (complaint.submittedTo === "an employee") {
    if (complaint.filedAgainstId)
      payload.respondent_id = complaint.filedAgainstId;
    if (complaint.witnessId) payload.witness_ids = [complaint.witnessId];
  }

  const res = await fetch(`${BASE_URL}/api/v1/app/complaints`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to submit complaint");
  }

  return res.json();
};

export const getComplaintsAgainstEmployee = async () => {
  const token = await getAccessToken();
  const res = await fetch(`${BASE_URL}/api/v1/app/complaints?view=against_me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch complaints against you");
  }
  const json = await res.json();
  return json.data;
};

// TEMPORARY — no DELETE endpoint confirmed in the backend docs yet.
// Ask backend if/how deletion should work before rebuilding this properly.
export const deleteComplaint = async () => {
  throw new Error("Delete is not yet supported by the backend.");
};
