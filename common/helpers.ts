// Generate a random hex color string
const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const helpers = {
    randomColor
};
