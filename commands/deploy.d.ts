/**
 * Invokes the deploy builder for a specified project or for the default project in the
 * workspace.
 *
 * 为指定的项目或默认项目，执行部署构建器。
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
     * The name of the project to deploy.
     *
     * 要部署的项目名。
     */
    project?: string;
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
