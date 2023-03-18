const fs = require('fs')

fs.writeFile("output.txt", `output:`, (err ) => {
    if (err) return console.log(err);
})

const stringTokens = [
    "#price", // ключ перевода price
    " ", // неизменяемый текст
    ["@plural", "#day", "$tripDays"], // функция плюрализации, в которую передаётся ключ перевода и переменная в качестве числового значения
    " - ", // неизменяемый текст
    ["@number", "$tripPrice", "USD"], // функция интернационализации, в которую  передаётся число в качестве переменной и валюта
    "@date", // функция интернационализации, в которую  передаётся дата в качестве переменной
    "@list",
]

const variables = {
    tripDays: 10,
    tripPrice: 56789.01,
    item: "Car",
}

const translations = {
    "ru-RU" : {             // локаль
        price: "Цена",        // обычный перевод
        day: {                // c учетом плюральных форм
            zero: " дней",
            one: " день",
            few: " дня",
            many: " дней",
            other: " дней",
        },
        date: date(),
        number: number(56789.01, ["RUB"]),
        bus: "Автобус",
    },
    "en-US": {
        price: "Price",
        day: {
            zero: " days",
            one: " day",
            few: " day",
            many: " days",
            other: " days",
        },
        date: date(),
        number: number(56789.01, ["USD"]),
        bus: "Bus",
    },
    "de-DE": {
        price: "Preis",
        day: {
            zero: " tage",
            one: " tag",
            few: " tag",
            many: " tage",
            other: " tage",
        },
        date: date(),
        number: number(56789.01, ["EUR"]),
        bus: "Bus",
    },
}

function date(value) {
     return new Intl.DateTimeFormat([], {
        weekday: "long",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
    }).format(value)
}

function number(value, [currency]) {
    return new Intl.NumberFormat(currency, { style: 'currency', currency: currency }).format(value)
}

function plural(key, number) {
    return new Intl.NumberFormat(key).format(number)
}

function list(...args) {
    return new Intl.ListFormat([], { style: 'long', type: 'conjunction' }).format(args)
}

function relativeTime(value, unit) {
    return Intl.RelativeTimeFormat([], { style: 'narrow' }).format(value, `${unit}`)
}

module.exports = function getI18nText({ stringTokens, variables, translations, locale }) {
    const i18nText = `${stringTokens} ${variables} ${translations} ${locale}` // дописать

    return i18nText // строка
}
