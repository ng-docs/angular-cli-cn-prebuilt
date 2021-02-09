export interface Schema {
    $schema?: string;
    cli?: CliOptions;
    /**
     * Default project name used in commands.
     *
     * 要在命令中使用的默认项目名。
     */
    defaultProject?: string;
    /**
     * Path where new projects will be created.
     *
     * 新项目要创建到的路径。
     */
    newProjectRoot?: string;
    projects?: Projects;
    schematics?: SchematicOptions;
    version: number;
}
export interface CliOptions {
    /**
     * Share anonymous usage data with the Angular Team at Google.
     *
     * 与 Google 的 Angular 开发组共享匿名使用情况数据。
     */
    analytics?: Analytics;
    analyticsSharing?: AnalyticsSharing;
    /**
     * The default schematics collection to use.
     *
     * 要使用的默认原理图集合。
     */
    defaultCollection?: string;
    /**
     * Specify which package manager tool to use.
     *
     * 指定要使用的包管理工具。
     */
    packageManager?: PackageManager;
    /**
     * Control CLI specific console warnings
     *
     * 控制 CLI 特有的控制台警告。
     */
    warnings?: Warnings;
}
/**
 * Share anonymous usage data with the Angular Team at Google.
 *
 * 与 Google 的 Angular 开发组共享匿名使用情况数据。
 */
export declare type Analytics = boolean | string;
export interface AnalyticsSharing {
    /**
     * Analytics sharing info tracking ID.
     *
     * Google Analytics 的共享信息跟踪 ID。
     */
    tracking?: string;
    /**
     * Analytics sharing info universally unique identifier.
     *
     * 共享分析数据的 UUID。
     */
    uuid?: string;
}
/**
 * Specify which package manager tool to use.
 *
 * 指定要使用的包管理工具。
 */
export declare enum PackageManager {
    Cnpm = "cnpm",
    Npm = "npm",
    Pnpm = "pnpm",
    Yarn = "yarn"
}
/**
 * Control CLI specific console warnings
 *
 * 控制 CLI 特有的控制台警告。
 */
export interface Warnings {
    /**
     * Show a warning when the global version is newer than the local one.
     *
     * 当全局版本比本地版本新时显示警告。
     */
    versionMismatch?: boolean;
}
export interface Projects {
}
export interface SchematicOptions {
    "@schematics/angular:class"?: SchematicsAngularClass;
    "@schematics/angular:component"?: SchematicsAngularComponent;
    "@schematics/angular:directive"?: SchematicsAngularDirective;
    "@schematics/angular:module"?: SchematicsAngularModule;
    "@schematics/angular:pipe"?: SchematicsAngularPipe;
    "@schematics/angular:service"?: SchematicsAngularService;
}
export interface SchematicsAngularClass {
    /**
     * Do not create test files.
     *
     * 不要创建测试文件。
     */
    skipTests?: boolean;
}
export interface SchematicsAngularComponent {
    /**
     * Specifies the change detection strategy.
     *
     * 指定变更检测策略。
     */
    changeDetection?: ChangeDetection;
    /**
     * Specifies if the style will contain `:host { display: block; }`.
     *
     * 指定此样式中是否要包含 `:host { display: block; }`。
     */
    displayBlock?: boolean;
    /**
     * Specifies if the component is an entry component of declaring module.
     *
     * 指定该组件是否是其声明模块的入口组件。
     */
    entryComponent?: boolean;
    /**
     * Specifies if declaring module exports the component.
     *
     * 指定声明模块是否导出该组件。
     */
    export?: boolean;
    /**
     * Flag to indicate if a directory is created.
     *
     * 标志是否要创建一层目录。
     */
    flat?: boolean;
    /**
     * Specifies if the style will be in the ts file.
     *
     * 指定此样式是否要内联在 ts 文件中。
     */
    inlineStyle?: boolean;
    /**
     * Specifies if the template will be in the ts file.
     *
     * 指定此模板是否要内联在 ts 文件中。
     */
    inlineTemplate?: boolean;
    /**
     * Allows specification of the declaring module.
     *
     * 允许指定其声明模块。
     */
    module?: string;
    /**
     * The prefix to apply to generated selectors.
     *
     * 用于生成选择器的前缀。
     */
    prefix?: string;
    /**
     * The selector to use for the component.
     *
     * 用于本组件的选择器。
     */
    selector?: string;
    /**
     * Flag to skip the module import.
     *
     * 标志是否不要自动添加到模块导入表中。
     */
    skipImport?: boolean;
    /**
     * Do not create test files.
     *
     * 不要创建测试文件。
     */
    skipTests?: boolean;
    /**
     * The file extension or preprocessor to use for style files.
     *
     * 用于样式文件的扩展名/预处理器。
     */
    style?: Style;
    /**
     * Specifies the view encapsulation strategy.
     *
     * 指定视图封装策略。
     */
    viewEncapsulation?: ViewEncapsulation;
}
/**
 * Specifies the change detection strategy.
 *
 * 指定变更检测策略。
 */
