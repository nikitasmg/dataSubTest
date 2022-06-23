// Алгоритм Луна для проверки корректности номера карты
export const luhnCheck = (imei) => {
    return !/^\d+$/.test(imei) || (imei.split('').reduce(function (sum, d, n) {
        return sum + parseInt(((n + imei.length) % 2) ? d : [0, 2, 4, 6, 8, 1, 3, 5, 7, 9][d]);
    }, 0)) % 10 === 0;
};