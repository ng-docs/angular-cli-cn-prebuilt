"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommand = void 0;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const tools_1 = require("@angular-devkit/schematics/tools");
const path_1 = require("path");
const semver_1 = require("semver");
const schema_1 = require("../lib/config/schema");
const analytics_1 = require("../models/analytics");
const schematic_command_1 = require("../models/schematic-command");
const color_1 = require("../utilities/color");
const install_package_1 = require("../utilities/install-package");
const package_manager_1 = require("../utilities/package-manager");
const package_metadata_1 = require("../utilities/package-metadata");
const spinner_1 = require("../utilities/spinner");
const npa = require('npm-package-arg');
class AddCommand extends schematic_command_1.SchematicCommand {
    constructor() {
        super(...arguments);
        this.allowPrivateSchematics = true;
    }
    async initialize(options) {
        if (options.registry) {
            return super.initialize({ ...options, packageRegistry: options.registry });
        }
        else {
            return super.initialize(options);
        }
    }
    async run(options) {
        var _a;
        package_manager_1.ensureCompatibleNpm();
        if (!options.collection) {
            this.logger.fatal(`"ng add" 需要指定一个名字参数，比如 ` +
                `${color_1.colors.yellow('ng add [name] ')}。 欲知详情，请使用 "ng help"。`);
            return 1;
        }
        let packageIdentifier;
        try {
            packageIdentifier = npa(options.collection);
        }
        catch (e) {
            this.logger.error(e.message);
            return 1;
        }
        if (packageIdentifier.registry && this.isPackageInstalled(packageIdentifier.name)) {
            let validVersion = false;
            const installedVersion = await this.findProjectVersion(packageIdentifier.name);
            if (installedVersion) {
                if (packageIdentifier.type === 'range') {
                    validVersion = semver_1.satisfies(installedVersion, packageIdentifier.fetchSpec);
                }
                else if (packageIdentifier.type === 'version') {
                    const v1 = semver_1.valid(packageIdentifier.fetchSpec);
                    const v2 = semver_1.valid(installedVersion);
                    validVersion = v1 !== null && v1 === v2;
                }
                else if (!packageIdentifier.rawSpec) {
                    validVersion = true;
                }
            }
            if (validVersion) {
                // Already installed so just run schematic
                this.logger.info('跳过安装：此包已安装过。');
                return this.executeSchematic(packageIdentifier.name, options['--']);
            }
        }
        const spinner = new spinner_1.Spinner();
        spinner.start('正在选择包管理器...');
        const packageManager = await package_manager_1.getPackageManager(this.context.root);
        const usingYarn = packageManager === schema_1.PackageManager.Yarn;
        spinner.info(`正在使用包管理器：${color_1.colors.grey(packageManager)}`);
        if (packageIdentifier.type === 'tag' && !packageIdentifier.rawSpec) {
            // only package name provided; search for viable version
            // plus special cases for packages that did not have peer deps setup
            spinner.start('正在查找包的兼容版本...');
            let packageMetadata;
            try {
                packageMetadata = await package_metadata_1.fetchPackageMetadata(packageIdentifier.name, this.logger, {
                    registry: options.registry,
                    usingYarn,
                    verbose: options.verbose,
                });
            }
            catch (e) {
                spinner.fail('无法从 Registry 加载包信息：' + e.message);
                return 1;
            }
            const latestManifest = packageMetadata.tags['latest'];
            if (latestManifest && Object.keys(latestManifest.peerDependencies).length === 0) {
                if (latestManifest.name === '@angular/pwa') {
                    const version = await this.findProjectVersion('@angular/cli');
                    const semverOptions = { includePrerelease: true };
                    if (version &&
                        ((semver_1.validRange(version) && semver_1.intersects(version, '7', semverOptions)) ||
                            (semver_1.valid(version) && semver_1.satisfies(version, '7', semverOptions)))) {
                        packageIdentifier = npa.resolve('@angular/pwa', '0.12');
                    }
                }
                else {
                    packageIdentifier = npa.resolve(latestManifest.name, latestManifest.version);
                }
                spinner.succeed(`已找到兼容的包版本：${color_1.colors.grey(packageIdentifier)}.`);
            }
            else if (!latestManifest || (await this.hasMismatchedPeer(latestManifest))) {
                // 'latest' is invalid so search for most recent matching package
                const versionManifests = Object.values(packageMetadata.versions).filter((value) => !semver_1.prerelease(value.version) && !value.deprecated);
                versionManifests.sort((a, b) => semver_1.rcompare(a.version, b.version, true));
                let newIdentifier;
                for (const versionManifest of versionManifests) {
                    if (!(await this.hasMismatchedPeer(versionManifest))) {
                        newIdentifier = npa.resolve(packageIdentifier.name, versionManifest.version);
                        break;
                    }
                }
                if (!newIdentifier) {
                    spinner.warn("未找到兼容的包版本，使用 'latest'。");
                }
                else {
                    packageIdentifier = newIdentifier;
                    spinner.succeed(`已找到兼容的包版本：${color_1.colors.grey(packageIdentifier)}.`);
                }
            }
            else {
                packageIdentifier = npa.resolve(latestManifest.name, latestManifest.version);
                spinner.succeed(`已找到兼容的包版本：${color_1.colors.grey(packageIdentifier)}.`);
            }
        }
        let collectionName = packageIdentifier.name;
        let savePackage;
        try {
            spinner.start('正在从注册表加载包信息...');
            const manifest = await package_metadata_1.fetchPackageManifest(packageIdentifier, this.logger, {
                registry: options.registry,
                verbose: options.verbose,
                usingYarn,
            });
            savePackage = (_a = manifest['ng-add']) === null || _a === void 0 ? void 0 : _a.save;
            collectionName = manifest.name;
            if (await this.hasMismatchedPeer(manifest)) {
                spinner.warn('包没有符合条件的同级依赖。添加的包可能不会成功。');
            }
            else {
                spinner.succeed(`包信息已加载。`);
            }
        }
        catch (e) {
            spinner.fail(`无法获取包 '${packageIdentifier}' 的信息：${e.message}`);
            return 1;
        }
        try {
            spinner.start('正在安装包...');
            if (savePackage === false) {
                // Temporary packages are located in a different directory
                // Hence we need to resolve them using the temp path
                const tempPath = install_package_1.installTempPackage(packageIdentifier.raw, undefined, packageManager, options.registry ? [`--registry="${options.registry}"`] : undefined);
                const resolvedCollectionPath = require.resolve(path_1.join(collectionName, 'package.json'), {
                    paths: [tempPath],
                });
                collectionName = path_1.dirname(resolvedCollectionPath);
            }
            else {
                install_package_1.installPackage(packageIdentifier.raw, undefined, packageManager, savePackage, options.registry ? [`--registry="${options.registry}"`] : undefined);
            }
            spinner.succeed('Package successfully installed.');
        }
        catch (error) {
            spinner.fail(`Package installation failed: ${error.message}`);
            return 1;
        }
        return this.executeSchematic(collectionName, options['--']);
    }
    async reportAnalytics(paths, options, dimensions = [], metrics = []) {
        const collection = options.collection;
        // Add the collection if it's safe listed.
        if (collection && analytics_1.isPackageNameSafeForAnalytics(collection)) {
            dimensions[core_1.analytics.NgCliAnalyticsDimensions.NgAddCollection] = collection;
        }
        else {
            delete dimensions[core_1.analytics.NgCliAnalyticsDimensions.NgAddCollection];
        }
        return super.reportAnalytics(paths, options, dimensions, metrics);
    }
    isPackageInstalled(name) {
        try {
            require.resolve(path_1.join(name, 'package.json'), { paths: [this.context.root] });
            return true;
        }
        catch (e) {
            if (e.code !== 'MODULE_NOT_FOUND') {
                throw e;
            }
        }
        return false;
    }
    async executeSchematic(collectionName, options = []) {
        const runOptions = {
            schematicOptions: options,
            collectionName,
            schematicName: 'ng-add',
            dryRun: false,
            force: false,
        };
        try {
            return await this.runSchematic(runOptions);
        }
        catch (e) {
            if (e instanceof tools_1.NodePackageDoesNotSupportSchematics) {
                this.logger.error(core_1.tags.oneLine `
        你正在试图添加的包不支持原理图。你可以尝试此包的其它版本，或联系包的作者添加对 ng-add 的支持。
        `);
                return 1;
            }
            throw e;
        }
    }
    async findProjectVersion(name) {
        let installedPackage;
        try {
            installedPackage = require.resolve(path_1.join(name, 'package.json'), {
                paths: [this.context.root],
            });
        }
        catch (_a) { }
        if (installedPackage) {
            try {
                const installed = await package_metadata_1.fetchPackageManifest(path_1.dirname(installedPackage), this.logger);
                return installed.version;
            }
            catch (_b) { }
        }
        let projectManifest;
        try {
            projectManifest = await package_metadata_1.fetchPackageManifest(this.context.root, this.logger);
        }
        catch (_c) { }
        if (projectManifest) {
            const version = projectManifest.dependencies[name] || projectManifest.devDependencies[name];
            if (version) {
                return version;
            }
        }
        return null;
    }
    async hasMismatchedPeer(manifest) {
        for (const peer in manifest.peerDependencies) {
            let peerIdentifier;
            try {
                peerIdentifier = npa.resolve(peer, manifest.peerDependencies[peer]);
            }
            catch (_a) {
                this.logger.warn(`包中发现了无效的同级依赖 ${peer}。`);
                continue;
            }
            if (peerIdentifier.type === 'version' || peerIdentifier.type === 'range') {
                try {
                    const version = await this.findProjectVersion(peer);
                    if (!version) {
                        continue;
                    }
                    const options = { includePrerelease: true };
                    if (!semver_1.intersects(version, peerIdentifier.rawSpec, options) &&
                        !semver_1.satisfies(version, peerIdentifier.rawSpec, options)) {
                        return true;
                    }
                }
                catch (_b) {
                    // Not found or invalid so ignore
                    continue;
                }
            }
            else {
                // type === 'tag' | 'file' | 'directory' | 'remote' | 'git'
                // Cannot accurately compare these as the tag/location may have changed since install
            }
        }
        return false;
    }
}
exports.AddCommand = AddCommand;
