/**
 * Updates your application and its dependencies. See https://update.angular.io/
 *
 * 更新你的应用及其依赖。参见 https://update.angular.io/
 */
export interface Schema {
    /**
     * Whether to update all packages in package.json.
     *
     * 是否更新 package.json 中的所有包。
     */
    all?: boolean;
    /**
     * Whether to allow updating when the repository contains modified or untracked files.
     *
     * 是否允许本仓库包含已修改或未跟踪的文件时进行更新。
     */
    allowDirty?: boolean;
    /**
     * Create source control commits for updates and migrations.
     *
     * 为升级和迁移的过程，在源码控制中创建一些提交。
     */
    createCommits?: boolean;
    /**
     * If false, will error out if installed packages are incompatible with the update.
     *
     * 如果为 false，那么如果已安装的包与这次更新不兼容，就会报错并退出。
     */
    force?: boolean;
    /**
     * Version from which to migrate from. Only available with a single package being updated,
     * and only on migration only.
     *
     * 要从哪个版本开始迁移。只能用在升级单个包时，而且只能用于迁移工作。
     */
    from?: string;
    /**
     * Shows a help message for this command in the console.
     *
     * 在控制台显示关于本命令的帮助信息。
     */
    help?: HelpUnion;
    /**
     * Only perform a migration, do not update the installed version.
     *
     * 只执行迁移，而不更新已安装的版本。
     */
    migrateOnly?: MigrateOnly;
    /**
     * Use the prerelease version, including beta and RCs.
     *
     * 使用与发布版本，包括 beta 和 RC。
     */
    next?: boolean;
    /**
     * The names of package(s) to update.
     *
     * 要更新的包名（可以有多个）。
     */
    packages?: string[];
    /**
     * Version up to which to apply migrations. Only available with a single package being
     * updated, and only on migrations only. Requires from to be specified. Default to the
     * installed version detected.
     *
     * 要迁移到哪个版本。只能用在升级单个包时，而且只能用于迁移工作。需要指定过 from 参数。默认是所检测到的已安装版本。
     */
    to?: string;
    /**
     * Display additional details about internal operations during execution.
     *
     * 在执行期间显示关于内部操作的详情。
     */
    verbose?: boolean;
}
/**
 * Shows a help message for this command in the console.
 *
 * 在控制台显示关于本命令的帮助信息。
 */
export declare type HelpUnion = boolean | HelpEnum;
export declare enum HelpEnum {
    HelpJson = "JSON",
    Json = "json"
}
/**
 * Only perform a migration, do not update the installed version.
 *
 * 只执行迁移，而不更新已安装的版本。
 */
export declare type MigrateOnly = boolean | string;
