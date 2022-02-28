import { uuid as uuidv4, fromString } from 'uuidv4';

/**
 * Generate a random hex color string
 * @returns color hex value
 */
const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

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

/**
 * Gets the value of an environment variable.
 * @param envKey env variable key
 * @param fallback fallback value if key doesn't exist in .env
 * @returns Environment variable value.
 */
const env = (envKey: string, fallback: any) => {
    if (!process.env?.[envKey]) {
        return fallback;
    } else {
        return process.env[envKey];
    }
};

export const helpers = {
    randomColor,
    uuid,
    imageLoader,
    env
};
