import { BuildData } from "../Build/Data";
import { CBaseDamage, CDivide, CMulti, CMultiplierBonus, CMultiplierDefence, CMultiplierReaction, CMultiplierResistance, CResistanceValue, CSubtract, CSum } from "./Compile/Types/Block";
import { CBlock } from "./Compile/Types";
import { CConst } from "./Compile/Types/Item";
import { CCritDmg, CCritRate, CDamage } from "./Compile/Types/Damage";
import { Feature2 } from "../Feature2";
import { FeatureMultiplierReactionMeltForvard } from "./Multiplier/Reaction/Amplifying/Melt/Forvard";
import { FeatureMultiplierReactionMeltReverse } from "./Multiplier/Reaction/Amplifying/Melt/Reverse";
import { FeatureMultiplierReactionVaporizeForvard } from "./Multiplier/Reaction/Amplifying/Vaporize/Forvard";
import { FeatureMultiplierReactionVaporizeReverse } from "./Multiplier/Reaction/Amplifying/Vaporize/Reverse";
import { makeStatItem } from "./Compile/Helpers";

const REACTION_MULTI = {
    'vaporize_hydro': FeatureMultiplierReactionVaporizeForvard,
    'vaporize_pyro': FeatureMultiplierReactionVaporizeReverse,
    'melt_cryo': FeatureMultiplierReactionMeltReverse,
    'melt_pyro': FeatureMultiplierReactionMeltForvard,
};

export class FeatureDamage extends Feature2 {
    constructor(params) {
        super(params);

        this.items = params.items || [];
        this.category = params.category || 'other';
        this.element = params.element || 'phys';
        this.damageType = params.damageType || 'none';
        this.cannotReact = !!params.cannotReact;
        this.damageBonuses = params.damageBonuses || [];
        this.allowInfusion = params.allowInfusion;
        this.rotationAfterItems = params.rotationAfterItems;
    }

    /**
     * @returns {boolean}
     */
    hasDetails() {
        return true;
    }