export declare enum ChangeDetection {
    Default = "Default",
    OnPush = "OnPush"
}
/**
 * The file extension or preprocessor to use for style files.
 *
 * 用于样式文件的扩展名/预处理器。
 */
export declare enum Style {
    Css = "css",
    Less = "less",
    Sass = "sass",
    Scss = "scss",
    Styl = "styl"
}
/**
 * Specifies the view encapsulation strategy.
 *
 * 指定视图封装策略。
 */
export declare enum ViewEncapsulation {
    Emulated = "Emulated",
    Native = "Native",
    None = "None",
    ShadowDom = "ShadowDom"
}
export interface SchematicsAngularDirective {
    /**
     * Specifies if declaring module exports the directive.
     *
     * 指定声明模块是否导出该指令。
     */
    export?: boolean;
    /**
     * Flag to indicate if a directory is created.
     *
     * 标志是否要创建一层目录。
     */
    flat?: boolean;
    /**
     * Allows specification of the declaring module.
     *
     * 允许指定其声明模块。
     */
    module?: string;
    /**
     * The prefix to apply to generated selectors.
     *
     * 用于生成选择器的前缀。
     */
    prefix?: string;
    /**
     * The selector to use for the directive.
     *
     * 用于本指令的选择器。
     */
    selector?: string;
    /**
     * Flag to skip the module import.
     *
     * 标志是否不要自动添加到模块导入表中。
     */
    skipImport?: boolean;
    /**
     * Do not create test files.
     *
     * 不要创建测试文件。
     */
    skipTests?: boolean;
}
export interface SchematicsAngularModule {
    /**
     * Flag to control whether the CommonModule is imported.
     *
     * 此标志控制是否要导入 CommonModule。
     */
    commonModule?: boolean;
    /**
     * Flag to indicate if a directory is created.
     *
     * 标志是否要生成一层目录。
     */
    flat?: boolean;
    /**
     * Allows specification of the declaring module.
     *
     * 允许指定其声明模块。
     */
    module?: string;
    /**
     * Generates a routing module.
     *
     * 生成单独的路由模块。
     */
    routing?: boolean;
    /**
     * The scope for the generated routing.
     *
     * 所生成路由的范围。
     */
    routingScope?: RoutingScope;
}
/**
 * The scope for the generated routing.
 *
 * 所生成路由的范围。
 */
export declare enum RoutingScope {
    Child = "Child",
    Root = "Root"
}
export interface SchematicsAngularPipe {
    /**
     * Specifies if declaring module exports the pipe.
     *
     * 指定声明模块是否导出该管道。
     */
    export?: boolean;
    /**
     * Flag to indicate if a directory is created.
     *
     * 标志是否要生成一层目录。
     */
    flat?: boolean;
    /**
     * Allows specification of the declaring module.
     *
     * 允许指定其声明模块。
     */
    module?: string;
    /**
     * Allows for skipping the module import.
     *
     * 标志是否不要自动添加到模块导入表中。
     */
    skipImport?: boolean;
    /**
     * Do not create test files.
     *
     * 不要创建测试文件。
     */
    skipTests?: boolean;
}
export interface SchematicsAngularService {
    /**
     * Flag to indicate if a directory is created.
     *
     * 标志是否要生成一层目录。
     */
    flat?: boolean;
    /**
     * Do not create test files.
     *
     * 不要创建测试文件。
     */
    skipTests?: boolean;
}
