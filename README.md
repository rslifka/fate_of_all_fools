[![Build Status](https://travis-ci.org/rslifka/fate_of_all_fools.svg?branch=master)](https://travis-ci.org/rslifka/fate_of_all_fools)

# Overview

`Fate of All Fools` (`Fate`) is an suite of visual modifications and data overlays on top of the [Destiny Item Manager](https://www.destinyitemmanager.com/) (DIM) for the Destiny video game. *`Fate` only works with the online version of DIM, not the DIM browser extension.*




# Quickstart

1. Install the [Tampermonkey](https://tampermonkey.net/) browser extension.
1. Install `Fate` from [OpenUserJS](https://openuserjs.org/scripts/rslifka/FateOfAllFools_-_DIM_Customization).
1. Do nothing, and enjoy only the visual enhancements `Fate` provides.
1. TODO - Link to data customization

# Features

`Fate` builds on DIM in two ways:

1. **Visual Modification**: It modifies the presentation of **existing** information (that DIM provides).
1. **Information Overlays**: It displays **new** information (that you provide).

We'll review each of these below.

## Visual Modifications

There are many small tweaks that aren't separately shown here. I'm focusing on the more obvious ones and the motivations for those choices.

## Information Overlays

The following overlays are based off of three Google Sheets that you'll maintain. Don't worry, they're simple sheets that you can copy and use immediately!

### Your Own Shader Assessments

Let's start with the easiest one first so you get an idea of what `Fate` helps you with.

**PROBLEM**: Destiny features hundreds of shaders, many of which are difficult to distinguish at-a-glance. How can I confidently keep my shader inventory pared down to only what I prefer?

**SOLUTION**: By keeping my custom ratings in an easily-editable format!

[![Fate of All Fools - Shader Assessments!](https://rslifka.github.io/fate_of_all_fools/img/fate-shader-ratings.png)](https://docs.google.com/spreadsheets/d/16BO3r1B5vuLtCnR06l_rtCl_WlWVDkg_9C9Gu-v-xi4/edit#gid=1194152043)

### Your Weapon Assessments

**TODO**

### Your Armor Assessments

**TODO**

# Development Setup
`Fate of All Fools` is a node-based project using ES6. TypeScript wasn't yet a thing when I kicked this off in 2017. If I was going to start over, I'd love to wrap my head around TypeScript and do that; for another project perhaps.

Much of the complexity of the project configuration has been done to have the `modify => refresh => test` loop happen as quickly as possible when working locally! Upon saving any file, everything is built, tested and bundled; a good ol' `F5` will let you see your changes straight away.

1. [Install Tampermonkey](https://chrome.google.com/webstore/detail/Tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) from the Chrome Web Store. You cannot use the Safari version of TamperMonkey for development because Safari will not allow you to configure the next setting :)
1. Enable `Allow access to file URLs` in the Tampermonkey extension. This allows you to refresh your browser to pick up changes during development, using the file URLs present in the next steps.
1. Create a new script in Tampermonkey and paste the contents of [fateOfAllFools.dev.user.js](https://github.com/rslifka/fate_of_all_fools/blob/master/fateOfAllFools.dev.user.js).
1. Modify the `@require` and `@resource` directives to be accurate based on your filesystem.
1. `npm install`
1. `brunch watch` Monitors filesystem for changes to JS and CSS, building as appropriate.
1. `karma start` Monitors assets for changes, running tests in response.
