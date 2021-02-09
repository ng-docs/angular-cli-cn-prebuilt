/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ArchitectCommand, ArchitectCommandOptions } from '../models/architect-command';
import { Arguments } from '../models/interface';
import { Schema as DeployCommandSchema } from './deploy';
export declare class DeployCommand extends ArchitectCommand<DeployCommandSchema> {
    readonly target = "deploy";
    readonly missingTargetError = "\n\n\u672A\u627E\u5230\u6307\u5B9A\u9879\u76EE\u7684\u76EE\u6807 \"deploy\"\u3002\n\n\u4F60\u53EF\u4EE5\u6DFB\u52A0\u4E00\u4E2A\u80FD\u63D0\u4F9B\u53D1\u5E03\u5230\u76EE\u6807\u5E73\u53F0\u7684\u80FD\u529B\u7684\u5305\u3002\n\n\u6BD4\u5982\uFF1A\n  ng add @angular/fire\n  ng add @azure/ng-deploy\n  ng add @zeit/ng-deploy\n\n\u53EF\u4EE5\u5728 npm \u4E0A\u5BFB\u627E\u66F4\u591A\u5305\uFF1Ahttps://www.npmjs.com/search?q=ng%20deploy\n";
    run(options: ArchitectCommandOptions & Arguments): Promise<number>;
    initialize(options: DeployCommandSchema & Arguments): Promise<void>;
}
