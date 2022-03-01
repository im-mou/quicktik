import { loadEnvConfig } from '@next/env';
import path from 'path';

export default async () => {
    loadEnvConfig(path.join(process.cwd(), '..', '..'));
};
