# Microsoft Power BI visuals

The Microsoft Power BI visuals project provides high quality data visualizations that you can use to extend [Power BI](https://powerbi.microsoft.com/).  The project contains over 20 visualization types, the framework to run them, and the testing infrastructure that enables you to build high quality visualizations.  The framework provides all the interfaces you need to integrate fully with Power BI's selection, filtering, and other UI experiences.  The code is written in [TypeScript](http://www.typescriptlang.org/) so it's easier to build and debug. Everything compiles down to JavaScript and runs in modern web browsers.  The visuals are built using [D3](http://d3js.org/) but you can use your favorite technology like [WebGL](https://en.wikipedia.org/wiki/WebGL), [Canvas](https://en.wikipedia.org/wiki/Canvas_element), or [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics). This gives you everything you need to build custom visualizations for Power BI.

## What is included

1. `build` folder contains a pre-built version of Power BI visuals library so that you can start using them right away.
2. `src` folder contains the project source code for your experiments and if you will desire to create a new visual.
3. `src\Clients\PowerBIVisualsPlayground` is a sample application which could be used to try the existing visualization types or as an example how to run visuals you create.

## How to Engage, Contribute and Provide Feedback

There are many ways in which you can contribute.  

We plan to accept community code contributions including new chart types, bug fixes, and additional features for existing chart types.  We're still working out the contribution guidelines. Hold tight, we'll update you here when we've formalized the guidelines.

In the meantime, you can contribute to Power BI Visuals in a few different ways:
* Submit bugs by opening a GitHub Issue [here](https://github.com/Microsoft/PowerBI-visuals/issues)
* Contribute to discussions on [StackOverflow](http://stackoverflow.com/questions/tagged/powerbi).
* Follow the [Power BI Developer](http://blogs.msdn.com/powerbidev) blog for updates
* Follow Power BI on Twitter [@mspowerbi](http://twitter.com/mspowerbi)

## Documentation

*  [Getting started](https://github.com/Microsoft/PowerBI-visuals/wiki)
*  [API specification](http://microsoft.github.io/PowerBI-visuals/docs/interfaces/powerbi.ivisual.html)
*  [Power BI Visuals Playground (see our visuals live in action)](http://microsoft.github.io/PowerBI-visuals/playground/index.html)
*  [Power BI Homepage](https://powerbi.microsoft.com/)

## How To Build and Run

### Prerequisites

To build the library and run the sample application you will need:

- A Windows 8.1 or Windows 10 64-bit machine with at least 4 GB of RAM
- [Visual Studio Community 2013](https://www.visualstudio.com/en-us/news/vs2013-community-vs.aspx) (Free for use)
 -  Be sure to install the "Microsoft Web Developer Tools" optional feature. To install, go to Add/Remove Programs, right-click on Visual Studio, select Change, then Modify. Check the "Microsoft Web Developer Tools" checkbox and finish the install.
- [TypeScript 1.4 for Visual Studio 2013](https://visualstudiogallery.msdn.microsoft.com/2d42d8dc-e085-45eb-a30b-3f7d50d55304)
- [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git#Installing-on-Windows)
- [Node.js](https://nodejs.org/download/)

In order to run unit tests you will also need to do the following:
1. Install [Chocolatey](http://chocolatey.org) (A Machine Package Manager)
 * Make sure you open your command prompt as Administrator when you install Chocolatey.
1. Install [Chutzpah](https://github.com/mmanela/chutzpah) (A JavaScript Test Runner)
 * Open a command prompt as Administrator and execute the following command. Type 'yes' and hit Enter when prompted to install it.

  ```
  choco install chutzpah
  ```
1. Copy the [jasmine-jquery.js](https://raw.github.com/velesin/jasmine-jquery/master/lib/jasmine-jquery.js) Jasmine Extension Library file from GitHub into the following folder on your local machine.  
  ```
  "\PowerBI-Visuals\src\Clients\Externals\ThirdPartyIP\JasmineJQuery\"
  ```

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
npm install
```

Use the following commands to build and test:
```
npm run build                               # Build Power BI Visuals into `build` folder
npm test                                    # Run unit tests (requires 'Chutzpah', see Prerequisites above)
```

### Run Sample App

To run sample app open `src\PowerBIVisualsClient.sln` in Visual Studio and then run *PowerBIVisualsPlayground* project.

### Copyrights

Copyright (c) 2015 Microsoft

See the [LICENSE](/LICENSE) file for license rights and limitations (MIT).
