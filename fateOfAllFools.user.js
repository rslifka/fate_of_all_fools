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
        C H A N G E   O N L Y   T H E S E   U R L S \/ \/ \/ \/ \/
        **************************************************************
    */
    var ITEM_DATA_TSVS = [
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=0&single=true&output=tsv',
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=945724952&single=true&output=tsv',
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1848980798&single=true&output=tsv'
    ];
    /*
        **************************************************************
        C H A N G E   O N L Y   T H E S E   U R L S ^^^^^^^^^^^^^^
        **************************************************************
    */

    var ALL_WEAPON_STATUS = new Map();
    var ALL_WEAPON_COMMENTS = new Map();
    var PVE_WEAPON_STATUS = new Map();
    var PVP_WEAPON_STATUS = new Map();

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
        var STATUS_CLASSES = {
            'Y': 'foaf-yes',
            'N': 'foaf-no',
            '?': 'foaf-unknown'
        };

        ["Kinetic","Energy","Power"].forEach(function(dimWeaponType) {
            $('div[title][drag-channel="'+dimWeaponType+'"]').each(function(index,element) {

                var weaponName = $(this).attr('title');
                var weaponMatched = false;
                var $item_tag = $(this).children('.item-tag');

                switch(ALL_WEAPON_STATUS.get(weaponName)) {
                    case 'Junk':
                        if ($item_tag.length === 0) {
                            $(this).append($("<div>", {"class": "item-tag foaf-thumbs-down"}));
                        }
                        break;
                    case 'Keep':
                    case 'Favourite':
                        if ($item_tag.length === 0) {
                            var tagClass = STATUS_CLASSES[PVE_WEAPON_STATUS.get(weaponName)];
                            $(this).append($("<div>", {"class": "item-tag foaf-pve " + tagClass}));
                            tagClass = STATUS_CLASSES[PVP_WEAPON_STATUS.get(weaponName)];
                            $(this).append($("<div>", {"class": "item-tag foaf-pvp " + tagClass}));
                        }
                        break;
                    default:
                        if ($item_tag.length === 0) {
                            $(this).append($("<div>", {"class": "item-tag foaf-help"}));
                        }
                }
            });
        });
    }

    function populateTooltips() {
        ["Kinetic","Energy","Power"].forEach(function(dimWeaponType) {
            $('div[title][drag-channel="'+dimWeaponType+'"]').each(function(index,element) {
                $(this).addClass('tippy-tip');
            });
        });

        tippy('.tippy-tip');
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

                // Skip the column headers line
                // Name,Type,Archetype,Status,PvE,PvP,Comments
                for (var i = 1; i < dataLines.length; i++) {
                    // We've split by TAB because no weapon names have tabs in them
                    var data = dataLines[i].split('\t');
                    // log('Examining ' + data);

                    ALL_WEAPON_STATUS.set(data[0], data[3]);
                    // log('Weapon registered: '+data[0]+'; status='+data[3]);

                    PVE_WEAPON_STATUS.set(data[0], data[4]);
                    // log('PvE weapon registered: '+data[0]+'; status='+data[4]);

                    PVP_WEAPON_STATUS.set(data[0], data[5]);
                    // log('PvP weapon registered: '+data[0]+'; status='+data[5]);

                    ALL_WEAPON_COMMENTS.set(data[0], data[6]);
                    // log('Comments: '+data[0]+'; status='+data[6]);
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
