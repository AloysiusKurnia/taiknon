import crypto from 'crypto';

export function hash(str: string) {
    return crypto.createHash('sha256').update(str).digest('base64');
}