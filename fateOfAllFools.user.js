// ==UserScript==
// @author   Robert Slifka (github @rslifka)
// @connect  docs.google.com
// @connect  rslifka.github.io
// @description Customizations on top of the Destiny Item Manager
// @grant    GM_addStyle
// @grant    GM_log
// @grant    GM_getResourceText
// @grant    GM_xmlhttpRequest
// @homepage https://github.com/rslifka/fate_of_all_fools
// @license   MIT; https://raw.githubusercontent.com/rslifka/fate_of_all_fools/master/LICENSE.txt
// @copyright 2017, Robert Slifka (https://github.com/rslifka/fate_of_all_fools)
// @match    https://*.destinyitemmanager.com/*
// @name     FateOfAllFools - DIM Customization
// @require  http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require  https://unpkg.com/tippy.js@1.4.0/dist/tippy.js
// @require  https://raw.githubusercontent.com/blueimp/JavaScript-MD5/master/js/md5.min.js
// @run-at   document-start
// @supportURL https://github.com/rslifka/fate_of_all_fools/issues
// ==/UserScript==

(function() {
    'use strict';

    // CHANGE ONLY THIS URL
    const ITEM_DATA_TSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=2031623180&single=true&output=tsv';

    const Suitability = {
        YES: 'y',
        NO: 'n',
        UNKNOWN: '?'
    };

    const STATUS_CLASSES = new Map();
    STATUS_CLASSES.set(Suitability.YES, 'foaf-yes');
    STATUS_CLASSES.set(Suitability.NO, 'foaf-no');

    const WEAPONS = new Map();
    var rawWeaponDataMD5;

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

        isUnknown() {
            return this.pveUseful === Suitability.UNKNOWN && this.pvpUseful == Suitability.UNKNOWN;
        }
    }

    /*
        When there's a full data refresh from the sheet, we do a more aggressive
        reset of the interface elements.
    */
    var dataRefreshed;

    function log(message) {
      GM_log('[FOAF] ' + message);
    }

    /*
        Decorate the DOM to make basic weapon information more readily available
        later on.
    */
    function saveInitialWeaponInfo() {
        ["Kinetic","Energy","Power"].forEach(function(dimWeaponType) {
            $('[title][drag-channel="'+dimWeaponType+'"]').not('[data-foaf-weapon-info]').each(function(index,element) {
                // Save original title (weapon name) as we later reformat the title
                // to include additional data.
                $(this).attr('data-foaf-weapon-name', $(this).attr('title'));

                // The weapon type never changes, and we need it for infusion calculation
                const weaponName = $(this).attr('data-foaf-weapon-name');
                if (WEAPONS.has(weaponName)) {
                    $(this).attr('data-foaf-weapon-type', WEAPONS.get(weaponName).type);
                    $(this).attr('data-foaf-weapon-subtype', WEAPONS.get(weaponName).subtype);
                }

                // Save base light for dupe and infusion calculations
                const modifiedLightLevel = $(this).children('.item-stat').text();
                const isModded = $(this).children('.item-img').hasClass('complete');
                if (isModded) {
                    $(this).attr('data-foaf-is-modded', true);
                }
                const baseLightLevel = isModded ? modifiedLightLevel-5 : modifiedLightLevel;
                $(this).attr('data-foaf-base-light-level', baseLightLevel);

                $(this).attr('data-foaf-weapon-info', true);
            });
        });
    }

    /*
        Remove DIM-native tagging decoration from weapons, leaving it on all
        inventory item types.
    */
    function clearDIMTags() {
        $('[data-foaf-weapon-info] .fa, [data-foaf-weapon-info] .no-tag').each(function(index,element) {
            $(this).remove();
        });
    }

    /*
        Instead of a yellow border to indicate a mod, we're going to add "M" to the end of
        the item's Power Level. In D1, yellow borders used to indicate that an item was fully
        leveled up, and considering how eventually all items will have legendary mods in them,
        it ends up being visual noise.
    */
    function addLegendaryModInfo() {
        $('[data-foaf-is-modded]').children('.item-stat').not('[data-original-light]').each(function(index, element) {
            $(this).attr('data-original-light', $(this).text());
            $(this).text($(this).text()+'M');
        });
    }

    /*
        Pull more information from our sheet in to the tooltip.
    */
    function tooltipComments() {
        $('[data-foaf-weapon-name]').each(function(index,element) {
            const weaponName = $(this).attr('data-foaf-weapon-name');
            if (!WEAPONS.has(weaponName)) {
                return true;
            }

            var weapon = WEAPONS.get(weaponName);
            let tooltipText = weaponName + ' // ' + weapon.type + ' - ' + weapon.subtype + '\n';
            tooltipText += weapon.comments;
            $(this).attr('title', tooltipText);
        });
    }

    /*
        Create a visual representation of the rankings from our Google Sheet.
    */
    function iconifyWeapons() {
        const exclusion = dataRefreshed ? '' : '[data-foaf-tagged]';
        $('[data-foaf-weapon-name]').not(exclusion).each(function(index,element) {
            if (dataRefreshed) {
                $(this).children('.item-tag').remove();
            }

            const weaponName = $(this).attr('data-foaf-weapon-name');
            $(this).attr('data-foaf-tagged', true);

            if (!WEAPONS.has(weaponName)) {
                $(this).append($("<div>", {"class": "item-tag foaf-question-mark"}));
                return true;
            }

            var weapon = WEAPONS.get(weaponName);
            let statusMarkers = '';
            if (weapon.isJunk()) {
                statusMarkers = 'junk;';
                $(this).append($("<div>", {"class": "item-tag foaf-thumbs-down"}));
            } else if (weapon.isUnknown()) {
                statusMarkers = 'unknown;';
                $(this).append($("<div>", {"class": "item-tag foaf-question-mark"}));
            } else {
                statusMarkers = 'pveUseful:'+weapon.pveUseful+';pvpUseful:'+weapon.pvpUseful;
                if (weapon.pveUseful !== Suitability.UNKNOWN) {
                    statusMarkers = 'pveUseful:'+weapon.pveUseful;
                    $(this).append($("<div>", {"class": "foaf-pve " + STATUS_CLASSES.get(weapon.pveUseful)}));
                }
                if (weapon.pvpUseful !== Suitability.UNKNOWN) {
                    let leftPadding = '';
                    if (weapon.pveUseful === Suitability.UNKNOWN) {
                        leftPadding = 'left:2px;';
                    }
                    $(this).append($("<div>", {"class": "foaf-pvp " + STATUS_CLASSES.get(weapon.pvpUseful), "style": leftPadding}));
                }
            }
            $(this).attr('foaf-status-markers', statusMarkers);

            ['pve', 'pvp'].forEach(function(statusIcon) {
                $('.foaf-'+statusIcon+'.'+STATUS_CLASSES.get(Suitability.YES)).on('mouseenter.status', function() {
                    $('[data-foaf-weapon-info]:not([foaf-status-markers*="'+statusIcon+'Useful:'+Suitability.YES+'"])').addClass('search-hidden');
                });
                $('.foaf-'+statusIcon+'.'+STATUS_CLASSES.get(Suitability.YES)).on('mouseleave.status', function() {
                    $('.search-hidden').removeClass('search-hidden');
                });
            });
        });
    }

    function indicateDupes() {
        /*
            This is a huge hammer but we have to. If a weapon is deleted out of
            your inventory, it stands to change the dupe indicators.
        */
        $('.dupe-stat').remove();
        var weapons = new Map();
        $('[data-foaf-weapon-name]').each(function(index,element) {
            let weaponName = $(this).attr('data-foaf-weapon-name');
            let weaponData = {
                name: weaponName,
                domElement: this,
                light: parseInt($(this).attr('data-foaf-base-light-level'))
            };
            if (weapons.has(weaponName)) {
                weapons.set(weaponName, weapons.get(weaponName).concat(weaponData));
            } else {
                weapons.set(weaponName, [weaponData]);
            }
        });

        for (let [weaponName, weaponInstances] of weapons) {
            if (weaponInstances.length == 1) {
                $(weaponInstances[0].domElement).children('.dupe-stat').remove();
                continue;
            }
            const maxLight = Math.max(...weaponInstances.map(function(w) {return w.light;}));
            weaponInstances.forEach(function(weapon) {
                const dupeDesc = (weapon.light < maxLight) ? ('D-LO') : ('D');
                const dupeClass = (weapon.light < maxLight) ? ('dupe-lower') : ('dupe-higher');

                $(weapon.domElement).children('.dupe-stat').remove();
                $(weapon.domElement).append($("<div>", {"class": "dupe-stat " + dupeClass}).text(dupeDesc));

                $(weapon.domElement).children('.dupe-stat').on('mouseenter.dupe', function() {
                    $('div[data-foaf-weapon-name]').not('[data-foaf-weapon-name="'+weapon.name+'"]').addClass('search-hidden');
                });
                $(weapon.domElement).children('.dupe-stat').on('mouseleave.dupe', function() {
                    $('.search-hidden').removeClass('search-hidden');
                });
            });
        }
    }

    function indicateInfusion() {
        /*
            This is a huge hammer but we have to. If a weapon is deleted out of
            your inventory, it will change the infusion indicators (potentially)
            of other weapons.
        */
        $('.infuse-stat').remove();

        var weaponsByType = new Map();
        $('[data-foaf-weapon-type]').each(function(index,element) {
            const weaponType = $(this).attr('data-foaf-weapon-type');
            const weaponData = {
                type: weaponType,
                domElement: this,
                isModded: $(this).is('[data-foaf-is-modded]'),
                light: parseInt($(this).attr('data-foaf-base-light-level'))
            };
            if (weaponsByType.has(weaponType)) {
                weaponsByType.set(weaponType, weaponsByType.get(weaponType).concat(weaponData));
            } else {
                weaponsByType.set(weaponType, [weaponData]);
            }
        });

        for (let [weaponType, weaponInstances] of weaponsByType) {
            if (weaponInstances.length == 1) {
                continue;
            }

            const maxLight = Math.max(...weaponInstances.map(function(w) {return w.light;}));
            for (let weapon of weaponInstances) {
                if (weapon.light === maxLight) {
                    continue;
                }

                if (WEAPONS.get($(weapon.domElement).attr('data-foaf-weapon-name')).isJunk()) {
                    continue;
                }

                $(weapon.domElement).append($("<div>", {"class": "infuse-stat foaf-up"}));

                $(weapon.domElement).children('.infuse-stat').on('mouseenter.infuse', function() {
                    // Hide all known weapons not of the this type, since they can't be used for infusion
                    // This means we'll show weapons we don't know about which is fair because they're probably
                    // blue weapons we might want to infuse anyway. Not sure what to do about this case.
                    $('[data-foaf-weapon-name]').not('[data-foaf-weapon-type="'+weapon.type+'"]').addClass('search-hidden');

                    // Hide all weapons of this type with lower base light
                    $('[data-foaf-weapon-type="'+weapon.type+'"]').filter(function() {
                        // Don't hide yourself dude!
                        if (this === weapon.domElement) {
                            return false;
                        }
                        return $(this).attr('data-foaf-base-light-level') <= weapon.light;
                    }).addClass('search-hidden');

                    // Show indicator for new light level by infusing this weapon
                    $('[data-foaf-weapon-type="'+weapon.type+'"]').filter(function() {
                        return $(this).attr('data-foaf-base-light-level') > weapon.light;
                    }).each(function(index,element) {
                        let newLight = parseInt($(this).attr('data-foaf-base-light-level'));
                        newLight += weapon.isModded ? 5 : 0;
                        $(this).append($("<div>", {"class": "infuse-new-light"}).text(newLight));
                    });
                });
                $(weapon.domElement).children('.infuse-stat').on('mouseleave.infuse', function() {
                    $('.search-hidden').removeClass('search-hidden');
                    $('.infuse-new-light').remove();
                });
            }
        }
    }

    function refresh() {
        if (dataRefreshed) {
            log('Refreshing (full)...');
        } else {
            log('Refreshing (partial)...');
        }

        log('  Saving weapon info...');
        saveInitialWeaponInfo();
        log('  Clearing DIM weapon item tags...');
        clearDIMTags();
        log('  Enhancing tooltips...');
        tooltipComments();
        log('  Adding mod indicator...');
        addLegendaryModInfo();
        log('  Adding icons to weapons...');
        iconifyWeapons();
        log('  Dupify!...');
        indicateDupes();
        log('  Infusify!...');
        indicateInfusion();

        dataRefreshed = false;
        log('Done!');
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

    function rankingsDownloaded() {
        var deferredReady = $.Deferred();
        GM_xmlhttpRequest({
            method: 'GET',
            url: ITEM_DATA_TSV,
            context: deferredReady,
            onload: function(response) {
                log('Processing weapon data...');

                const rawWeaponData = response.responseText;
                if (rawWeaponDataMD5 === md5(rawWeaponData)) {
                    log('Checksums match, skipping refresh');
                    deferredReady.resolve();
                    return;
                }

                // If the data changed, save the new checksum
                rawWeaponDataMD5 = md5(rawWeaponData);

                var dataLines = response.responseText.split(/[\r\n]+/);
                log('Found ('+(dataLines.length-1)+') weapons');

                // Name=0,Slot,Type,Subtype,Personal Fave?,PvE, PvP, Comments
                for (var i = 1; i < dataLines.length; i++) {
                    var data = dataLines[i].split('\t');
                    WEAPONS.set(data[0], new Weapon(data[0], data[2], data[3], data[4], data[5], data[6], data[7]));
                }

                dataRefreshed = true;

                deferredReady.resolve();
            }
        });
        return deferredReady.promise();
    }

    log('Applying CSS...');
    [
        'https://rslifka.github.io/fate_of_all_fools/css/fateofallfools.css',
        'https://rslifka.github.io/fate_of_all_fools/css/overrides.css'
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
        $.when(rankingsDownloaded()).then(function() {
            log('Data refresh complete!');
        });
    }, 30000);

    log('Initialized, waiting for items to appear...');
    $.when(itemsAreLoaded(), rankingsDownloaded()).then(function() {
        refresh();
        setInterval(function() {
            refresh();
        }, 5000);
    });
})();
