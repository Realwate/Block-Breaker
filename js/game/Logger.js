define(["config"], function (config) {
    'use strict';

    class Logger {
        constructor() {
        }
        setLevel(level) {
            Logger.THRESHOLD = level;
        }
        setHandle(handle) {
            this.handle = handle;
        }
        useDefaults() {
            this.handle = createDefaultHandle();
            Logger.THRESHOLD = Logger.DEBUG;
            if (config.env == "production") {
                Logger.THRESHOLD = Logger.OFF;
            }
        }
        enableDebugMode() {
            return Logger.THRESHOLD == Logger.DEBUG;
        }
        log(...args) {
            this.invoke(Logger.DEBUG, args);
        }
        debug(...args) {
            this.invoke(Logger.DEBUG, args);
        }
        info(...args) {
            this.invoke(Logger.INFO, args);
        }
        warn(...args) {
            this.invoke(Logger.WARN, args);
        }
        error(...args) {
            this.invoke(Logger.ERROR, args);
            throw new Error(args[0])
        }
        invoke(level, args) {
            if (level.value < Logger.THRESHOLD.value) {
                return;
            }
            this.handle(level, args);
        }
        static getInstance() {
            return instance;
        }
    }

    var createDefaultHandle = function () {
        function getStyleStr(color, size = "12px") {
            return `color: ${color}; font-size: ${size}`;
        }
        var styleMap = {
            DEBUG: getStyleStr("seagreen"),
            INFO: getStyleStr("dodgerblue"),
            WARN: getStyleStr("orange"),
            ERROR: getStyleStr("red", "14px"),
        }
        function getPrefix({ name }) {
            return [`%c${getTime()}-[${name}]: `.padEnd(20), styleMap[name]]
        }
        function getTime() {
            return new Date().toLocaleTimeString();
        }

        return function (level, args) {
            // var type = level.name.toLowerCase();
            var prefix = getPrefix(level);
            // console[type].apply(console,prefix.concat(args))
            console["log"].apply(console, prefix.concat(args))
        }
    }

    var defineLevel = function (name, value) {
        Logger[name] = { name, value };
    }
    defineLevel("DEBUG", 1);
    defineLevel("INFO", 5);
    defineLevel("WARN", 10);
    defineLevel("ERROR", 20);
    defineLevel("OFF", 30);

    var instance = new Logger();
    instance.useDefaults();

    return Logger;
});
