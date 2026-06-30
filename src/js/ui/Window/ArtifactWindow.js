import $ from "jquery";

import {Artifact} from "../../classes/Artifact"
import {Window} from "../Window"

import "../../../css/modal/ArtifactWindow.css"
import { substatCheck, substatListValid } from "../../classes/SubstatCheck";
import { Stats } from "../../classes/Stats";
import { DB } from "../../db/DB";
import { UI } from "../../ui";

export class ArtifactWindow extends Window{
    constructor() {
        super();
        this.initialized = 0;
        this.activeSlot = '';
        this.rarity = 1;
        this.level = 0;
        this.mainStat = '';
        this.setName = '';
        this.substats = [
            { stat: '', value: 0, values: [] },
            { stat: '', value: 0, values: [] },
            { stat: '', value: 0, values: [] },
            { stat: '', value: 0, values: [] },
        ];
        this.groups = [];
        this.groupsList = [];
    }

    init() {
        if (this.initialized) {
            return;
        }

        super.init();

        this.root.addClass('gi-artifact-window');
        this.back.addClass('gi-artifact-window-back');

        let html = '';
        // html += '<div class="gi-modal-caption">Создание артефакта</div>';

        // Slots, rarity and set line
        html += '<div class="gi-modal-art-line">';

        for (let slot of DB.Artifacts.Slots.getKeys()) {
            html += '<div class="gi-modal-type '+ slot +'" data-slot="'+ slot +'"></div>';
        }

        html += '<div class="gi-modal-set-icon flower"></div>';

        html += '<div class="gi-artifact-window-stars">';
        for (let i = 1; i <= 5; ++i) {
            html += '<div class="gi-artifact-window-star" data-rarity="'+ i +'"></div>';
        }
        html += '</div>';

        html += '<div class="gi-artifact-window-level">';
        html += '<input class="gi-artifact-slider-level" type="range">';
        html += '<div class="gi-artifact-window-level-value"></div>';
        html += '</div>';

        html += '<div class="gi-artifact-window-group-wrapper"><div class="gi-artifact-window-group"></div>';
        html += '<div class="gi-artifact-window-group-add">';
        html += `<div class="gi-artifact-window-group-add-button" data-tooltip="${UI.Lang.get('artifact_group.add')}"></div>`
        html += '</div></div>';

        html += '</div>';

        html += '<div class="gi-modal-set-line hidden">';

        for (let setName of DB.Artifacts.Sets.getKeys()) {
            let setData = DB.Artifacts.Sets.get(setName);
            let imgClass = setData.getImage();

            html += '<div class="gi-artifact-set" data-set="'+ setName +'">';
            html += '<div class="gi-artifact-set-icon flower '+ imgClass +'"></div>';
            html += '<div class="gi-artifact-set-name">'+ UI.Lang.get(setData.getName()) +'</div>';
            html += '</div>';
        }
        html += '</div><div class="gi-hr"></div><div class="gi-artifact-stats">';

        // Main stats
        html += '<div class="gi-modal-mainstat-line '+ this.activeSlot +'">';
        for (let stat of DB.Artifacts.Mainstats.getKeys()) {
            let statSlots = DB.Artifacts.Mainstats.get(stat).slots;

            html += '<div class="gi-modal-mainstat-item '+ statSlots.join(' ') + ' ' + stat + '" data-stat="'+ stat +'">';
            html += UI.Lang.get('stat_short.'+ stat) +'</div>';
        }
        html += '</div>';

        html += '<div class="gi-hr"></div><div class="gi-modal-substat-lines">';

        for (let i = 1; i <= 4; ++i) {
            html += '<div class="gi-modal-substat-line slot-'+ i +'" data-slot="'+ i +'"><div class="gi-modal-substat-stats">';

            html += '<div class="gi-modal-substat-item gi-modal-substat-item-none" data-stat="">'+ UI.Lang.get('stat_short.none') +'</div>';
            for (let stat of DB.Artifacts.Substats.getKeys()) {
                html += '<div class="gi-modal-substat-item" data-stat="'+ stat +'">'+ UI.Lang.get('stat_short.'+ stat) +'</div>';
            }
            html += '</div>';

            html += '<div class="gi-modal-substat-value-wrapper">';
            html += '<div class="gi-modal-substat-value"><input type="text" value="" class="gi-inputs-number-input">';
            html += '<div class="gi-modal-substat-add-rolls"></div></div>';
            html += '<div class="gi-modal-substat-value-rolls"></div>';

            html += '</div></div>';
        }

        html += '<div class="gi-modal-line-error"></div>';
        html += '</div><div class="gi-hr"></div>';

        html += '<div class="gi-modal-buttons"><div class="gi-inputs-button modal-save"><span class="gi-inputs-button-icon button-icon-ok">';
        html += '</span>'+ UI.Lang.get('modal_buttons.save') +'</div>';
        html += '<div class="gi-inputs-button modal-close"><span class="gi-inputs-button-icon button-icon-cancel">';
        html += '</span>'+ UI.Lang.get('modal_buttons.cancel') +'</div></div>';

        html += '</div>';

        this.appendContent(html);

        this.bindEvents();

        this.setRarity(4);
        this.setLevel(0);
        this.setSlot('');
        this.setMainstat('');
        this.setSet('');

        this.initialized = 1;
    }

