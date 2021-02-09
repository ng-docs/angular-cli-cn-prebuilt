/**
 * Opens the official Angular documentation (angular.io) in a browser, and searches for a
 * given keyword.
 *
 * 在浏览器中打开 Angular 官方文档中文版 (angular.cn)，并搜索给定的关键字。
 */
export interface Schema {
    /**
     * Shows a help message for this command in the console.
     *
     * 在控制台显示关于本命令的帮助信息。
     */
    help?: HelpUnion;
    /**
     * The keyword to search for, as provided in the search bar in angular.io.
     *
     * 要搜索的关键字，和 angular.cn 搜索框中提供的关键字是一样的。
     */
    keyword?: string;
    /**
     * Search all of angular.io. Otherwise, searches only API reference documentation.
     *
     * 搜索整个 angular.cn。否则只搜索 API 参考手册。
     */
    search?: boolean;
    /**
     * Contains the version of Angular to use for the documentation. If not provided, the
     * command uses your current Angular core version.
     *
     * 要用到的 Angular 版本。如果未提供，则使用你的当前 Angular 核心版本。
     */
    version?: VersionUnion;
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
 * Contains the version of Angular to use for the documentation. If not provided, the
 * command uses your current Angular core version.
 *
 * 要用到的 Angular 版本。如果未提供，则使用你的当前 Angular 核心版本。
 */
export declare type VersionUnion = number | VersionEnum;
export declare enum VersionEnum {
    Next = "next"
}
