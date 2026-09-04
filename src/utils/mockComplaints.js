import { getAccessToken, BASE_URL } from "./api";

export const getComplaints = async (view = "reported_by_me") => {
  const token = await getAccessToken();
  const res = await fetch(`${BASE_URL}/api/v1/app/complaints?view=${view}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch complaints");
  }
  const json = await res.json();
  console.log("getComplaints response shape:", json); // remove once confirmed
  return json.data ?? json.results ?? json;
};

export const addComplaint = async (complaint) => {
  const token = await getAccessToken();

  const visibilityMap = {
    hr: "hr",
    "line manager": "line_manager",
    both: "both",
  };

  const payload = {
    category: complaint.submittedTo === "an employee" ? "employee" : "general",
    complaint_type: complaint.complaintType,
    description: complaint.description,
    visibility: visibilityMap[complaint.recipient],
  };

  if (complaint.submittedTo === "an employee") {
    payload.respondent_id = complaint.filedAgainstId;
    payload.incident_date = complaint.date
      ? new Date(complaint.date).toISOString().split("T")[0]
      : null;
    payload.frequency =
      complaint.frequency === "repeated behaviour"
        ? "repeat_behavior"
        : "one_time";
    if (payload.frequency === "repeat_behavior" && complaint.occurrenceCount) {
      payload.occurrence_count = complaint.occurrenceCount;
    }
    if (complaint.witnessId) {
      payload.witness_ids = [complaint.witnessId];
    }
  }
  // do NOT send incident_date/frequency/respondent_id at all for "general" —
  // the doc says respondent_id on a general complaint is actively rejected

  const token_header = { Authorization: `Bearer ${token}` };

  const res = await fetch(`${BASE_URL}/api/v1/app/complaints`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...token_header,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    console.error("Complaint submission rejected:", errorBody);
    throw new Error("Failed to submit complaint");
  }

  return res.json();
};

export const getComplaintsAgainstEmployee = async () => {
  return getComplaints("against_me");
};

// export const getComplaintTaggedToHr = async () => {
//   const token = await getAccessToken();
//   const res = await fetch(`${BASE_URL}/api/v1/app/complaints`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch complaints tagged to Hr");
//   }
//   const json = await res.json();
//   const complaints = json.data ?? json.results ?? json;
//   console.log("Field names on first complaint:", Object.keys(complaints[0])); // temp debug
//   return complaints.filter(
//     (complaint) =>
//       complaint.visibility === "hr" || complaint.visibility === "both",
//   );
// };

export const getComplaintTaggedToHr = async () => {
  const token = await getAccessToken();
  const res = await fetch(`${BASE_URL}/api/v1/app/complaints`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch complaints tagged to Hr");
  }
  const json = await res.json();
  return json.data ?? json.results ?? json;
};

// TEMPORARY — no DELETE endpoint confirmed in the backend docs yet.
export const deleteComplaint = async () => {
  throw new Error("Delete is not yet supported by the backend.");
};
