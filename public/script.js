const form = document.getElementById("profileForm");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");
const profilesTable = document.getElementById("profilesTable");

let editingProfileId = null;

// Load profiles and display in table
async function fetchProfiles() {
  try {
    const res = await fetch("/profiles");
    const profiles = await res.json();

    profilesTable.innerHTML = "";

    profiles.forEach((profile) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${profile.name || ""}</td>
        <td>${profile.gender || ""}</td>
        <td>${profile.dob ? new Date(profile.dob).toLocaleDateString() : ""}</td>
        <td>${profile.education || ""}</td>
        <td>${profile.hometown || ""}</td>
        <td>${profile.income || ""}</td>
        <td>
          <button onclick="editProfile('${profile._id}')">Edit</button>
          <button onclick="deleteProfile('${profile._id}')">Delete</button>
        </td>
      `;

      profilesTable.appendChild(tr);
    });
  } catch (error) {
    errorMessage.textContent = "Failed to load profiles.";
    console.error(error);
  }
}

// Fill form with profile data for editing
async function editProfile(id) {
  try {
    const res = await fetch(`/profiles`);
    const profiles = await res.json();
    const profile = profiles.find((p) => p._id === id);

    if (!profile) return;

    editingProfileId = id;

    form.name.value = profile.name || "";
    form.dob.value = profile.dob ? profile.dob.slice(0, 10) : "";
    form.gender.value = profile.gender || "";
    form.education.value = profile.education || "";
    form.hometown.value = profile.hometown || "";
    form.address.value = profile.address || "";
    form.income.value = profile.income || "";
    form.assets.value = profile.assets || "";
    form.preferences.value = profile.preferences || "";
    form.height.value = profile.height || "";

    successMessage.textContent = "Editing profile: " + (profile.name || "");
    errorMessage.textContent = "";
  } catch (error) {
    errorMessage.textContent = "Failed to load profile for editing.";
    console.error(error);
  }
}

// Delete a profile by ID
async function deleteProfile(id) {
  if (!confirm("Are you sure you want to delete this profile?")) return;

  try {
    const res = await fetch(`/profiles/${id}`, { method: "DELETE" });
    const result = await res.json();

    if (res.ok) {
      successMessage.textContent = result.message;
      errorMessage.textContent = "";
      fetchProfiles();
      if (editingProfileId === id) {
        form.reset();
        editingProfileId = null;
      }
    } else {
      errorMessage.textContent = result.error || "Failed to delete profile.";
    }
  } catch (error) {
    errorMessage.textContent = "Failed to delete profile.";
    console.error(error);
  }
}

// Handle form submission for add/update
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const profileData = {
    name: form.name.value,
    dob: form.dob.value,
    gender: form.gender.value,
    education: form.education.value,
    hometown: form.hometown.value,
    address: form.address.value,
    income: form.income.value,
    assets: form.assets.value,
    preferences: form.preferences.value,
    height: form.height.value,
  };

  try {
    let res, result;
    if (editingProfileId) {
      // Update existing
      res = await fetch(`/profiles/${editingProfileId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });
      result = await res.json();
    } else {
      // Create new
      res = await fetch("/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });
      result = await res.json();
    }

    if (res.ok) {
      successMessage.textContent = result.message || "Success!";
      errorMessage.textContent = "";
      form.reset();
      editingProfileId = null;
      fetchProfiles();
    } else {
      errorMessage.textContent = result.error || "Failed to submit.";
      successMessage.textContent = "";
    }
  } catch (error) {
    errorMessage.textContent = "Failed to submit profile.";
    successMessage.textContent = "";
    console.error(error);
  }
});

// Initial load
fetchProfiles();
