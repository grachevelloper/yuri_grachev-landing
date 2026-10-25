import { contacts } from '../../shared/config/contacts';

export const contactContent = {
  kicker: 'ПРАКТИЧЕСКАЯ ИНФОРМАЦИЯ',
  title: 'Условия и формат',
  meetingKicker: 'ПЕРВАЯ ВСТРЕЧА',
  meetingTitle: 'Записаться на первую встречу',
  meetingDescription:
    'Чтобы договориться о первой встрече, достаточно написать в Telegram или MAX. Время и формат обсудим в переписке.',
  telegramCta: 'Написать в Telegram',
  maxCta: 'Написать в MAX',
  meta: 'Очно и онлайн  ·  45–50 минут  ·  3 500 ₽',
};

export const conditions = [
  { label: 'ОЧНО', value: contacts.address, isAddress: true },
  {
    label: 'ОНЛАЙН',
    mobilePrefix: 'А ТАКЖЕ ',
    value: 'В спокойном месте, где вам будет удобно говорить',
  },
  { label: 'ДЛИТЕЛЬНОСТЬ СЕССИИ', value: '45–50 минут' },
  { label: 'СТОИМОСТЬ СЕССИИ', value: '3 500 ₽' },
];
