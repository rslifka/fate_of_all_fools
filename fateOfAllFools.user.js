// ==UserScript==
// @author   Robert Slifka (github @rslifka)
// @connect  docs.google.com
// @connect  unpkg.com
// @connect  rslifka.github.io
// @description Customizations on top of the Destiny Item Manager
// @grant    GM_addStyle
// @grant    GM_log
// @grant    GM_getResourceText
// @grant    GM_xmlhttpRequest
// @homepage https://github.com/rslifka/fate_of_all_fools
// @match    https://*.destinyitemmanager.com/*
// @name     FateOfAllFools - DIM Customization
// @require  http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require  https://unpkg.com/tippy.js@1.4.0/dist/tippy.js
// @run-at   document-start
// @supportURL https://github.com/rslifka/fate_of_all_fools/issues
// ==/UserScript==

(function() {
    'use strict';

    /*
        **************************************************************
        C H A N G E   O N L Y   T H E S E   U R L S
        **************************************************************
    */
    const ITEM_DATA_TSVS = [
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=0&single=true&output=tsv',
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=945724952&single=true&output=tsv',
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1848980798&single=true&output=tsv'
    ];

    const Suitability = {
        YES: 'y',
        NO: 'n',
        UNKNOWN: '?'
    };

    class Weapon {
        constructor(name, type, subtype, favourite, pveUseful, pvpUseful, comments) {
            this.name = name;
            this.type = type;
            this.subtype = subtype;
            this.favourite = favourite.toLowerCase() === 'y';
            this.comments = (comments === '') ? '(no comments entered)' : comments;
            switch(pveUseful.toLowerCase()) {
                case 'y':
                    this.pveUseful = Suitability.YES;
                    break;
                case 'n':
                    this.pveUseful = Suitability.NO;
                    break;
                default:
                    this.pveUseful = Suitability.UNKNOWN;
            }
            switch(pvpUseful.toLowerCase()) {
                case 'y':
                    this.pvpUseful = Suitability.YES;
                    break;
                case 'n':
                    this.pvpUseful = Suitability.NO;
                    break;
                default:
                    this.pvpUseful = Suitability.UNKNOWN;
            }
        }

        isJunk() {
            return this.pveUseful === Suitability.NO && this.pvpUseful === Suitability.NO;
        }
    }

    const WEAPONS = new Map();

    const STATUS_CLASSES = new Map();
    STATUS_CLASSES.set(Suitability.YES, 'foaf-yes');
    STATUS_CLASSES.set(Suitability.NO, 'foaf-no');
    STATUS_CLASSES.set(Suitability.UNKNOWN, 'foaf-unknown');

    function log(message) {
      GM_log('[FOAF] ' + message);
    }

    // We're replacing DIM's tags with our own
    function clearDIMTags() {
        ["Kinetic","Energy","Power"].forEach(function(dimWeaponType) {
            $("div[drag-channel='"+dimWeaponType+"'] .fa").each(function(index,element) {
                $(this).remove();
            });
            $("div[drag-channel='"+dimWeaponType+"'] .no-tag").each(function(index,element) {
                $(this).remove();
            });
        });
    }

    /*
        Instead of a yellow border to indicate a mod, we're going to add "+M" to the end of
        the item's Power Level. In D1, yellow borders used to indicate that an item was fully
        leveled up, and considering how eventually all items will have legendary mods in them,
        it ends up being visual noise.
    */
    function addLegendaryModInfo() {
        $('.item-img.complete').siblings('.item-stat').text(function(index,oldText) {
            return (oldText.endsWith('+M')) ? (oldText) : (oldText+'+M');
        });
    }

    function iconifyWeapons() {
        ["Kinetic","Energy","Power"].forEach(function(dimWeaponType) {
            $('div[title][drag-channel="'+dimWeaponType+'"]').each(function(index,element) {
                var weaponName = $(this).attr('title');
                var $item_tag = $(this).children('.item-tag');

                if (!WEAPONS.has(weaponName)) {
                    if ($item_tag.length === 0) {
                        $(this).append($("<div>", {"class": "item-tag foaf-question-mark"}));
                    }
                    return;
                }

                var weapon = WEAPONS.get(weaponName);
                if (weapon.isJunk()) {
                    if ($item_tag.length === 0) {
                        $(this).append($("<div>", {"class": "item-tag foaf-thumbs-down"}));
                    }
                    return;
                }

                if ($item_tag.length === 0) {
                    var tagClass = STATUS_CLASSES.get(weapon.pveUseful);
                    $(this).append($("<div>", {"class": "item-tag foaf-pve " + tagClass}));
                    tagClass = STATUS_CLASSES.get(weapon.pvpUseful);
                    $(this).append($("<div>", {"class": "item-tag foaf-pvp " + tagClass}));
                }
            });
        });
    }

    function unknownWeaponTemplate(weaponName) {
        return $(`
<table style="min-width:350px;max-width:500px;">
    <tr>
        <td colspan="3">
            <table style="width:100%">
                <tr>
                    <td style="text-align:left;font-weight:bold;font-size:1.2em">
                        ${weaponName}
                    </td>
                    <td style="text-align:right;">
                        <span style="font-weight:bold;font-size:1.2em">Unknown</span>
                        <div class="foaf-question-mark" style="font-size:1.2em;display:inline-block"/>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
        `).get(0);
    }

    const PVE_STATUS_DESC = new Map();
    PVE_STATUS_DESC.set(Suitability.YES, 'CRUSH the Red Legion!');
    PVE_STATUS_DESC.set(Suitability.NO, 'Nope :(');
    PVE_STATUS_DESC.set(Suitability.UNKNOWN, 'Uncertain ¯\\_(ツ)_/¯');

    const PVP_STATUS_DESC = new Map();
    PVP_STATUS_DESC.set(Suitability.YES, 'FIGHT FOREVER GUARDIANN!');
    PVP_STATUS_DESC.set(Suitability.NO, 'Nope :(');
    PVP_STATUS_DESC.set(Suitability.UNKNOWN, 'Uncertain ¯\\_(ツ)_/¯');

    function knownWeaponTemplate(weapon) {
        return $(`
<table style="min-width:350px;max-width:500px;">
    <tr>
        <td colspan="3">
            <table style="width:100%">
                <tr>
                    <td style="text-align:left;font-weight:bold;font-size:1.2em">
                        ${weapon.name}
                    </td>
                    <td style="text-align:right;font-weight:bold;font-size:1.2em">
                        ${weapon.type} // ${weapon.subtype}
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align:left;word-wrap:break-word;">
                        <span>${weapon.comments}</span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td class="foaf-pve ${STATUS_CLASSES.get(weapon.pveUseful)}" style="text-align:center;font-size:1.5em">
        </td>
        <td style="text-align:left;white-space:nowrap;">
            Good for PvE?
        </td>
        <td class="${STATUS_CLASSES.get(weapon.pveUseful)}" style="text-align:left;font-weight:bold;width:100%;">
            ${PVE_STATUS_DESC.get(weapon.pveUseful)}
        </td>
    </tr>
    <tr>
        <td class="foaf-pvp ${STATUS_CLASSES.get(weapon.pvpUseful)}" style="text-align:center;font-size:1.2em">
        </td>
        <td style="text-align:left;white-space:nowrap;">
            Good for PvP?
        </td>
        <td class="${STATUS_CLASSES.get(weapon.pvpUseful)}" style="text-align:left;font-weight:bold;width:100%;">
            ${PVE_STATUS_DESC.get(weapon.pvpUseful)}
        </td>
    </tr>
</table>
        `).get(0);
    }

    /*
        TODO - When you drag weapons around between your vault and character(s),
        DIM actually creates a new element in a different tree, which means we
        lose all of the changes we've made, including installing tooltips.

        You can't globally re-init tippy or else it will cause multiple tooltips
        to appear, so we need to figure out a way to do this per-element perhaps?

        For now, it's an open issue that you lose tooltips when you drag elements around.
    */
    var tippyInitialized = false;
    function populateTooltips() {
        ["Kinetic","Energy","Power"].forEach(function(dimWeaponType) {
            $('div[title][drag-channel="'+dimWeaponType+'"]').each(function(index,element) {
                $(this).addClass('tippy-tip');
            });
        });
        if (tippyInitialized) {
          return;
        }
        tippyInitialized = true;
        tippy('.tippy-tip', {
            html: targetElement => {
                var weaponName = $(targetElement).attr('title');
                if (!WEAPONS.has(weaponName)) {
                    return unknownWeaponTemplate(weaponName);
                }
                return knownWeaponTemplate(WEAPONS.get(weaponName));
            }
        });
    }

    function refresh() {
        log('Refreshing...');

        log('Clearing DIM weapon item tags...');
        clearDIMTags();
        log('Adding mod indicator...');
        addLegendaryModInfo();
        log('Adding icons to weapons...');
        iconifyWeapons();
        log('Resetting tooltips...');
        populateTooltips();

        log('Done! Scheduling next refresh.');
        setTimeout(refresh, 5000);
    }

    function itemsAreLoaded() {
        var deferredReady = $.Deferred();
        setInterval(function() {
            if ($('.item-img').length > 0) {
                deferredReady.resolve();
            }
        }, 1000);
        return deferredReady.promise();
    }

    function rankingsDownloaded(tsvUrl) {
        var deferredReady = $.Deferred();
        GM_xmlhttpRequest({
            method: 'GET',
            url: tsvUrl,
            context: deferredReady,
            onload: function(response) {
                log('Processing collection: "'+tsvUrl+'"');

                var dataLines = response.responseText.split(/[\r\n]+/);
                log('Found ('+(dataLines.length-1)+') weapons');

                for (var i = 1; i < dataLines.length; i++) {
                    // We've split by TAB because no weapon names have tabs in them
                    var data = dataLines[i].split('\t');
                    // log('Examining ' + data);

                    // Name=0,Type,Subtype,Personal Fave?,PvE, PvP, Comments
                    WEAPONS.set(data[0], new Weapon(data[0], data[1], data[2], data[3], data[4], data[5], data[6]));
                }

                deferredReady.resolve();
            }
        });
        return deferredReady.promise();
    }

    log('Applying CSS...');
    [
        'https://rslifka.github.io/fate_of_all_fools/css/fateofallfools.css',
        'https://rslifka.github.io/fate_of_all_fools/css/overrides.css',
        'https://unpkg.com/tippy.js@1.4.0/dist/tippy.css'
    ].forEach(function(cssPath) {
        log('Downloading style: '+cssPath);
        GM_xmlhttpRequest({
            method: 'GET',
            url: cssPath,
            onload: function(response) {
                log('Done! Installing...');
                GM_addStyle(response.responseText);
            }
        });
    });

    /*
        Pull down new weapon data at a separate interval than the refresh timer.
        The idea is that you're updating this sheet on a much longer interval
        than you're dragging items around (which requires a periodic refresh to
        re-apply our styles).

        That being said, chances are when you do make an update, you'd like to
        see the change sooner than later, so we'll use a time conducive to
        interactivity.
    */
    log('Initializing data refresh timer...');
    setInterval(function() {
        $.when(
            rankingsDownloaded(ITEM_DATA_TSVS[0]),
            rankingsDownloaded(ITEM_DATA_TSVS[1]),
            rankingsDownloaded(ITEM_DATA_TSVS[2])
        ).then(function() {
            log('Data refresh complete!');
        });
    }, 15000);

    log('Initialized, waiting for items to appear...');
    $.when(
        itemsAreLoaded(),
        rankingsDownloaded(ITEM_DATA_TSVS[0]),
        rankingsDownloaded(ITEM_DATA_TSVS[1]),
        rankingsDownloaded(ITEM_DATA_TSVS[2])
    ).then(refresh);
})();
