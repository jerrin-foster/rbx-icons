export declare type ClassIconPaths = {
    [className: string]: string
}

export declare type ClassIconIndex = {
    [className: string]: number
}

export declare function generate(outputDir: string, iconIndex: ClassIconIndex): Promise<ClassIconPaths>