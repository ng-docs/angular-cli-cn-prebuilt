"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigCommand = void 0;
const core_1 = require("@angular-devkit/core");
const uuid_1 = require("uuid");
const command_1 = require("../models/command");
const interface_1 = require("../models/interface");
const config_1 = require("../utilities/config");
const json_file_1 = require("../utilities/json-file");
const validCliPaths = new Map([
    ['cli.warnings.versionMismatch', undefined],
    ['cli.defaultCollection', undefined],
    ['cli.packageManager', undefined],
    ['cli.analytics', undefined],
    ['cli.analyticsSharing.tracking', undefined],
    ['cli.analyticsSharing.uuid', v => v ? `${v}` : uuid_1.v4()],
]);
/**
 * Splits a JSON path string into fragments. Fragments can be used to get the value referenced
 * by the path. For example, a path of "a[3].foo.bar[2]" would give you a fragment array of
 * ["a", 3, "foo", "bar", 2].
 * @param path The JSON string to parse.
 * @returns {(string|number)[]} The fragments for the string.
 * @private
 */
function parseJsonPath(path) {
    const fragments = (path || '').split(/\./g);
    const result = [];
    while (fragments.length > 0) {
        const fragment = fragments.shift();
        if (fragment == undefined) {
            break;
        }
        const match = fragment.match(/([^\[]+)((\[.*\])*)/);
        if (!match) {
            throw new Error('无效的 JSON 路径。');
        }
        result.push(match[1]);
        if (match[2]) {
            const indices = match[2]
                .slice(1, -1)
                .split('][')
                .map(x => (/^\d$/.test(x) ? +x : x.replace(/\"|\'/g, '')));
            result.push(...indices);
        }
    }
    return result.filter(fragment => fragment != null);
}
function normalizeValue(value) {
    const valueString = `${value}`.trim();
    if (valueString === 'true') {
        return true;
    }
    else if (valueString === 'false') {
        return false;
    }
    else if (isFinite(+valueString)) {
        return +valueString;
    }
    return value || undefined;
}
class ConfigCommand extends command_1.Command {
    async run(options) {
        const level = options.global ? 'global' : 'local';
        if (!options.global) {
            await this.validateScope(interface_1.CommandScope.InProject);
        }
        let [config] = config_1.getWorkspaceRaw(level);
        if (options.global && !config) {
            try {
                if (config_1.migrateLegacyGlobalConfig()) {
                    config = config_1.getWorkspaceRaw(level)[0];
                    this.logger.info(core_1.tags.oneLine `
            我们发现一个全局配置是给 Angular CLI 1 用的。
            我们已经把它自动迁移了。`);
                }
            }
            catch (_a) { }
        }
        if (options.value == undefined) {
            if (!config) {
                this.logger.error('未找到配置。');
                return 1;
            }
            return this.get(config, options);
        }
        else {
            return this.set(options);
        }
    }
    get(jsonFile, options) {
        let value;
        if (options.jsonPath) {
            value = jsonFile.get(parseJsonPath(options.jsonPath));
        }
        else {
            value = jsonFile.content;
        }
        if (value === undefined) {
            this.logger.error('未找到值。');
            return 1;
        }
        else if (typeof value === 'string') {
            this.logger.info(value);
        }
        else {
            this.logger.info(JSON.stringify(value, null, 2));
        }
        return 0;
    }
    async set(options) {
        var _a, _b, _c;
        if (!((_a = options.jsonPath) === null || _a === void 0 ? void 0 : _a.trim())) {
            throw new Error('无效的路径。');
        }
        if (options.global &&
            !options.jsonPath.startsWith('schematics.') &&
            !validCliPaths.has(options.jsonPath)) {
            throw new Error('无效的路径。');
        }
        const [config, configPath] = config_1.getWorkspaceRaw(options.global ? 'global' : 'local');
        if (!config || !configPath) {
            this.logger.error('配置文件未找到。');
            return 1;
        }
        const jsonPath = parseJsonPath(options.jsonPath);
        const value = (_c = (_b = validCliPaths.get(options.jsonPath)) === null || _b === void 0 ? void 0 : _b(options.value)) !== null && _c !== void 0 ? _c : options.value;
        const modified = config.modify(jsonPath, normalizeValue(value));
        if (!modified) {
            this.logger.error('值未找到。');
            return 1;
        }
        try {
            await config_1.validateWorkspace(json_file_1.parseJson(config.content));
        }
        catch (error) {
            this.logger.fatal(error.message);
            return 1;
        }
        config.save();
        return 0;
    }
}
exports.ConfigCommand = ConfigCommand;
