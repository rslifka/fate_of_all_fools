# 2018/07/01
* Issue #65: Dupe indication not working for statically-rolled weapons (forgot to check the value of the attr instead of just its presence - a pattern that could be address throughout)

# 2018/06/30
* Issue #63: Infusion indicators stop functioning when reviews are turned on (the underlying .item-stat class was used for both power level and review score)
* Issue #64: Stat styling in compare mode is hosed (and in the infusion dialog)
* Issue #59: Rethink dupe logic since rolls will no longer be static (don't include items that have a roll rating in the dupe calculations)
* Reduce quantity of iteration when updating attributes on refresh.

# 2018/06/25
* Issue #51: Split weapon database and assessments in to multiple sheets (pretty big change that updates configuration and adds support for shaders too - yeesh; marathon day).

# 2018/06/23
* Decreased border width to reclaim a bunch of pixels and reduce visual noise.
* Styled "stat" field in all channels (+Shaders, +Consumables).

# 2018/06/22
* Issue #57: Dupe icon on kinetic weapons is in its old place (and new place).

# 2018/06/21
* Issue #54: Shrink size of question mark and thumbs-down icons for consistency. (things looked a bit hokey with a massive THUMBS-DOWN in the middle of your vault :)
* Issue #53: Relocate "FATE Config" as it overlays / is hidden by character and vault contents. (moved to the nav now)
* Issue #43: Any time .isJunk() is used outside of the initial weapon decorator should be moved to an attribute check. (strive to use the weapon database only for initial decoration)
* Issue #40: Dupe indicator uses old style 'M' (mod installed) checking. This might be a bug? (didn't ultimately cause an issues though I did change it to use `data-fate-base-light` instead)
* Modify opacity to increase readability of markers and stats.

# 2018/06/19
* Breaking change to how FOAF is deployed. Please re-install from OpenUserJS. This was to both make auto-update possible from OUJS as well and fix an intermittent hosting issue with GitHub's releases.

# 2018/06/15
* With the recent news that Forsaken will have random rolls, the current strategy for listing and rating weapons and armor will no longer work as you cannot rate a weapon by the name any more (well, going forward since D2Y1 items will stay statically rolled). I'm going to have to split the sheets apart either in to separate tabs within one sheet or multiple sheets.
