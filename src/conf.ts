
export class conf {
    entry: string[];
    incDir: string[];
    libDir: string[];
    libs: string[];
    addi: string;

    constructor(json_string: string) {
        let json = JSON.parse(json_string);
        
        this.entry = json.EntryFile;
        this.incDir = json.IncludeDirectories;
        this.libDir = json.LibraryDirectories;
        this.libs = json.Libraries;
        this.addi = json.AdditionalParameters;
    }
}