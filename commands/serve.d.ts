/**
 * Builds and serves your app, rebuilding on file changes.
 *
 * 构建应用，并启动开发服务器，当文件变化时重新构建。
 */
export interface Schema {
    /**
     * One or more named builder configurations as a comma-separated list as specified in the
     * "configurations" section of angular.json.
     * The builder uses the named configurations to run the given target.
     * For more information, see
     * https://angular.io/guide/workspace-config#alternate-build-configurations.
     * Setting this explicitly overrides the "--prod" flag.
     *
     * 构建器的一个或多个命名配置，是一个逗号分隔的列表，就像在 angular.json 的 "configurations" 部分指定的一样。
     * 构建器使用这些命名配置运行给定的目标。
     * 欲知详情，参见 https://angular.cn/guide/workspace-config#alternate-build-configurations。
     * 可以通过显式指定 "--prod" 标志来覆盖它。
     */
    configuration?: string;
    /**
     * Shows a help message for this command in the console.
     *
     * 在控制台显示关于本命令的帮助信息。
     */
    help?: HelpUnion;
    /**
     * Shorthand for "--configuration=production".
     * Set the build configuration to the production target.
     * By default, the production target is set up in the workspace configuration such that all
     * builds make use of bundling, limited tree-shaking, and also limited dead code
     * elimination.
     *
     * "--configuration=production" 的简写形式。
     * 把构建配置的目标设置为产品环境。
     * 默认情况下，产品环境目标是在工作空间配置中设置的，可以设置打包方式、摇树优化限制、死代码移除限制等方面。
     */
    prod?: boolean;
    /**
     * The name of the project to build. Can be an application or a library.
     *
     * 要构建的项目名。可以是应用或库。
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
