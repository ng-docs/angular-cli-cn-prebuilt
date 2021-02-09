/**
 * Adds support for an external library to your project.
 *
 * 为你的项目添加对外部库的支持
 */
export interface Schema {
    /**
     * The package to be added.
     *
     * 要添加的包。
     */
    collection?: string;
    /**
     * Disable interactive input prompts for options with a default.
     *
     * 对有默认值的选项禁用交互式输入提示。
     */
    defaults?: boolean;
    /**
     * Shows a help message for this command in the console.
     *
     * 在控制台显示关于本命令的帮助信息。
     */
    help?: HelpUnion;
    /**
     * Enable interactive input prompts.
     *
     * 启用交互式输入提示。
     */
    interactive?: boolean;
    /**
     * The NPM registry to use.
     *
     * 要使用的 NPM registry。
     */
    registry?: string;
    /**
     * Display additional details about internal operations during execution.
     *
     * 在执行期间显示内部操作的详细信息。
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
