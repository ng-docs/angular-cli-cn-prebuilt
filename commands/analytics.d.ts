/**
 * Configures the gathering of Angular CLI usage metrics. See
 * https://angular.io/cli/usage-analytics-gathering.
 *
 * 配置 Angular CLI 使用情况度量的收集策略。参见 https://angular.cn/cli/usage-analytics-gathering。
 */
export interface Schema {
    /**
     * Shows a help message for this command in the console.
     *
     * 在控制台显示关于本命令的帮助信息。
     */
    help?: HelpUnion;
    /**
     * Sets the default analytics enablement status for the project.
     *
     * 为本项目设置使用情况分析的默认启用状态。
     */
    projectSetting?: ProjectSetting;
    /**
     * Directly enables or disables all usage analytics for the user, or prompts the user to set
     * the status interactively, or sets the default status for the project.
     *
     * 直接启用或禁用当前用户的所有使用情况分析，或交互式的提示用户进行设置，或设置项目的默认状态。
     */
    settingOrProject: SettingOrProject;
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
 * Sets the default analytics enablement status for the project.
 *
 * 为本项目设置使用情况分析的默认启用状态。
 */
export declare enum ProjectSetting {
    Off = "off",
    On = "on",
    Prompt = "prompt"
}
/**
 * Directly enables or disables all usage analytics for the user, or prompts the user to set
 * the status interactively, or sets the default status for the project.
 *
 * 直接启用或禁用当前用户的所有使用情况分析，或交互式的提示用户进行设置，或设置项目的默认状态。
 */
export declare enum SettingOrProject {
    Ci = "ci",
    Off = "off",
    On = "on",
    Project = "project",
    Prompt = "prompt"
}
