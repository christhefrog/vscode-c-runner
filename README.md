# C-runner

C-runner is a tool for building and runing C projects\
As of now it is only available on Windows with MinGW

_It requires to have MinGW installed and gcc added to system path!_

## Features

- Build and run C projects
- Configure build settings (Include paths, library paths, additional libraries, entry file and additional parameters)

## Requirements

- Windows
- MinGW (gcc compiler added to path)

## Installation and usage

#### Installation
See release notes\
### Usage (minimal working example)
- Install the extension
- Open a new folder
- Create a main.c file with an example C program
- Use `runc: Run Project` command from the command palette\
	(Press F1 or Ctrl+Shift+P and type `runc`)
- _c-runner.json_ (config) will be created in the workspace directory
- Output will be routed to the terminal window


## Config

When first using c-runner, it will create a _c-runner.json_ file in the workspace directory\
An example _c-runner.json_ file:
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
