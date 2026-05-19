const ERROR_MSG_400 = 'Ошибка клиента';
const ERROR_MSG_401 = 'Требуется повторная авторизация';
const ERROR_MSG_403 = 'У вас нет прав на это действие';
const ERROR_MSG_404 = 'Ресурс не найден';
const ERROR_MSG_500 = 'Ошибка сервера';
const DEFAULT_MSG = 'Не удалось обработать запрос';

export const errors = {
    client: ERROR_MSG_400,
    auth: ERROR_MSG_401,
    forbidden: ERROR_MSG_403,
    not_found: ERROR_MSG_404,
    internal_server: ERROR_MSG_500,
    default: DEFAULT_MSG,
};
