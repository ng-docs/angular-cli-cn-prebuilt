/**
 * Retrieves or sets Angular configuration values in the angular.json file for the
 * workspace.
 *
 * 从本工作空间的 angular.json 文件中获取或设置 Angular 的配置值。
 */
export interface Schema {
    /**
     * Access the global configuration in the caller's home directory.
     *
     * 访问此调用者 home 目录下的全局配置。
     */
    global?: boolean;
    /**
     * Shows a help message for this command in the console.
     *
     * 在控制台显示关于本命令的帮助信息。
     */
    help?: HelpUnion;
    /**
     * The configuration key to set or query, in JSON path format. For example:
     * "a[3].foo.bar[2]". If no new value is provided, returns the current value of this key.
     *
     * 要设置或查询的配置键，为 JSON path 格式。比如 "a[3].foo.bar[2]"。如果没有提供新值，则返回此配置键对应的当前值。
     */
    jsonPath?: string;
    /**
     * If provided, a new value for the given configuration key.
     *
     * 如果提供，则为指定配置键的新值。
     */
    value?: Value;
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
 * If provided, a new value for the given configuration key.
 *
 * 如果提供，则为指定配置键的新值。
 */
export declare type Value = boolean | number | string;
