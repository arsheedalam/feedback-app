const token = localStorage.getItem("token");

/* Load All Feedback */
async function loadFeedback() {
    try {
        const res = await fetch("/api/feedback", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        const data = await res.json();
        const table = document.getElementById("feedbackTable");

        table.innerHTML = ""; // Clear table

        data.forEach(item => {
            table.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.message}</td>
                    <td>${new Date(item.createdAt).toLocaleDateString()}</td>
                    <td class="actions">
                        <button class="view-btn" onclick="viewFeedback('${item.message}')">View</button>
                        <button class="edit-btn" onclick="editFeedback(${item.id}, '${item.message}')">Edit</button>
                        <button class="delete-btn" onclick="deleteFeedback(${item.id})">Delete</button>
                    </td>
                </tr>
            `;
        });

    } catch (err) {
        console.error(err);
    }
}

/* View Feedback */
function viewFeedback(message) {
    alert(message);
}

/* Edit Feedback */
async function editFeedback(id, oldMessage) {
    const newMessage = prompt("Edit feedback:", oldMessage);

    if (!newMessage) return;

    await fetch(`/api/feedback/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({ message: newMessage })
    });

    loadFeedback();
}

/* Delete Feedback */
async function deleteFeedback(id) {
    const confirmDelete = confirm("Are you sure?");

    if (!confirmDelete) return;

    await fetch(`/api/feedback/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token
        }
    });

    loadFeedback();
}

/* Initial Load */
loadFeedback();