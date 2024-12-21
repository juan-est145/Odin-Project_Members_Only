const modalBtn = document.getElementById("msgBtn");
const modal = document.getElementById("postMessage");
const msgBoard = document.getElementsByClassName("messageBoard")[0];

modalBtn.addEventListener("click", () => {
	modal.showModal();
});

modal.addEventListener("click", (e) => {
	const modalDimension = modal.getBoundingClientRect();
	if (
		e.clientX < modalDimension.left ||
		e.clientX > modalDimension.right ||
		e.clientY < modalDimension.top ||
		e.clientY > modalDimension.bottom
	)
		modal.close();
});

msgBoard.addEventListener("click", async (e) => {
	if (!e.target.classList.contains("delBtn"))
		return;
	const body = new URLSearchParams();
	body.append("id", e.target.dataset.id);
	const response = await fetch("/messages/delete", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: body.toString(),
	});
	if (response.status === 401) {
		alert("You do not have the necessary privileges to delete this message.");
        window.location.href = "/messages";
	}
	else {
		const data = await response.json();
		alert(data.message);
		window.location.reload();
	}
});