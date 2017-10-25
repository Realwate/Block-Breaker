define(["util"], function (util) {
    'use strict';

    class TaskQueue {
        constructor() {
            this.tasks = {
                count: [],
                time: []
            };
        }
        doTaskAfterCount(handle, count) {
            this.tasks.count.push({ handle: handle, count: count });
        }
        doTaskAfterSeconds(handle, second) {
            setTimeout(handle, second * 1000)
        }
        execute() {
            this.tasks.count.forEach((e, i, arr) => {
                if (e.count-- <= 0) {
                    e.handle();
                    arr.splice(i, 1);
                }
            })
        }
    }
    return TaskQueue;
});
