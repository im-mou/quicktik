import { uuid as uuidv4, fromString } from 'uuidv4';

/**
 * Generate a random hex color string
 * @returns color hex value
 */
const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

/**
 * Generate a uuid
 * @param string optional - seed value
 * @returns String uuidv4
 */
const uuid = (string?: string) => {
    if (string) {
        return fromString(string);
    } else {
        return uuidv4();
    }
};

// opt-out of image optimization, no-op
const imageLoader = ({ src }: { src: string }) => {
    return src;
};

export const helpers = {
    randomColor,
    uuid,
    imageLoader
};
