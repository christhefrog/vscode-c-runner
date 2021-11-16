# C-runner

C-runner is a tool for building and runing C projects\
As of now it is only available on Windows with MinGW

To run a project you need to use `runc: Run Project` command from the command palette (F1 or Ctrl+Shift+P and type `runc`)\n
_Make sure to have MinGW installed and gcc added to system path_

## Features

- Build and run C projects
- Configure build settings (Include paths, library paths, additional libraries, entry file and additional parameters)

## Requirements

- Windows
- MinGW (gcc compiler added to path)

## Config

When first using c-runner, it will create a c-runner.json file in the workspace directory\
An example c-runner.json file:
```
{
	"EntryFile" : "main.c",
	"IncludeDirectories" : ["inc/"],
	"LibraryDirectories" : ["lib/"],
	"Libraries" : ["glut32"],
	"AdditionalParameters" : [""]
}
```

## Known Issues

If You find any problems with the exension please open an github issue!
