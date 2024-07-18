const API_KEY = import.meta.env.VITE_API_KEY;

particlesJS("particles-js", {
	particles: {
		number: { value: 180, density: { enable: true, value_area: 500 } },
		color: { value: "#ffffff" },
		shape: {
			type: "circle",
			stroke: { width: 0, color: "#000000" },
			polygon: { nb_sides: 5 },
			// "image": { "src": "img/github.svg", "width": 100, "height": 100 }
		},
		opacity: {
			value: 1,
			random: true,
			anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
		},
		size: {
			value: 3,
			random: true,
			anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
		},
		line_linked: {
			enable: false,
			distance: 150,
			color: "#ffffff",
			opacity: 0.4,
			width: 1,
		},
		move: {
			enable: true,
			speed: 1,
			direction: "none",
			random: true,
			straight: false,
			out_mode: "out",
			bounce: false,
			attract: { enable: false, rotateX: 600, rotateY: 600 },
		},
	},
	interactivity: {
		detect_on: "canvas",
		events: {
			onhover: { enable: true, mode: "bubble" },
			onclick: { enable: true, mode: "repulse" },
			resize: true,
		},
		modes: {
			grab: { distance: 400, line_linked: { opacity: 1 } },
			bubble: { distance: 250, size: 0, duration: 2, opacity: 0, speed: 3 },
			repulse: { distance: 400, duration: 0.4 },
			push: { particles_nb: 4 },
			remove: { particles_nb: 2 },
		},
	},
	retina_detect: true,
});

// API HTML SELECTIONS
const showInfo = document.querySelector("#showInfo");
const titleDom = document.querySelector("#title");
const imgDom = document.querySelector("#img");
const explanationDom = document.querySelector("#explanation");

// MODAL SELECTIONS
const modal = document.querySelector(".modal-con");
const overlay = document.querySelector(".overlay-mod");
const btnCloseModal = document.querySelector(".modal-con__close");
const btnShowModal = document.querySelector(".show-modal");

//API FUNCTIONS
showInfo.addEventListener("click", () => {
	loadInfo();
});
async function loadInfo() {
	const dateInput = document.querySelector("#date-input").value;

	try {
		const response = await fetch(
			`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${dateInput}&start_date=&end_date=&count=&thumbs`,
		);
		const data = await response.json();

		const title = data.title;
		const img = data.hdurl;
		const explanation = data.explanation;
		showData(title, img, explanation);
	} catch (error) {
		// handle error
		showErr();
		console.error(error);
	}
}
function showData(title, img, explanation) {
	titleDom.classList.remove("alert", "alert-danger");
	explanationDom.classList.remove("error-text");
	titleDom.classList.add("alert", "alert-info");
	titleDom.textContent = title;
	imgDom.src = img;
	explanationDom.textContent = explanation;
}
function showErr() {
	titleDom.classList.add("alert", "alert-danger");
	titleDom.textContent = "Oops!. Houston, we've had a problem here.";
	// imgDom.src = "../img/errorImg.jpg";
	imgDom.src =
		"https://image.freepik.com/free-vector/404-error-design-with-astronaut_23-2147734936.jpg";
	explanationDom.classList.add("error-text");
	explanationDom.textContent =
		"No information available. Please, search again with another date.";
}

//MODAL FUNCTIONS
const openModal = () => {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};
const closeModal = () => {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

btnShowModal.addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});
