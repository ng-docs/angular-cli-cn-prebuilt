"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractI18nCommand = void 0;
const architect_command_1 = require("../models/architect-command");
class ExtractI18nCommand extends architect_command_1.ArchitectCommand {
    constructor() {
        super(...arguments);
        this.target = 'extract-i18n';
    }
    async run(options) {
        const version = process.version.substr(1).split('.');
        if (Number(version[0]) === 12 && Number(version[1]) === 0) {
            this.logger.error('由于 Node.js 12.0 中的缺陷, 该命令不能支持此版本。'
                + '请升级到 Node.js 12.1 或更新版本。');
            return 1;
        }
        const commandName = process.argv[2];
        if (['xi18n', 'i18n-extract'].includes(commandName)) {
            this.logger.warn(`警告："ng ${commandName}" 已经弃用，并且会在未来的主版本中移除。请使用 "ng extract-i18n" 代替。`);
        }
        return this.runArchitectTarget(options);
    }
}
exports.ExtractI18nCommand = ExtractI18nCommand;
