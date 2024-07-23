const API_KEY = import.meta.env.VITE_API_KEY;

// ParticlesJS configuration
const particlesConfig = {
	particles: {
		number: { value: 180, density: { enable: true, value_area: 500 } },
		color: { value: "#ffffff" },
		shape: {
			type: "circle",
			stroke: { width: 0, color: "#000000" },
			polygon: { nb_sides: 5 },
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
};

particlesJS("particles-js", particlesConfig);

// DOM selections
const elements = {
	showInfo: document.querySelector("#showInfo"),
	titleDom: document.querySelector("#title"),
	imgDom: document.querySelector("#img"),
	explanationDom: document.querySelector("#explanation"),
	modal: document.querySelector(".modal-con"),
	overlay: document.querySelector(".overlay-mod"),
	btnCloseModal: document.querySelector(".modal-con__close"),
	btnShowModal: document.querySelector(".show-modal"),
	dateInput: document.querySelector("#date-input"),
};

// Event listeners
const addEventListeners = () => {
	elements.showInfo.addEventListener("click", loadInfo);
	elements.btnShowModal.addEventListener("click", toggleModal);
	elements.btnCloseModal.addEventListener("click", toggleModal);
	elements.overlay.addEventListener("click", toggleModal);
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && !elements.modal.classList.contains("hidden")) {
			toggleModal();
		}
	});
};

const toggleModal = () => {
	elements.modal.classList.toggle("hidden");
	elements.overlay.classList.toggle("hidden");
};

const loadInfo = async () => {
	const dateInput = elements.dateInput.value;

	try {
		elements.imgDom.innerHTML = `<img src="https://technometrics.net/wp-content/uploads/2020/11/loading-icon-animated-gif-19-1.gif" alt="loading..." />`;
		const response = await fetch(
			`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${dateInput}`,
		);
		const data = await response.json();
		showData(data.title, data.hdurl || data.url, data.explanation);
	} catch (error) {
		showErr();
		console.error("Error loading data:", error);
	}
};

const showData = (title, mediaUrl, explanation) => {
	elements.titleDom.className = "modal-con__title alert alert-info";
	elements.titleDom.textContent = title;

	const mediaType = mediaUrl.match(/\.(jpeg|jpg|gif|png)$/)
		? "image"
		: mediaUrl.includes("youtube.com")
			? "video"
			: "unknown";

	switch (mediaType) {
		case "image":
			elements.imgDom.innerHTML = `<img src="${mediaUrl}" alt="${title}" />`;
			break;
		case "video":
			const videoId = getYouTubeVideoId(mediaUrl);
			elements.imgDom.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
			break;
		default:
			elements.imgDom.innerHTML = `<img src="https://image.freepik.com/free-vector/404-error-design-with-astronaut_23-2147734936.jpg" alt="404 Resource Not Found." />`;
	}

	elements.explanationDom.textContent = explanation;
};

const showErr = () => {
	elements.titleDom.className = "alert alert-danger";
	elements.titleDom.textContent = "Oops! Houston, we've had a problem.";
	elements.imgDom.innerHTML =
		'<img src="https://image.freepik.com/free-vector/404-error-design-with-astronaut_23-2147734936.jpg" alt="404 Resource Not Found." />';
	elements.explanationDom.className = "error-text";
	elements.explanationDom.textContent =
		"An unknown error has occurred. Please try again or set a different date.";
};

const getYouTubeVideoId = (url) => {
	const match = url.match(
		/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
	);
	return match ? match[1] : null;
};

document.addEventListener("DOMContentLoaded", () => {
	const today = new Date();
	const formattedDate = today.toISOString().split("T")[0];
	elements.dateInput.value = formattedDate;
	addEventListeners();
});
