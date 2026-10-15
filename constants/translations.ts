import type { INavbarTranslations } from '@/types/translations';

/**
 * Static translation dictionary for navigation items keyed by uppercase language code.
 */
export const NAVBAR_TRANSLATIONS: Readonly<Record<string, INavbarTranslations>> = {
  EN: {
    bookAppointment: 'BOOK APPOINTMENT',
    contact: 'CONTACT',
    chatWithJ2: 'CHAT WITH J2',
  },
  FR: {
    bookAppointment: 'PRENDRE RENDEZ-VOUS',
    contact: 'CONTACT',
    chatWithJ2: 'DISCUTER AVEC J2',
  },
  ES: {
    bookAppointment: 'RESERVAR CITA',
    contact: 'CONTACTO',
    chatWithJ2: 'CHATEAR CON J2',
  },
} as const;
