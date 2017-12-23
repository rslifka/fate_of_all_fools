# Fate of All Fools
[![Build Status](https://travis-ci.org/rslifka/fate_of_all_fools.svg?branch=master)](https://travis-ci.org/rslifka/fate_of_all_fools)

`FOAF` is a [TamperMonkey](https://tampermonkey.net/)-based suite of enhancements to [Destiny Item Manager](https://www.destinyitemmanager.com/) (DIM) for Destiny 2. It's also the name of a [unique weapon](http://destinydb.com/item/3490486524/fate-of-all-fools) and part of a [really touching story](https://www.reddit.com/r/DestinyTheGame/comments/2lgxd4/deej_just_sent_my_husband_the_new_exotic_fate_of/).

***This is only compatible with the [online version of DIM](https://app.destinyitemmanager.com/), not the extension. Chrome prevents extensions from accessing one another.***

I've used DIM for years and find it indispensable. There are a few nits I've wanted to fix from styling to information density. I've also wanted to add workflow-specific features that are unique to the way I play Destiny. These changes range from slight preferences to how I prefer to organize, which I realize are super subjective and perhaps best done as a layer on top of DIM versus adding features to the core. Some examples:

* With Destiny 2's static weapon drops, it's far easier to have a tidy vault. [I've been tracking drops](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pubhtml) and capturing my ratings. I'd like these to make their way back in to DIM without having to refer to a separate sheet.
* I'd like these ratings to be available at-a-glance so I can quickly decide if a weapon is appropriate for a given type of activity. Quick, pick a scout rifle that's good for PvP! (assuming you don't want to use `Nameless Midnight` as your sole SR forever)
* Let's say I get a drop I'm not a fan of (e.g. `Bad News`). I break it down. Another `Bad News` drops a month later. Rather than have to drop in to the EDZ and shoot Cabal to re-assess the weapon, I'd prefer to know if I previously did that, what the results were and any comments I had about it (e.g. `"So close! Give this one a go once hand cannons are buffed"`).

# Features
(**TODO: screenshot**)

## Additions
* Displays information at-a-glance derived from an external source of subjective weapon quality assessments. **You can create your own sheet from my template to specify your own rankings!** (see below) (**TODO: screenshot**)
* Duplicate items are indicated with a double knife icon, and duplicate items with a lower light level are indicated with that icon colored red. When hovering over a these icons, all other duplicates are highlighted. (**TODO: screenshot**)
* Infusable items are indicated with an up-arrow icon. Hovering over this icon will highlight items that it can use for infusion, as well as what the light will be after infusion (helps remove mod misinterpretation!). (**TODO: screenshot**)

## Modifications
* **Consistent, subdued background throughout**: No need for the contrast between toon inventory and vault; the grouping of items is enough. (**TODO: screenshot**)
* **Improved display of power level**: Maybe it's because I'm forty now :) that the font for power level was too small and difficult to read. Slight increase to the font size and decrease (increase?) to the opacity to make it stand out more. (**TODO: screenshot**)
* The tooltip has been repurposed with information from the aforementioned Google Sheet. (**TODO: screenshot**)
* **Light level border indicates element**: The elemental damage type tags were another visual cue that seems excessive in a screen full of gear, so I've moved them back to the background of the power level. (**TODO: screenshot**)
* **Flipped Kinetic weapon orientation**: Kinetic weapons now face the same direction as Energy and Power Weapons (bottom-left to top-right). This was so that the LL and any icons would not be on top of the weapon itself. (**TODO: screenshot**)
* **Removed yellow border for mods**: This has been replaced with `M` after the light level of a weapon or piece of armor. The yellow border was too much visual distraction for this small bit of information, and overwhelming to look at a vault full of yellows. It's also hard to turn off the part of my brain that thinks this is a "fully leveled item" from Destiny 1 :) (**TODO: screenshot**)

## Removals
* **Remove subclass icons**: I've never once switched subclasses this way. OK, maybe once to see if it worked (it does!) but never enough to warrant having this displayed at all times.
* **Remove collapse controls**: I never use these. Maybe once in a blue moon. Certainly a part of my workflow I can live without. *Note that you can still click the section headings for this functionality*.

# Installation and Configuration

1. Install [TamperMonkey](https://tampermonkey.net/). It may work with other UserScript extensions though I haven't tried, and won't, but you're welcome to! ¯\\_(ツ)_/¯
1. FOAF is hosted over on OpenUserJS; [one-click install](https://openuserjs.org/scripts/rslifka/FateOfAllFools_-_DIM_Customization) from there. **At this point you're good to go!** The only trouble that you'll be look at my weapon assessments and not your own, which is sort of the whole point of this UserScript ;)
1. Duplicate my [weapon assessments sheet](https://docs.google.com/spreadsheets/d/16BO3r1B5vuLtCnR06l_rtCl_WlWVDkg_9C9Gu-v-xi4/edit?usp=sharing) as a starting point (`File` => `Make a copy...`).
1. Ensure that your sheet is published to the web (`File` => `Publish to the Web...`) and that in publish settings you've selected `Entire Document` and `Tab-seperated values (.tsv)`.
1. Open DIM.
1. Open `FOAF` configuration by clicking the link in the lower left of your screen.
1. Replace the URL with your own customized Google Sheet.
1. [FIGHT FOREVERRRR GUARDIANNN](https://www.youtube.com/watch?v=sAhhgmf6Xg8&feature=youtu.be&t=5)!!!

# Development Notes (TODO)

* Enable "Allow access to file URLs" in Tampermonkey. This allows you to refresh your browser to pick up local changes during active development, using the file URLs present in `fateOfAllFools.dev.user.js`.
* Deploying at Travis requires a GH_TOKEN to be present (from Travis settings or `travis encrypt`).
