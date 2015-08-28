# Microsoft Power BI visuals

The Microsoft Power BI visuals project provides high quality data visualizations that you can use to extend [Power BI](https://powerbi.microsoft.com/).  The project contains over 20 visualization types, the framework to run them, and the testing infrastructure that enables you to build high quality visualizations.  The framework provides all the interfaces you need to integrate fully with Power BI's selection, filtering, and other UI experiences.  The code is written in [TypeScript](http://www.typescriptlang.org/) so it's easier to build and debug. Everything compiles down to JavaScript and runs in modern web browsers.  The visuals are built using [D3](http://d3js.org/) but you can use your favorite technology like [WebGL](https://en.wikipedia.org/wiki/WebGL), [Canvas](https://en.wikipedia.org/wiki/Canvas_element), or [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics). This gives you everything you need to build custom visualizations for Power BI.

## What is included

1. `src` folder contains the project source code for your experiments and if you will desire to create a new visual.
2. `src\Clients\PowerBIVisualsPlayground\index.html` is a sample application which could be used to try the existing visualization types or as an example how to run visuals you create.

## How to Engage, Contribute and Provide Feedback

There are many ways in which you can contribute to Power BI visuals:
* You can contribute fixes and new visuals to this repo, read the [contribution guildelines](https://github.com/Microsoft/PowerBI-visuals/blob/master/CONTRIBUTING.md).
* Submit bugs by opening a GitHub Issue [here](https://github.com/Microsoft/PowerBI-visuals/issues).
* Contribute to discussions on [StackOverflow](http://stackoverflow.com/questions/tagged/powerbi).
* Follow the [Power BI Developer](http://blogs.msdn.com/powerbidev) blog for updates.
* Follow Power BI on Twitter [@mspowerbi](http://twitter.com/mspowerbi).

## Documentation

*  [Getting started](https://github.com/Microsoft/PowerBI-visuals/wiki)
*  [API specification](http://microsoft.github.io/PowerBI-visuals/interfaces/powerbi.ivisual.html)
*  [Power BI visuals playground (see our visuals live in action)](http://microsoft.github.io/PowerBI-visuals/playground/index.html)
*  [Power BI Homepage](https://powerbi.microsoft.com/)

## How To Setup and Run

### Prerequisites

To build the library and run the sample application you will need:

- A Windows 8.1 or Windows 10 64-bit machine with at least 4 GB of RAM
- [Visual Studio Community 2015](https://www.visualstudio.com/vs-2015-product-editions) (Free for use)
 -  Be sure to install the "Microsoft Web Developer Tools" optional feature. To install, go to Add/Remove Programs, right-click on Visual Studio, select Change, then Modify. Check the "Microsoft Web Developer Tools" checkbox and finish the install.
- [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git#Installing-on-Windows)
- [Node.js](https://nodejs.org/download/)

### One-Time Setup
In order to build the Power BI visuals, ensure that you have [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git#Installing-on-Windows) and [Node.js](http://nodejs.org/download/) installed.

Clone a copy of the repo:

```
git clone https://github.com/Microsoft/PowerBI-visuals.git
```

Change to the PowerBI-visuals directory:

```
cd PowerBI-visuals
```

Install dev dependencies:

```
npm install  				# This command will install Gulp and all necessary modules
```
You will also need to do the following to run unit tests:

Install [PhantomJS](http://phantomjs.org/) (PhantomJS is a headless WebKit scriptable with a JavaScript API. It has fast and native support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG.).

For Windows OS you can install PhantomJS using this command:

```
gulp phantomjs-dependency
```
As result, local version of the PhantomJS will be downloaded and installed into the project. For other OS you have to install PhantomJS manually.

### Build Power BI visuals

Use the following commands to build and test:
```
gulp build                               # Build Power BI visuals into `build` folder
gulp test                                # Run unit tests (requires 'PhantomJS', see Prerequisites above)
```

### Run Sample App

To run sample app:

1. Open `src\PowerBIClients.VS2015.sln` in Visual Studio then open src\Clients\PowerBIVisualsPlayground\, right click on index.html file and select 'Set As Start Page'.

2. Right click on the project root folder then select 'Property Pages'. In the window opened select 'Build' and then in 'Before running startup page' select 'No Build'.

3. Ensure under task explorer, the bindings for the 'build' gulp task is set to Before Build.

4. Run.

### Copyrights

Copyright (c) 2015 Microsoft

See the [LICENSE](/LICENSE) file for license rights and limitations (MIT).
