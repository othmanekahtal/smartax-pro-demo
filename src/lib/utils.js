import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => twMerge(clsx(inputs));
export const fmtCapital = (n) => new Intl.NumberFormat('fr-MA').format(n) + ' DH';
