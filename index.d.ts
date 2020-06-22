export declare type ClassIconPaths = {
    [className: string]: string
}

export declare function generate(outputDir: string): Promise<ClassIconPaths>