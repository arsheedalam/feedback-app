const token = localStorage.getItem("token");
const feedbackBox = document.getElementById("feedback");

if (!token) {
    alert("User not logged in!");
}

/* Submit Feedback */
async function submitFeedback() {
    try {
        const message = feedbackBox.value.trim();

        if (!message) {
            alert("Please enter feedback");
            return;
        }

        const res = await fetch("http://localhost:8080/api/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({ message })
        });

        if (!res.ok) {
            throw new Error("Failed to submit feedback");
        }

        const data = await res.json();

        alert("Feedback Submitted ✅");
        feedbackBox.disabled = true;

        loadFeedback();

    } catch (error) {
        console.error(error);
        alert("Something went wrong ❌");
    }
}

/* Load Feedback */
async function loadFeedback() {
    try {
        const res = await fetch("http://localhost:8080/api/feedback", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch feedback");
        }

        const data = await res.json();

        console.log("Feedback:", data);

        // Assuming API returns { message: "..." }
        if (data.message) {
            feedbackBox.value = data.message;
            feedbackBox.disabled = true;
        }

    } catch (error) {
        console.error(error);
    }
}

/* Add Feedback */
function addFeedback() {
    feedbackBox.disabled = false;
    feedbackBox.value = "";
}

/* Edit Feedback */
function editFeedback() {
    if (!feedbackBox.value) {
        alert("No feedback to edit");
        return;
    }
    feedbackBox.disabled = false;
}

/* Load on page start */
loadFeedback();