    /**
     * @returns {boolean}
     */
    usedInRotation() {
        return true;
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsDmgBonus(data) {
        let element = this.getElement(data);
        let damageType = this.getDamageType(data);
        let result = ['dmg_all', 'dmg_'+ element +'*'];

        if (damageType) {
            result.push('dmg_'+ damageType);
            result.push('dmg_'+ damageType +'_'+ element);
        }

        if (this.damageBonuses.length) {
            result = result.concat(this.damageBonuses);
        }

        return result;
    }

    getRotationAfterItems(item, opts) {
        if (this.rotationAfterItems)
            if (typeof this.rotationAfterItems == "function")
                return this.rotationAfterItems(item, opts);
            else
                return this.rotationAfterItems;
        else
            return [];
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getDefaultStatsCritRate(data) {
        let result = ['crit_rate_base', 'crit_rate', 'crit_rate_enemy', 'crit_rate_'+ this.getElement(data)];
        let damageType = this.getDamageType(data);

        if (damageType) {
            result.push('crit_rate_'+ damageType);
            result.push('crit_rate_'+ this.getElement(data) +'_'+  this.damageType);
        }

        if (this.critRateBonuses.length) {
            result = result.concat(this.critRateBonuses);
        }

        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritRate(data) {
        return this.getDefaultStatsCritRate(data);
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getDefaultStatsCritDamage(data) {
        let result = ['crit_dmg_base', 'crit_dmg', 'crit_dmg_'+ this.getElement(data)];
        let damageType = this.getDamageType(data);

        if (damageType) {
            result.push('crit_dmg_'+ damageType);
            result.push('crit_dmg_'+ this.getElement(data) + '_'+ this.damageType);
        }

        if (this.critDamageBonuses.length) {
            result = result.concat(this.critDamageBonuses);
        }

        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritDamage(data) {
        return this.getDefaultStatsCritDamage(data);
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsDefIgnore(data) {
        let result = ['enemy_def_ignore'];

        let damageType = this.getDamageType(data);
        if (damageType && damageType != 'none') {
            result.push('enemy_def_ignore_'+ damageType);
        }

        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {CBlock}
     */
    getResistanceMultiplier(data) {
        let statName = 'enemy_res_' + this.getElement(data);

        return new CResistanceValue([
            new CConst({
                value: data.settings.get(statName) / 100,
                comment: 'base_res',
                percent: true,
            }),
            makeStatItem(statName, data.stats),
        ], {percent: true});
    }

    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getDefenceLevelMultiplier(data) {
        let source = new CSum([
            new CConst({value: 100}),
            new CConst({value: data.settings.char_level, comment: 'char_level'}),
        ]);
        let target = new CSum([
            new CConst({value: 100}),
            new CConst({value: data.settings.enemy_level, comment: 'enemy_level'}),
        ]);

        return new CDivide([
            source,
            new CSum([
                new CMulti([
                    target,
                    new CSubtract([
                        new CConst({value: 1}),
                        makeStatItem('enemy_def_reduce', data.stats),
                    ]),
                    new CSubtract([
                        new CConst({value: 1}),
                        new CSum([
                            ...this.getStatsDefIgnore(data).map((stat) => { return makeStatItem(stat, data.stats) })
                        ]),
                    ]),
                ]),
                source,
            ]),
        ], {percent: true});
    }

    /**
     * @param {BuildData} data
     * @returns {Array}
     */
    getReactionMultipliers(data) {
        let items = [];

        if (data.settings.reaction && this.canReact()) {
            let element = this.getElement(data);
            let className = REACTION_MULTI[data.settings.reaction +'_'+ element];

            if (className) {
                let multi = new className({});
                let amp = multi.getAmplyfyingMultiplier();
                if (amp) {
                    items.push(amp);
                }

                items.push(
                    new CMultiplierReaction([
                        multi.getMasteryMultiplier(data),
                        multi.getReactionBonuses(data),
                    ], {isReacted: true}),
                );
            }
        }

        return items;
    }

    /**
     * @param {BuildData} data
     * @returns {string}
     */
    getElement(data) {
        let element = super.getElement(data);

        if (this.allowInfusion && element == 'phys') {
            element = this.getInfusionElement(data);
        }

        return element;
    }

    /**
     * @param {BuildData} data
     * @returns {string}
     */
    getInfusionElement(data) {
        if (data.settings.attack_infusion) {
            return data.settings.attack_infusion;
        } else {
            let priority = data.settings.attack_infusion_priority;
            if (priority && data.settings['attack_infusion_' + priority]) {
                return priority;
            }

            if (data.settings.attack_infusion_hydro) {
                return 'hydro';
            } else if (data.settings.attack_infusion_pyro) {
                return 'pyro';
            } else if (data.settings.attack_infusion_cryo) {
                return 'cryo';
            } else if (data.settings.attack_infusion_electro) {
                return 'electro';
            } else if (data.settings.attack_infusion_anemo) {
                return 'anemo';
            } else if (data.settings.attack_infusion_geo) {
                return 'geo';
            }
        }

        return 'phys';
    }

    /**
     * @param {BuildData} data
     * @returns {Array}
     */
    getCustomMultipliers(data) {
        return [];
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<FeatureMultiplier>}
     */
    getBaseMultiplier(data) {
        return this.getMultipliers(data);
    }

    /**
     * @param {BuildData} data
     * @returns {Function}
     */
    getTree(data) {
        /* 
base * [mult] * ResistanceMultiplier * {defence} * {{react} * masteryCoef}
base - список показателей навыка + дополнительные множители от талантов и созвездий, для реакции обычно просто RR и уровень
mult - сумма всех увеличений урона (бафы по типу и элементам)
defence - есть если это прямой урон
react - коэф. пара и таяния для атак
masteryCoef - коэф. для реакций в том числе пара и таяния

base => список показателей навыка + дополнительные множители от талантов и созвездий
mult => сумма всех увеличений урона (бафы по типу и элементам)
react => (1 + бонус(пар/таяние)) * (1 + masteryCoef + flatReact)
реакция:
(base * (1 + masteryCoef + flatReact)) * ResistanceMultiplier
masteryCoef => x*MC/(MC + B)
base => RR*level, для лунного заряда так же может применяться коэф. 1/2 и 1/12

нужно добавлять бонус в базу как + (сейчас добавляются все кроме isReactionFlatBonus)
нужно добавлять бонус в mult как +
нужно добавлять бонус в masteryCoef как + (сейчас добавляются все isReactionFlatBonus)
нужна возможность просто добавлять дополнительный множитель в это выражение (не нужно, просто для реакций сделать доп. множитель возвышения)
*/
        let multipliers = this.getBaseMultiplier(data);

        let items = [
            new CBaseDamage(
                multipliers.map((i) => {return i.getTree(data)})
            ),
            ...this.getCustomMultipliers(data),
            new CMultiplierBonus(
                this.getStatsDmgBonus(data).map((stat) => { return makeStatItem(stat, data.stats) })
            ),
            new CMultiplierResistance([this.getResistanceMultiplier(data)]),
            new CMultiplierDefence([this.getDefenceLevelMultiplier(data)], {
                percent: true,
            }),
        ];

        let reactionItems = this.getReactionMultipliers(data);
        if (reactionItems.length) {
            for (let item of reactionItems) {
                items.push(item);
            }
        }

        let dmgOpts = {
            critRate: this.getCritRateBlock(data),
            critDmg: this.getCritDmgBlock(data),
        };

        if (data.settings.weapon_royal_avg_crit_rate) {
            dmgOpts.royalCrit = makeStatItem('royal_crit_rate', data.stats);
        }

        return new CDamage(items, dmgOpts);
    }

    /**
     * @returns {boolean}
     */
    canReact() {
        return !this.cannotReact;
    }
}
