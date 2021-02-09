/**
 * Runs an Architect target with an optional custom builder configuration defined in your
 * project.
 *
 * 在你的项目中运行一个带有自定义构建器配置的建筑师目标（Architect target）。
 */
export interface Schema {
    /**
     * One or more named builder configurations as a comma-separated list as specified in the
     * "configurations" section of angular.json.
     * The builder uses the named configurations to run the given target.
     * For more information, see
     * https://angular.io/guide/workspace-config#alternate-build-configurations.
     *
     * 构建器的一个或多个命名配置，是一个逗号分隔的列表，就像在 angular.json 的 "configurations" 部分指定的一样。
     * 本构建器使用这些命名配置来运行给定的目标。
     * 欲知详情，参见 https://angular.cn/guide/workspace-config#alternate-build-configurations。
     */
    configuration?: string;
    /**
     * Shows a help message for this command in the console.
     *
     * 在控制台显示关于本命令的帮助信息。
     */
    help?: HelpUnion;
    /**
     * The Architect target to run.
     *
     * 要运行的建筑师目标。
     */
    target?: string;
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
