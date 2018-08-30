# Fate of All Fools Is...

* A [Tampermonkey](https://Tampermonkey.net/)-based suite of enhancements to [Destiny Item Manager](https://www.destinyitemmanager.com/) (DIM) for Destiny 2. I've used DIM for years and find it indispensable. There are a few nits I've wanted to fix from styling to information density. I've also wanted to add workflow-specific features that are unique to the way I play Destiny and work with my vault. These changes range from slight preferences to how I organize, which I realize are super subjective and perhaps best done as a layer on top of DIM versus adding features to the core.
* Only compatible with the [online version of DIM](https://app.destinyitemmanager.com/), not the extension. Chrome prevents extensions from accessing one another.
* A [unique weapon](http://destinydb.com/item/3490486524/fate-of-all-fools) from Destiny 1 and part of a [really touching story](https://www.reddit.com/r/DestinyTheGame/comments/2lgxd4/deej_just_sent_my_husband_the_new_exotic_fate_of/).
* The Destiny 2 Jade Rabbit Exotic perk! =D
* Currently [![Build Status](https://travis-ci.org/rslifka/fate_of_all_fools.svg?branch=master)](https://travis-ci.org/rslifka/fate_of_all_fools)

# Quickstart

1. Install the [Tampermonkey](https://tampermonkey.net/) browser extension.
1. Install `Fate of All Fools` from [OpenUserJS](https://openuserjs.org/scripts/rslifka/FateOfAllFools_-_DIM_Customization).
1. Watch this short video! **(TODO: WAY OUT OF DATE :)**

[![Fate of All Fools Walkthrough Video!](https://rslifka.github.io/fate_of_all_fools/img/fate-youtube-screenshot.jpg)](https://www.youtube.com/watch?v=AW5kWLvGKqI)

# What does Fate of All Fools Do?
* **Displays information at-a-glance derived from your custom external source of weapon quality assessments**. You can create your own sheet from my template to specify your own rankings! (see below). There is limited support for armor and shaders as well that I may expand in the future depending on how random armor is in Forsaken and beyond. Since armor is armor, there's only mod-presence support. Since shaders are shaders, there's only binary quality support.
* **Displays duplicates at-a-glance**: **TODO: DEFINE WHAT A FORSAKEN DUPLICATE MEANS**.
* **Indicates which weapons you can infuse**: Hovering over this icon will highlight items that it can use for infusion, as well as what the light will be after infusion (helps remove mod misinterpretation!).
* **Indicates which weapons you can discard**: This is the reverse of the previous feature. Hovering over this icon will show you what weapons will benefit from infusing the focused weapon.
* **Reduces overall contrast**: Single-color background; no need for the contrast between guardian inventory and vault; the grouping of items is enough.
* **Improves item power level display**: Maybe it's because I'm forty-one now :) that the font for power level was too small and difficult to read. Slight increase to the font size and decrease in opacity to increase readability.
* **Repurposes the tooltip to contain your custom info**: With information from the aforementioned Google Sheet.
* **Modifies how elemental damage type is shown**: By default, the elemental damage type was the background color of the power level. That's a visual cue that seems excessive in a screen full of gear, so I've used a thin top border of the power level itself.
* **Calmly indicates masterworks**: The default DIM masterwork glare is too much in a screen full of gear, so it's been replaced with a little `M` overlay.
* **Removes subclass icons**: I've never switched subclasses this way. OK, maybe once to see if it worked (it does!) but never enough to warrant having this displayed at all times at the top of the screen for all three characters.
* **Removes collapse controls**: I never use these, especially now that DIM split things in to multiple tabs. Certainly a part of my workflow I can live without. Note that you can still click the section headings for this functionality.

# Installation and Configuration

1. Install [Tampermonkey](https://Tampermonkey.net/). It may work with other UserScript extensions though I haven't tried, and won't, but you're welcome to! ¯\\_(ツ)_/¯
1. FOAF is hosted over on OpenUserJS; [one-click install](https://openuserjs.org/scripts/rslifka/FateOfAllFools_-_DIM_Customization) from there. **At this point you're good to go!** The only trouble that you'll be look at my weapon assessments and not your own, which is sort of the whole point of this UserScript ;)
1. Duplicate my [weapon assessments sheet](https://docs.google.com/spreadsheets/d/16BO3r1B5vuLtCnR06l_rtCl_WlWVDkg_9C9Gu-v-xi4/edit?usp=sharing) as a starting point (`File` => `Make a copy...`).
1. Ensure that your sheet is published to the web (`File` => `Publish to the Web...`) and that in publish settings you've selected `Entire Document` and `Tab-seperated values (.tsv)`.
1. Open DIM.
1. Configure FOAF by clicking the `FATE Config` link in the DIM menu on the top of your screen.
1. Replace each URL with the link to the proper tab on your own customized Google Sheet.
1. [FIGHT FOREVERRRR GUARDIANNN](https://www.youtube.com/watch?v=sAhhgmf6Xg8&feature=youtu.be&t=5)!!!

# Development
`Fate of All Fools` is a node-based project. Please see [package.json](https://github.com/rslifka/fate_of_all_fools/blob/master/package.json) for a list of dependencies. Much of the complexity of the project settings has been done to have the modify => refresh => evaluate loop happen as quickly as possible when working locally.

## Environment
1. [Install Tampermonkey](https://chrome.google.com/webstore/detail/Tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) from the Chrome Web Store.
1. Enable `Allow access to file URLs` in Tampermonkey extension configuration inside of Chrome. This allows you to refresh your browser to pick up local changes during active development, using the file URLs present in the next steps.
1. Add a script, and paste the contents of [fateOfAllFools.dev.user.js](https://github.com/rslifka/fate_of_all_fools/blob/master/fateOfAllFools.dev.user.js).
1. Modify the `@require` and `@resource` directives to be accurate based on your filesystem.
1. `npm install`
1. `brunch watch` Monitors filesystem for changes to JS and CSS, building as appropriate.
1. `karma start` Starts the karma server, which refreshes based on changes to the watched scripts, and continuously runs the tests.

## Deployment
1. After each check-in to `master`, [Travis](https://travis-ci.org/rslifka/fate_of_all_fools) is kicked off.
1. Upon success, new assets are created and checked in to [docs](https://github.com/rslifka/fate_of_all_fools/tree/master/docs) so as to be available publicly at `rslifka.github.io`.
1. This includes a build-modified [fateOfAllFools.user.js](https://github.com/rslifka/fate_of_all_fools/blob/master/docs/fateOfAllFools.user.js) whose `@version` value in the UserScript [metadata block](https://wiki.greasespot.net/Metadata_Block) is ticked. Ticking the version number is signal to Tampermonkey to invalidate the `@require` and `@resource` assets (i.e. JavaScript and CSS).
1. [OUJS](https://openuserjs.org/scripts/rslifka/FateOfAllFools_-_DIM_Customization) monitors `fateOfAllFools.user.js` via GitHub integration and handles ensuring that Tampermonkey clients get updated versions of the script via magic.
