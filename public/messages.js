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

msgBoard.addEventListener("click", (e) => {
	if (!e.target.classList.contains("delBtn"))
		return;
	alert(`You clicked on button ${e.target.dataset.id}`);
	// Implement request logic
});