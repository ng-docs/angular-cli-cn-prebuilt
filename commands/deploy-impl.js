"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployCommand = void 0;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const architect_command_1 = require("../models/architect-command");
const BuilderMissing = `

未找到指定项目的目标 "deploy"。

你可以添加一个能提供发布到目标平台的能力的包。

比如：
  ng add @angular/fire
  ng add @azure/ng-deploy
  ng add @zeit/ng-deploy

可以在 npm 上寻找更多包：https://www.npmjs.com/search?q=ng%20deploy
`;
class DeployCommand extends architect_command_1.ArchitectCommand {
    constructor() {
        super(...arguments);
        this.target = 'deploy';
        this.missingTargetError = BuilderMissing;
    }
    async run(options) {
        return this.runArchitectTarget(options);
    }
    async initialize(options) {
        if (!options.help) {
            return super.initialize(options);
        }
    }
}
exports.DeployCommand = DeployCommand;