    setRarity(value) {
        this.rarity = value;

        let minRarity = 1;
        let maxRarity = 5;

        let setData = DB.Artifacts.Sets.get(this.setName);

        if (setData) {
            minRarity = setData.minRarity;
            maxRarity = setData.maxRarity;
        }

        if (this.rarity < minRarity) {
            this.rarity = minRarity;
        } else if (this.rarity > maxRarity) {
            this.rarity = maxRarity;
        }

        let rarityInfo = DB.Artifacts.Rarity[this.rarity-1];
        let stars = this.rarity;

        this.root.find('.gi-artifact-window-star').each(function() {
            if (stars > 0) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }

            --stars;
        });

        this.root.find('.gi-modal-substat-line').each(function() {
            if ($(this).data('slot') > rarityInfo.maxSubstats) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });

        this.root.find('.gi-artifact-slider-level').giSlider('range', 0, rarityInfo.maxLevel);
        this.setLevel(this.level);

        this.refreshSubstats();
        this.refreshError();
    }

    setLevel(value) {
        let maxLevel = DB.Artifacts.Rarity[this.rarity-1].maxLevel;

        if (value < 0) {
            this.level = 0;
        } else if (value > maxLevel) {
            this.level = maxLevel;
        } else {
            this.level = parseInt(value);
        }

        this.root.find('.gi-artifact-window-level-value').text('+'+ this.level);
        this.refreshError();
    }

    setSlot(value) {
        if (DB.Artifacts.Slots.get(value)) {
            this.activeSlot = value;
        } else {
            this.activeSlot = DB.Artifacts.Slots.getFirstId();
        }

        if (this.mainStat) {
            let allowed = DB.Artifacts.Slots.get(this.activeSlot).mainStats;
            if (!allowed.includes(this.mainStat)) {
                this.setMainstat('');
            }
        }

        this.root.find('.gi-modal-type').removeClass('active');
        this.root.find('.gi-modal-type.'+ this.activeSlot).addClass('active');

        this.root.find('.gi-modal-mainstat-item').hide();
        this.root.find('.gi-modal-mainstat-item.'+ this.activeSlot).show();

        this.refreshError();
    }

    setMainstat(value) {
        if (DB.Artifacts.Mainstats.get(value)) {
            this.mainStat = value;
        }

        let allowed = DB.Artifacts.Slots.get(this.activeSlot).mainStats;
        if (!allowed.includes(this.mainStat)) {
            this.mainStat = allowed[0];
        }

        this.root.find('.gi-modal-mainstat-item').removeClass('active');
        this.root.find('.gi-modal-mainstat-item.'+ this.mainStat).addClass('active');

        this.root.find('.gi-modal-substat-item').removeClass('disabled');
        this.root.find('.gi-modal-substat-item[data-stat="'+ this.mainStat +'"]').addClass('disabled');
        this.root.find('.gi-modal-substat-item.disabled').removeClass('active');

        this.refreshError();
    }

    internalSetSubstatStat(slot, stat) {
        this.substats[slot - 1].stat = stat;

        this.root.find('.gi-modal-substat-line.slot-' + slot + ' .gi-modal-substat-item').removeClass('active');
        this.root.find('.gi-modal-substat-line.slot-' + slot + ' .gi-modal-substat-item[data-stat="' + stat + '"]').addClass('active');
        this.root.find('.gi-modal-substat-line.slot-' + slot + ' .gi-inputs-number-input').data('stat', stat);
    }

    setSubstatStat(slot, stat) {
        if (slot >= 1 && slot <= 4) {
            this.internalSetSubstatStat(slot, stat);

            this.refreshSubstats(slot);
        }

        this.refreshError();
    }

    refreshSubstats(filter) {
        for (let slot = 1; slot <= 4; ++slot) {
            if (filter && filter != slot) {
                continue;
            }

            let substat = this.substats[slot-1];
            let stat = substat.stat;

            if (stat) {
                const db = DB.Artifacts.Substats.get(stat);

                let rolls = db.rolls[this.rarity - 1];
                let min = rolls[0];
                let values = !substat.values || !substat.values.length ? [0] : substat.values;

                this.setSubstatValue(slot, substat.value && substat.value > 0 ? substat.value : min, values);
            } else
                this.refreshSubstatsValue(slot);
        }
    }

    appendRoll(slot, roll) {
        if (slot >= 1 && slot <= 4) {
            this.substats[slot - 1].values.push(roll);
            this.substats[slot - 1].values = this.substats[slot - 1].values.sort((a, b) => a - b);
            let subStat = DB.Artifacts.Substats.get(this.substats[slot - 1].stat);
            this.substats[slot - 1].value = subStat.rollsToValue[this.rarity - 1][this.substats[slot - 1].values.join('')].toFixed(subStat.type == "percent" ? 1 : 0);
            this.refreshSubstatsValue(slot);
        }

        this.refreshError();
    }

    removeRoll(slot, roll) {
        if (slot >= 1 && slot <= 4) {
            let index = this.substats[slot - 1].values.indexOf(roll);
            if (index >= 0) {
                this.substats[slot - 1].values.splice(index, 1);
                let subStat = DB.Artifacts.Substats.get(this.substats[slot - 1].stat);
                this.substats[slot - 1].value = subStat.rollsToValue[this.rarity - 1][this.substats[slot - 1].values.join('')].toFixed(subStat.type == "percent" ? 1 : 0);
                this.refreshSubstatsValue(slot);
            }
        }

        this.refreshError();
    }

    refreshSubstatsValue(slot) {
        let that = this;
        let stat = this.substats[slot - 1].stat;
        let divRolls = this.root.find('.gi-modal-substat-line.slot-' + slot + ' .gi-modal-substat-value-rolls');
        divRolls.empty();

        let value = this.substats[slot - 1].value;
        if (stat) {
            let data = substatCheck(stat, this.rarity, value, this.substats[slot - 1].values);
            this.substats[slot - 1].values = data.steps.map(x => x.rarity - 2);
            let remove = UI.Lang.get('tooltip.remove_roll');

            let classRef;
            if (data.last > 0 || data.steps.length == 1)
                classRef = "good";
            else
                classRef = "good active";
            for (const roll of data.steps) {
                divRolls.append('<div class="gi-modal-substat-value-roll ' + classRef + ' border-rarity-' + roll.rarity + '" data-tooltip="' + remove + '" data-roll="' + (roll.rarity - 2) + '">' + roll.value + '</div>');
            }

            if (data.last > 0) {
                divRolls.append('<div class="gi-modal-substat-value-roll last" data-tooltip="' + remove + '" data-value="' + data.last + '">' + data.last + '</div>');
            }
        }

        this.root.find('.gi-modal-substat-line.slot-' + slot + ' .gi-inputs-number-input').val(value);

        divRolls.find('.gi-modal-substat-value-roll.last').on('click', function () {
            that.setSubstatValue(slot, value - $(this).data('value'));
            $('.tooltip-wrapper').hide();
        });
        divRolls.find('.gi-modal-substat-value-roll.good.active').on('click', function () {
            that.removeRoll(slot, $(this).data('roll'));
            $('.tooltip-wrapper').hide();
        });

        this.refreshRollsForStat(slot);
    }

    internalSetSubstatValue(slot, value, values) {
        if (value < 0) {
            value = 0;
        }

        let stat = this.substats[slot - 1].stat;
        value = Stats.roundStatValue(stat, value).toString();

        this.substats[slot - 1].value = value;
        this.substats[slot - 1].values = values;
    }

    setSubstatValue(slot, value, values) {
        if (slot >= 1 && slot <= 4) {
            this.internalSetSubstatValue(slot, value, values);

            let art = this.getArtifact();
            art.tryDoRightSubstats();
            let data = substatCheck(this.substats[slot - 1].stat, this.rarity, art.value, art.values);
            this.substats[slot - 1].values = data.steps.map(x => x.rarity - 2);
            this.refreshSubstatsValue(slot);
        }

        this.refreshError();
    }

    setSet(set) {
        let setData = DB.Artifacts.Sets.get(set);

        if (!setData) {
            for (const setId of DB.Artifacts.Sets.getKeysSorted()) {
                setData = DB.Artifacts.Sets.get(setId);
                set = setId;
                if (setData.maxRarity == 5) {
                    break;
                }
            }
        }

        if (setData) {
            this.setName = set;
            let image = setData.getImage();

            this.root.find('.gi-modal-set-icon')
                .attr("class", "gi-modal-set-icon sprite sprite-artifact sprite-40 flower")
                .addClass(image);
        }

        this.setRarity(this.rarity);

        this.root.find('.gi-modal-set-line').addClass('hidden');
        this.root.find('.gi-artifact-stats').removeClass('hidden');
    }

    save() {
        if (this.callback) {
            this.callback(this.getArtifact());
        }

        this.hide();
    }

    refreshError() {
        let art = this.getArtifact();
        let errors = [];

        for (const name of art.getErrors()) {
            errors.push( UI.Lang.get('artifact_error.'+ name) )
        }

        let html = errors.join('; ');

        if (errors.length > 0) {
            html = '<span class="gi-modal-line-error-icon"></span>' + html;
        }

        this.root.find('.gi-modal-line-error').html(html);
    }

    getArtifact() {
        let result = new Artifact(this.rarity, this.level, this.activeSlot, this.setName, this.mainStat);
        let maxSubstats = DB.Artifacts.Rarity[this.rarity-1].maxSubstats;

        for (let i = 0; i < maxSubstats; ++i) {
            if (this.substats[i].stat) {
                if (substatListValid(this.substats[i].stat, parseFloat(this.substats[i].value), this.substats[i].values, this.rarity)) {
                    result.addStatByProcs(this.substats[i].stat, this.substats[i].values);
                } else {//if (this.substats[i].value) {
                    result.addStat(this.substats[i].stat, this.substats[i].value - 0);
                }
            }
        }

        result.setGroups(this.groups);

        return result;
    }

    bindEvents() {
        let that = this;
        super.bindEvents();

        this.root.find('.gi-modal-type').on('click', function() {
            let slot = $(this).data('slot');

            that.setSlot(slot);
        });

        this.root.find('.gi-artifact-window-star').on('click', function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }

            let rarity = $(this).data('rarity');
            that.setRarity(rarity);
        });

        this.root.find('.gi-modal-mainstat-item').on('click', function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }

            let stat = $(this).data('stat');

            that.setMainstat(stat);
        });

        this.root.find('.gi-modal-substat-item').on('click', function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }

            let stat = $(this).data('stat');
            let slot = $(this).closest('.gi-modal-substat-line').data('slot');

            that.setSubstatStat(slot, stat);
        });

        this.root.find('.gi-modal-set-icon').on('click', function() {
            UI.ArtifactSetSelectReact.show({
                slot: that.activeSlot,
                callback: (set) => {
                    that.setSet(set.key);
                },
            });
        });

        this.root.find('.modal-save').on('click', function() {
            that.save();
        });

        this.root.find('.modal-close').on('click', function() {
            that.hide();
        });

        this.root.find('.gi-artifact-window-level .gi-inputs-number-input').each(function() {
            let $input = $(this);

            $(this).on('change', function() {
                that.setLevel($input.val());
            });
        });

        this.root.find('.gi-modal-substat-value .gi-inputs-number-input').each(function() {
            let $input = $(this);
            let slot = $(this).closest('.gi-modal-substat-line').data('slot');

            $(this).on('change', function() {
                that.setSubstatValue(slot, $input.val());
            });

            $input.parent().find('.gi-inputs-number-input-button').on('click', function() {
                let current = parseFloat($input.val()) || 0;
                let stat = $input.data('stat');

                if (!stat) {
                    return false;
                }

                let rarity = that.rarity;
                let steps = DB.Artifacts.Substats.get(stat).steps[rarity-1];
                let new_value = 0;

                if ($(this).hasClass('plus')) {
                    for (let val of steps) {
                        new_value = val;

                        if (val > current) {
                            break;
                        }
                    }
                } else {
                    for (let val of steps) {
                        if (val >= current) {
                            break;
                        }

                        new_value = val;
                    }
                }

                if (new_value <= 0) {
                    new_value = steps[0];
                }

                that.setSubstatValue(slot, new_value);

                $input.val(new_value);
            });
        });

        this.root.find('.gi-artifact-slider-level').giSlider({
            min: 0,
            max: 20,
            showButtons: true,
            showSelected: false,
            showValues: false,
            change: function(value) {
                that.setLevel(value);
            }
        });

        this.root.find('.gi-artifact-window-group-add-button').on('click', function() {
            UI.PromptWindow.show('artifact_group.add_new_title', '', function(text) {
                that.refreshGroups(text);
            });
        });

        this.root.on('change', '.gi-artifact-window-group-dropdown', function() {
            that.groups = Artifact.trimGroupNames(that.root.find('.gi-artifact-window-group-dropdown').val());
        });
    }

    refreshRollsForStat(slot) {
        let divRolls = this.root.find('.gi-modal-substat-line.slot-' + slot + ' .gi-modal-substat-add-rolls');
        divRolls.empty();
        let stat = this.substats[slot - 1].stat;
        if (stat && this.substats[slot - 1].values.length < DB.Artifacts.Rarity[this.rarity - 1].maxUpgrades) {
            let rolls = DB.Artifacts.Substats.get(stat).rolls;
            let percent = DB.Artifacts.Substats.get(stat).type == 'percent';
            let that = this;

            let addRoll = UI.Lang.get('tooltip.add_roll');
            let rarity = 1;
            for (let roll of rolls[this.rarity - 1]) {
                rarity++;
                divRolls.append('<div class="gi-modal-substat-value-roll active border-rarity-' + rarity + '" data-roll="' + (rarity - 2) + '" data-tooltip="' + addRoll + '">+' + Stats.roundStatValue('', roll, percent) + '</div>');
            }
            divRolls.find('.gi-modal-substat-value-roll').on('click', function () {
                that.appendRoll(slot, $(this).data('roll'));
                $('.tooltip-wrapper').hide();
            });
        }
    }

    refreshGroups(newGroupName) {
        newGroupName = Artifact.trimGroupName(newGroupName);

        let dropdown_html = '<select class="gi-artifact-window-group-dropdown" multiple="multiple" data-autochange="1">';
        for (let item of this.groupsList) {
            let selected = Artifact.inGroups(this.groups, item.value);
            let value = item.value ? item.title : '*';
            dropdown_html += '<option value="'+ value +'"'+ (selected ? ' selected' : '') +'>'+ item.title +'</option>';

            if (Artifact.groupsAreEqual(newGroupName, item.value)) {
                newGroupName = '';
            }
        }

        if (newGroupName) {
            this.groups.push(newGroupName);
            dropdown_html += `<option value="${newGroupName}" selected>${newGroupName}</option>`;
        }

        dropdown_html += '</select>';

        this.root.find('.gi-artifact-window-group').html(dropdown_html);
        this.root.find('.gi-artifact-window-group-dropdown').giDropdown();
    }

    show(callback, artifact, slot, opts) {
        opts = Object.assign({}, opts)
        this.init();
        this.callback = callback;

        super.show();

        this.lockedSlot = false;
        this.groups = [];

        if (artifact) {
            this.groups = artifact.getGroups();
            this.setSet(artifact.set);
            this.setSlot(artifact.slot);
            this.setRarity(artifact.rarity);
            this.setMainstat(artifact.mainStat);
            this.setLevel(artifact.level);

            if (artifact.slot) {
                this.lockedSlot = true;
            }

            let slots = new Set([1, 2, 3, 4]);
            for (let stat in artifact.subStats) {
                this.internalSetSubstatStat(artifact.subStats[stat].index + 1, stat);
                this.internalSetSubstatValue(artifact.subStats[stat].index + 1, artifact.subStats[stat].value, artifact.subStats[stat].values);
                this.refreshSubstatsValue(artifact.subStats[stat].index + 1);
                slots.delete(artifact.subStats[stat].index + 1);
            }

            for (let i of slots) {
                this.internalSetSubstatStat(i, '');
                this.internalSetSubstatValue(i, 0);
                this.refreshSubstatsValue(i);
            }
            this.refreshError();

            this.root.find('.gi-artifact-slider-level').giSlider('set value', this.level);
        } else {
            if (slot) {
                this.lockedSlot = true;
                this.setSlot(slot);
            }

            for (let i = 1; i <= 4; ++i) {
                let data = this.substats[i-1];

                this.internalSetSubstatStat(i, data && data.stat ? data.stat : '');
                this.internalSetSubstatValue(i, data && data.stat && data.value ? data.value : 0);
                this.refreshSubstatsValue(i);
            }

            this.setSet(this.setName);
        }

        if (Array.isArray(opts.groups)) {
            this.groupsList = opts.groups;
            this.root.find('.gi-artifact-window-group-wrapper').show();
            this.refreshGroups()
        } else {
            this.groupsList = [];
            this.root.find('.gi-artifact-window-group-wrapper').hide();
        }

        this.refreshError();
        this.root.find('.gi-modal-art-line').toggleClass('locked', this.lockedSlot);
    }
}
