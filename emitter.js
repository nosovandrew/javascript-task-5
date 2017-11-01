'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
getEmitter.isStar = false;
module.exports = getEmitter;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let subscriptions = {};

    function parseEvents(event) {
        let allEvents = [];
        let parse = event.split('.');
        let current = '';
        for (let i = 0; i < parse.length; i++) {
            current += '.' + parse[i];
            if (parse[i]) {
                allEvents.push(current.substring(1, current.length));
            }
        }

        return allEvents.reverse();
    }

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         */

        on: function (event, context, handler) {
            if (!(event in subscriptions)) {
                subscriptions[event] = [];
            }
            subscriptions[event].push({ context, handler });

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         */

        off: function (event, context) {
            let commands = Object.keys(subscriptions).filter(command =>
                command.startsWith(event) || command === event);
            commands.forEach((el) => {
                subscriptions[el] = subscriptions[el]
                    .filter(sub =>
                        sub.context !== context
                    );
            });

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         */

        emit: function (event) {
            let commands = parseEvents(event);
            for (let el of commands) {
                if (subscriptions[el]) {
                    subscriptions[el].forEach((sub) => {
                        sub.handler.call(sub.context);
                    });
                }
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */

        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */

        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}
