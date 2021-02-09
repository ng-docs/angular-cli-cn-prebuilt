/**
 * Runs linting tools on Angular app code in a given project folder.
 *
 * 针对给定项目目录下的 Angular 应用代码，运行 lint 工具
 */
export interface Schema {
    /**
     * The linting configuration to use.
     *
     * 要使用的 lint 配置。
     */
    configuration?: string;
    /**
     * Shows a help message for this command in the console.
     *
     * 在控制台显示关于本命令的帮助信息。
     */
    help?: HelpUnion;
    /**
     * The name of the project to lint.
     *
     * 要 lint 的项目名。
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
