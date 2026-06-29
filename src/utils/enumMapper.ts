export const typeMap: Record<string, string> = {
    study_period: 'Справка об обучении',
    study_period_en: 'Справка об обучении (англ.)',
    call: 'Справка-вызов',
    name_change: 'Справка о смене ФИО',
    mvd: 'Справка в МВД (ФМС)',
    recommendation_letter: 'Реком. письмо',
    common: 'Иная',
};

export const obtainMap: Record<string, string> = {
    Electronic: 'Электронный',
    Paper: 'Бумажный',
};

export const nationalityMap: Record<string, string> = {
    domestic: 'РФ',
    foreign: 'Иностранный',
};

export const fundingMap: Record<string, string> = {
    budget: 'Бюджет',
    contract: 'Платное',
};

export const educationFormMap: Record<string, string> = {
    full_time: 'Очная',
    part_time: 'Заочная',
    remote: 'Дистанционная',
};

export const studentPositionStatusMap: Record<string, string> = {
    active: 'Активен',
    suspended: 'Приостановлен',
    ended: 'Завершён',
};
