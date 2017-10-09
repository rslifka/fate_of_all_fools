# Fate of All Fools
[TamperMonkey](https://tampermonkey.net/)-based minor enhancements to the visual presentation of [Destiny Item Manager](https://www.destinyitemmanager.com/) for Destiny 2. You should totally use DIM, it's awesome!

# Why FOAF?
I've used DIM for years and find it indispensible. That being said, there are a few display/styling nits I've wanted to fix and I've also wanted to add workflow-specific things I'd like to change that are unique to the way I use DIM. With Destiny 2's static weapon drops, [I've been tracking drops](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pubhtml) and capturing my ratings. I'd like these to make their way back in to DIM and realize this workflow is so specific, I'd have to do it myself. (Oh, and I wanted an excuse to use ["Fate of All Fools"](http://destinydb.com/item/3490486524/fate-of-all-fools) which is just a great weapon/perk name! :)

# Before and After
(screenshot here)

# Features

### Additions
* Visual styling derived from an external source (in this case, Google Sheets). This is the main reason I developed this UserScript. I wanted to be able to tell a few things at a 

### Reductions
* **Remove subclass icons**: I've never once switched subclasses this way. OK, maybe once to see if it worked (it does!) but never enough to warrant having this displayed at all times.
* **Remove collapse controls**: I never use these. Maybe once in a blue moon. Certainly a part of my workflow I can live without.

### Tweaks / Relocations
* **Consistent, subdued background throughout**: No need for the contrast between toons and vault; the grouping of items is enough.
* **Improved display of power level**: Maybe it's because I'm forty now :) that the font for power level was too small and difficult to read. Slight increase to the font size and decrease (increase?) to the opacity to make it stand out more.
* **Power level background indicates element**: The elemental damage type tags were another visual cue that seems excessive in a screen full of gear, so I've moved them back to the background of the power level.
* **Flipped Kinetic weapon orientation**: Kinetic weapons now face the same direction as Energy and Power Weapons (bottom-left to top-right). This was so that the LL and any icons would not be on top of the weapon itself.
* **Removed yellow border for mods**: This has been replaced with a `+M` after the power level of a weapon or piece of armor. The yellow border was too much visual distraction for this small bit of information, and overwhelming to look at a vault full of yellows. It's also hard to turn off the part of my brain that thinks this is a "fully leveled item" from Destiny 1 :)
