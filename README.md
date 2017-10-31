# Fate of All Fools
`FOAF` is a [TamperMonkey](https://tampermonkey.net/)-based suite of enhancements to DIM for Destiny 2. It's also the name of a [unique weapon](http://destinydb.com/item/3490486524/fate-of-all-fools) and part of a [really touching story](https://www.reddit.com/r/DestinyTheGame/comments/2lgxd4/deej_just_sent_my_husband_the_new_exotic_fate_of/).

I've used [Destiny Item Manager](https://www.destinyitemmanager.com/) for years and find it indispensable. However, there are a few nits I've wanted to fix from styling to information density; some affecting the UI more than others. I've also wanted to add workflow-specific features that are unique to the way I use DIM. These changes range from slight preferences to how I prefer to organize, which I realize are super subjective and perhaps best done as a layer on top of DIM versus adding features to the core. (BTW you should totally use DIM, it's awesome!)

For example:

* With Destiny 2's static weapon drops, it's far easier to have a tidy vault. [I've been tracking drops](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pubhtml) and capturing my ratings. I'd like these to make their way back in to DIM without having to refer to a separate sheet.
* Let's say I get a drop I'm not a fan of (e.g. `Bad News`). I break it down. Another `Bad News` drops a month later. Well rather than have to drop in to the EDZ and shoot Cabal to re-assess the weapon, I'd prefer to know if I previously did that, what the results were and any comments I had about it (e.g. `"So close! Give this one a go once hand cannons are buffed"`).

# Features

## Additions
* Displays additional information derived from an external source of subjective weapon quality assessments (in this case, Google Sheets). This is the main reason I developed this UserScript. I wanted to be able to tell a few things at a glance when looking at my vault. FOAF supports linking to your own sheet so you can of course customize these rankings. **You can create your own sheet from my template to specify your own rankings!** (see below)
(**TODO: screenshot**)
* Duplicate items are indicated with a `dup` tag, and duplicate items with a lower light level are indicated with `dupe-lo`.
(**TODO: screenshot**)
* When hovering over a duplicate item, all other duplicates are highlighted.
(**TODO: screenshot**)

## Modifications
* **Consistent, subdued background throughout**: No need for the contrast between toon inventory and vault; the grouping of items is enough. (**TODO: screenshot**)
* **Improved display of power level**: Maybe it's because I'm forty now :) that the font for power level was too small and difficult to read. Slight increase to the font size and decrease (increase?) to the opacity to make it stand out more. (**TODO: screenshot**)
* The tooltip has been repurposed with information from the aforementioned Google Sheet. (**TODO: screenshot**)
* **Light level border indicates element**: The elemental damage type tags were another visual cue that seems excessive in a screen full of gear, so I've moved them back to the background of the power level. (**TODO: screenshot**)
* **Flipped Kinetic weapon orientation**: Kinetic weapons now face the same direction as Energy and Power Weapons (bottom-left to top-right). This was so that the LL and any icons would not be on top of the weapon itself. (**TODO: screenshot**)
* **Removed yellow border for mods**: This has been replaced with `M` after the light level of a weapon or piece of armor. The yellow border was too much visual distraction for this small bit of information, and overwhelming to look at a vault full of yellows. It's also hard to turn off the part of my brain that thinks this is a "fully leveled item" from Destiny 1 :) (**TODO: screenshot**)

## Removals
* **Remove subclass icons**: I've never once switched subclasses this way. OK, maybe once to see if it worked (it does!) but never enough to warrant having this displayed at all times.
* **Remove collapse controls**: I never use these. Maybe once in a blue moon. Certainly a part of my workflow I can live without. Note that you can still click the section headings for this functionality.

# Installation and Configuration

1. Install [TamperMonkey](https://tampermonkey.net/). It may work with other UserScript extensions though I haven't tried, and won't, but you're welcome to! ¯\\_(ツ)_/¯
1. FOAF is hosted over on OpenUserJS; [one-click install](https://openuserjs.org/scripts/rslifka/FateOfAllFools_-_DIM_Customization) from there.

At this point you're good to go! The only trouble that you'll be look at my weapon assessments and not your own :)

# Customization

1. Duplicate my [weapon assessments sheet](https://docs.google.com/spreadsheets/d/16BO3r1B5vuLtCnR06l_rtCl_WlWVDkg_9C9Gu-v-xi4/edit?usp=sharing) as a starting point.
1. Ensure that your sheet is published to the web (`File` => `Publish to the Web...`) and that in publish settings you've selected `Entire Document`.
1. For each tab, generate a TSV link by choosing `Tab-seperated values` and copying the link Google generates.
1. Click on the TamperMonkey extension icon in your browser.
1. Click on the FOAF script.
1. Replace the three Google URLs with the three URLs to your Google Sheet (one for each weapon category).
