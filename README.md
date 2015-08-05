# Microsoft Power BI visuals

The Microsoft Power BI visuals project provides high quality data visualizations that you can use to extend [Power BI](https://powerbi.microsoft.com/).  The project contains over 20 visualization types, the framework to run them, and the testing infrastructure that enables you to build high quality visualizations.  The framework provides all the interfaces you need to integrate fully with Power BI's selection, filtering, and other UI experiences.  The code is written in [TypeScript](http://www.typescriptlang.org/) so it's easier to build and debug. Everything compiles down to JavaScript and runs in modern web browsers.  The visuals are built using [D3](http://d3js.org/) but you can use your favorite technology like [WebGL](https://en.wikipedia.org/wiki/WebGL), [Canvas](https://en.wikipedia.org/wiki/Canvas_element), or [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics). This gives you everything you need to build custom visualizations for Power BI.

## What is included

1. `src` folder contains the project source code for your experiments and if you will desire to create a new visual.
2. `src\Clients\PowerBIVisualsPlayground\index.html` is a sample application which could be used to try the existing visualization types or as an example how to run visuals you create.

## How to Engage, Contribute and Provide Feedback

There are many ways in which you can contribute.  

We plan to accept community code contributions including new chart types, bug fixes, and additional features for existing chart types.  We're still working out the contribution guidelines. Hold tight, we'll update you here when we've formalized the guidelines.

In the meantime, you can contribute to Power BI visuals in a few different ways:
* Submit bugs by opening a GitHub Issue [here](https://github.com/Microsoft/PowerBI-visuals/issues)
* Contribute to discussions on [StackOverflow](http://stackoverflow.com/questions/tagged/powerbi).
* Follow the [Power BI Developer](http://blogs.msdn.com/powerbidev) blog for updates
* Follow Power BI on Twitter [@mspowerbi](http://twitter.com/mspowerbi)

## Documentation

*  [Getting started](https://github.com/Microsoft/PowerBI-visuals/wiki)
*  [API specification](http://microsoft.github.io/PowerBI-visuals/docs/interfaces/powerbi.ivisual.html)
*  [Power BI visuals playground (see our visuals live in action)](http://microsoft.github.io/PowerBI-visuals/playground/index.html)
*  [Power BI Homepage](https://powerbi.microsoft.com/)

## How To Build and Run

### Prerequisites

To build the library and run the sample application you will need:

- A Windows 8.1 or Windows 10 64-bit machine with at least 4 GB of RAM
- [Visual Studio Community 2015](https://www.visualstudio.com/vs-2015-product-editions) (Free for use)
 -  Be sure to install the "Microsoft Web Developer Tools" optional feature. To install, go to Add/Remove Programs, right-click on Visual Studio, select Change, then Modify. Check the "Microsoft Web Developer Tools" checkbox and finish the install.
- [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git#Installing-on-Windows)
- [Node.js](https://nodejs.org/download/)

In order to run unit tests you will also need to do the following:

1. Install [PhantomJS](http://phantomjs.org/) (PhantomJS is a headless WebKit scriptable with a JavaScript API. It has fast and native support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG.)
 * Make sure it's running from command line typing 'phantomjs'. If it's not then you need to update your system PATH variable and add the path to phantomjs.exe file.

2. Copy the [jasmine-jquery.js](https://raw.github.com/velesin/jasmine-jquery/master/lib/jasmine-jquery.js) Jasmine Extension Library file from GitHub into the following folder on your local machine "[PowerBIVisuals folder]\src\Clients\Externals\ThirdPartyIP\JasmineJQuery\" 

### Build Power BI visuals

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

Use the following commands to build and test:
```
gulp build                               # Build Power BI visuals into `build` folder
gulp test                                # Run unit tests (requires 'PhantomJS', see Prerequisites above)
```

### Run Sample App

To run sample app:

1. Open `src\PowerBIClients.VS2015.sln` in Visual Studio then open src\Clients\PowerBIVisualsPlayground\, right click on index.html file and select 'Set As Start Page'.

1. Right click on the project root folder then select 'Property Pages'. In the window opened select 'Build' and then in 'Before running startup page' select 'No Build'.

1. Run.

### Copyrights

Copyright (c) 2015 Microsoft

See the [LICENSE](/LICENSE) file for license rights and limitations (MIT).
