"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwesomeCommand = void 0;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const command_1 = require("../models/command");
const color_1 = require("../utilities/color");
function pickOne(of) {
    return of[Math.floor(Math.random() * of.length)];
}
class AwesomeCommand extends command_1.Command {
    async run() {
        const phrase = pickOne([
            `你已经有了，我啥也不用做。`,
            `我们来看看哈……没事，一切 OK！`,
            `你做得很好。`,
            `你已经做得很好了。`,
            `无事可做，已经很棒了。退出。`,
            `错误 418：你最棒了！`,
            `哇，在我的小眼睛里看到一个伟大的程序员！`,
            `无事可做……已经很棒了。`,
        ]);
        this.logger.info(color_1.colors.green(phrase));
    }
}
exports.AwesomeCommand = AwesomeCommand;
