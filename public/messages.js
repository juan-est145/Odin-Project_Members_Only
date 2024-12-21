const modalBtn = document.getElementById("msgBtn");
const modal = document.getElementById("postMessage");

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