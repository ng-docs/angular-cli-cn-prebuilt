/**
 * Creates a new workspace and an initial Angular application.
 *
 * 创建一个新工作空间和一个初始 Angular 应用。
 */
export interface Schema {
    /**
     * A collection of schematics to use in generating the initial application.
     *
     * 用来生成初始应用的一组原理图。
     */
    collection?: string;
    /**
     * Disable interactive input prompts for options with a default.
     *
     * 对有默认值的选项禁用交互式输入提示。
     */
    defaults?: boolean;
    /**
     * Run through and reports activity without writing out results.
     *
     * 运行一遍并汇报其活动轨迹，但不真的写入任何结果。
     */
    dryRun?: boolean;
    /**
     * Force overwriting of existing files.
     *
     * 强制覆盖现存文件。
     */
    force?: boolean;
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
     * Add more details to output logging.
     *
     * 在输出日志中添加更多详情。
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
