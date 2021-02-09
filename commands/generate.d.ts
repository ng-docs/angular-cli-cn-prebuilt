/**
 * Generates and/or modifies files based on a schematic.
 *
 * 基于某个原理图生成和/或修改文件。
 */
export interface Schema {
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
     * The schematic or collection:schematic to generate.
     *
     * 要生成的 schematic 或 collection:schematic
     */
    schematic?: string;
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
