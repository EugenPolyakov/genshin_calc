// This file is auto generated
import { StatTable } from "../../classes/StatTable";
import { StatTableAscensionScale } from "../../classes/StatTable/Ascension/Scale";
import { weaponStatScales } from "./WeaponScale";

const enumAscensionTables = {
	n1: new StatTable('', [19.5, 38.900001525878906, 58.400001525878906, 77.80000305175781, 97.30000305175781, 116.69999694824219]),
	n2: new StatTable('', [25.899999618530273, 51.900001525878906, 77.80000305175781, 103.69999694824219, 129.6999969482422, 155.60000610351562]),
	n3: new StatTable('', [31.100000381469727, 62.20000076293945, 93.4000015258789, 124.5, 155.60000610351562, 186.6999969482422]),
};

const enumStatTables = {
	atk39: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 38.74129867553711,
		ascension: enumAscensionTables.n1,
		scale: weaponStatScales.atk_1_1,
	}),
	atkp8: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 7.659999847412109,
		scale: weaponStatScales.crt_1_1,
	}),
	cdmg10: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 10.199999809265137,
		scale: weaponStatScales.crt_1_1,
	}),
	atk40: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 39.875099182128906,
		ascension: enumAscensionTables.n1,
		scale: weaponStatScales.atk_1_2,
	}),
	def6: new StatTableAscensionScale({
		stat: 'def_percent',
		base: 6.373299598693848,
		scale: weaponStatScales.crt_1_1,
	}),
	mastery31: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 30.600000381469727,
		scale: weaponStatScales.crt_1_1,
	}),
	atk38: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 37.60749816894531,
		ascension: enumAscensionTables.n1,
		scale: weaponStatScales.atk_1_4,
	}),
	recharge11: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 11.333300590515137,
		scale: weaponStatScales.crt_1_1,
	}),
	atk41: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 41.067100524902344,
		ascension: enumAscensionTables.n2,
		scale: weaponStatScales.atk_2_4,
	}),
	recharge13: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 13.33329963684082,
		scale: weaponStatScales.crt_2_1,
	}),
	atk42: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 42.4010009765625,
		ascension: enumAscensionTables.n2,
		scale: weaponStatScales.atk_2_1,
	}),
	atkp9: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 9,
		scale: weaponStatScales.crt_2_1,
	}),
	atk44: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 43.734901428222656,
		ascension: enumAscensionTables.n2,
		scale: weaponStatScales.atk_2_2,
	}),
	phys8: new StatTableAscensionScale({
		stat: 'dmg_phys_base',
		base: 7.506700038909912,
		scale: weaponStatScales.crt_2_1,
	}),
	mastery36: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 36,
		scale: weaponStatScales.crt_2_1,
	}),
	cdmg8: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 8,
		scale: weaponStatScales.crt_2_1,
	}),
	crit6: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 6,
		scale: weaponStatScales.crt_2_1,
	}),
	atk45: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 45.06869888305664,
		ascension: enumAscensionTables.n2,
		scale: weaponStatScales.atk_2_3,
	}),
	mastery12: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 11.999987602233887,
		scale: weaponStatScales.crt_2_1,
	}),
	atk39_1: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 38.74129867553711,
		ascension: enumAscensionTables.n2,
		scale: weaponStatScales.atk_1_1,
	}),
	recharge10: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 10,
		scale: weaponStatScales.crt_2_1,
	}),
	atkp12: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 12,
		scale: weaponStatScales.crt_2_1,
	}),
	def15: new StatTableAscensionScale({
		stat: 'def_percent',
		base: 15.013299942016602,
		scale: weaponStatScales.crt_2_1,
	}),
	recharge7: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 6.6666998863220215,
		scale: weaponStatScales.crt_2_1,
	}),
	atkp6: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 6,
		scale: weaponStatScales.crt_2_1,
	}),
	hp9: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 9,
		scale: weaponStatScales.crt_2_1,
	}),
	atk48: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 47.5369987487793,
		ascension: enumAscensionTables.n3,
		scale: weaponStatScales.atk_3_2,
	}),
	phys9: new StatTableAscensionScale({
		stat: 'dmg_phys_base',
		base: 9,
		scale: weaponStatScales.crt_3_1,
	}),
	atk46: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 45.9364013671875,
		ascension: enumAscensionTables.n3,
		scale: weaponStatScales.atk_3_1,
	}),
	recharge12: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 12,
		scale: weaponStatScales.crt_3_1,
	}),
	mastery43: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 43.20000076293945,
		scale: weaponStatScales.crt_3_1,
	}),
	atkp11: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 10.800000190734863,
		scale: weaponStatScales.crt_3_1,
	}),
	atk44_2: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 44.33580017089844,
		ascension: enumAscensionTables.n3,
		scale: weaponStatScales.atk_3_4,
	}),
	crit10: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 9.600000381469727,
		scale: weaponStatScales.crt_3_1,
	}),
	cdmg10_3: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 9.600000381469727,
		scale: weaponStatScales.crt_3_1,
	}),
	crit7: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 7.199999809265137,
		scale: weaponStatScales.crt_3_1,
	}),
	hp14: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 14.399999618530273,
		scale: weaponStatScales.crt_3_1,
	}),
	cdmg19: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 19.200000762939453,
		scale: weaponStatScales.crt_3_1,
	}),
	def18: new StatTableAscensionScale({
		stat: 'def_percent',
		base: 18,
		scale: weaponStatScales.crt_3_1,
	}),
	crit5: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 4.800000190734863,
		scale: weaponStatScales.crt_3_1,
	}),
	hp8: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 7.659999847412109,
		scale: weaponStatScales.crt_1_1,
	}),
	mastery41: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 40.79999923706055,
		scale: weaponStatScales.crt_1_1,
	}),
	def10: new StatTableAscensionScale({
		stat: 'def_percent',
		base: 9.5600004196167,
		scale: weaponStatScales.crt_1_1,
	}),
	phys10: new StatTableAscensionScale({
		stat: 'dmg_phys_base',
		base: 9.5600004196167,
		scale: weaponStatScales.crt_1_1,
	}),
	def11: new StatTableAscensionScale({
		stat: 'def_percent',
		base: 11.260000228881836,
		scale: weaponStatScales.crt_2_1,
	}),
	cdmg12: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 12,
		scale: weaponStatScales.crt_2_1,
	}),
	mastery24: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 24,
		scale: weaponStatScales.crt_2_1,
	}),
	crit4: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 4,
		scale: weaponStatScales.crt_2_1,
	}),
	hp12: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 12,
		scale: weaponStatScales.crt_2_1,
	}),
	recharge8: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 8,
		scale: weaponStatScales.crt_3_1,
	}),
	atk49: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 49.137699127197266,
		ascension: enumAscensionTables.n3,
		scale: weaponStatScales.atk_3_3,
	}),
	phys4: new StatTableAscensionScale({
		stat: 'dmg_phys_base',
		base: 4.5,
		scale: weaponStatScales.crt_3_1,
	}),
	crit2: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 2.4000000953674316,
		scale: weaponStatScales.crt_3_1,
	}),
	crit5_4: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 5.099999904632568,
		scale: weaponStatScales.crt_1_1,
	}),
	atkp5: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 5.1066999435424805,
		scale: weaponStatScales.crt_1_1,
	}),
	hp10: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 10.213299751281738,
		scale: weaponStatScales.crt_1_1,
	}),
	mastery48: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 48,
		scale: weaponStatScales.crt_2_1,
	}),
	crit8: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 8,
		scale: weaponStatScales.crt_2_1,
	}),
	phys15: new StatTableAscensionScale({
		stat: 'dmg_phys_base',
		base: 15.013299942016602,
		scale: weaponStatScales.crt_2_1,
	}),
	atkp3: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 3,
		scale: weaponStatScales.crt_2_1,
	}),
	hp6: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 6,
		scale: weaponStatScales.crt_2_1,
	}),
	crit2_5: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 2,
		scale: weaponStatScales.crt_2_1,
	}),
	cdmg14: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 14.399999618530273,
		scale: weaponStatScales.crt_3_1,
	}),
	atkp4: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 3.5999999046325684,
		scale: weaponStatScales.crt_3_1,
	}),
	recharge8_6: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 8.5,
		scale: weaponStatScales.crt_1_1,
	}),
	mastery20: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 20.399999618530273,
		scale: weaponStatScales.crt_1_1,
	}),
	crit3: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 3.4000000953674316,
		scale: weaponStatScales.crt_1_1,
	}),
	atkp7: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 7.199999809265137,
		scale: weaponStatScales.crt_3_1,
	}),
	hp11: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 10.800000190734863,
		scale: weaponStatScales.crt_3_1,
	}),
	mastery58: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 57.599998474121094,
		scale: weaponStatScales.crt_3_1,
	}),
	crit7_7: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 6.800000190734863,
		scale: weaponStatScales.crt_1_1,
	}),
	cdmg7: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 6.800000190734863,
		scale: weaponStatScales.crt_1_1,
	}),
	phys11: new StatTableAscensionScale({
		stat: 'dmg_phys_base',
		base: 11.260000228881836,
		scale: weaponStatScales.crt_2_1,
	}),
};

export const weaponStatTables = {
	CoolSteel: [
		enumStatTables.atk39,
		enumStatTables.atkp8,
	],
	HarbingerofDawn: [
		enumStatTables.atk39,
		enumStatTables.cdmg10,
	],
	TravelersHandySword: [
		enumStatTables.atk40,
		enumStatTables.def6,
	],
	DarkIronSword: [
		enumStatTables.atk39,
		enumStatTables.mastery31,
	],
	FilletBlade: [
		enumStatTables.atk39,
		enumStatTables.atkp8,
	],
	SkyriderSword: [
		enumStatTables.atk38,
		enumStatTables.recharge11,
	],
	FavoniusSword: [
		enumStatTables.atk41,
		enumStatTables.recharge13,
	],
	Flute: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	SacrificialSword: [
		enumStatTables.atk41,
		enumStatTables.recharge13,
	],
	RoyalLongsword: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	LionsRoar: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	PrototypeRancour: [
		enumStatTables.atk44,
		enumStatTables.phys8,
	],
	IronSting: [
		enumStatTables.atk42,
		enumStatTables.mastery36,
	],
	BlackcliffLongsword: [
		enumStatTables.atk44,
		enumStatTables.cdmg8,
	],
	BlackSword: [
		enumStatTables.atk42,
		enumStatTables.crit6,
	],
	AlleyFlash: [
		enumStatTables.atk45,
		enumStatTables.mastery12,
	],
	SwordofDescension: [
		enumStatTables.atk39_1,
		enumStatTables.atkp8,
	],
	FesteringDesire: [
		enumStatTables.atk42,
		enumStatTables.recharge10,
	],
	AmenomaKageuchi: [
		enumStatTables.atk41,
		enumStatTables.atkp12,
	],
	CinnabarSpindle: [
		enumStatTables.atk41,
		enumStatTables.def15,
	],
	KagotsurubeIsshin: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	SapwoodBlade: [
		enumStatTables.atk44,
		enumStatTables.recharge7,
	],
	XiphosMoonlight: [
		enumStatTables.atk42,
		enumStatTables.mastery36,
	],
	ToukabouShigure: [
		enumStatTables.atk42,
		enumStatTables.mastery36,
	],
	WolfFang: [
		enumStatTables.atk42,
		enumStatTables.crit6,
	],
	FinaleOfTheDeep: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	FleuveCendreFerryman: [
		enumStatTables.atk42,
		enumStatTables.recharge10,
	],
	TheDockhandsAssistant: [
		enumStatTables.atk42,
		enumStatTables.hp9,
	],
	SwordOfNarzissenkreuz: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	SturdyBone: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	FlamebreathFlute: [
		enumStatTables.atk41,
		enumStatTables.def15,
	],
	CalamityOfEshu: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	serenitys_call: [
		enumStatTables.atk41,
		enumStatTables.recharge13,
	],
	moonweavers_dawn: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	AquilaFavonia: [
		enumStatTables.atk48,
		enumStatTables.phys9,
	],
	SkywardBlade: [
		enumStatTables.atk46,
		enumStatTables.recharge12,
	],
	FreedomSworn: [
		enumStatTables.atk46,
		enumStatTables.mastery43,
	],
	SummitShaper: [
		enumStatTables.atk46,
		enumStatTables.atkp11,
	],
	PrimordialJadeCutter: [
		enumStatTables.atk44_2,
		enumStatTables.crit10,
	],
	MistsplitterReforged: [
		enumStatTables.atk48,
		enumStatTables.cdmg10_3,
	],
	HaranGeppakuFutsu: [
		enumStatTables.atk46,
		enumStatTables.crit7,
	],
	KeyofKhajNisut: [
		enumStatTables.atk44_2,
		enumStatTables.hp14,
	],
	LightofFoliarIncision: [
		enumStatTables.atk44_2,
		enumStatTables.cdmg19,
	],
	SplendorOfStillWaters: [
		enumStatTables.atk44_2,
		enumStatTables.cdmg19,
	],
	UrakuMisugiri: [
		enumStatTables.atk44_2,
		enumStatTables.cdmg19,
	],
	Absolution: [
		enumStatTables.atk48,
		enumStatTables.cdmg10_3,
	],
	PeakPatrolSong: [
		enumStatTables.atk44_2,
		enumStatTables.def18,
	],
	Azurelight: [
		enumStatTables.atk48,
		enumStatTables.crit5,
	],
	athame_artis: [
		enumStatTables.atk46,
		enumStatTables.crit7,
	],
	lightbearing_moonshard: [
		enumStatTables.atk44_2,
		enumStatTables.cdmg19,
	],
	FerrousShadow: [
		enumStatTables.atk39,
		enumStatTables.hp8,
	],
	BloodtaintedGreatsword: [
		enumStatTables.atk38,
		enumStatTables.mastery41,
	],
	WhiteIronGreatsword: [
		enumStatTables.atk39,
		enumStatTables.def10,
	],
	DebateClub: [
		enumStatTables.atk39,
		enumStatTables.atkp8,
	],
	SkyriderGreatsword: [
		enumStatTables.atk39,
		enumStatTables.phys10,
	],
	FavoniusGreatsword: [
		enumStatTables.atk41,
		enumStatTables.recharge13,
	],
	Bell: [
		enumStatTables.atk42,
		enumStatTables.hp9,
	],
	SacrificialGreatsword: [
		enumStatTables.atk44,
		enumStatTables.recharge7,
	],
	RoyalGreatsword: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	Rainslasher: [
		enumStatTables.atk42,
		enumStatTables.mastery36,
	],
	PrototypeArchaic: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	Whiteblind: [
		enumStatTables.atk42,
		enumStatTables.def11,
	],
	BlackcliffSlasher: [
		enumStatTables.atk42,
		enumStatTables.cdmg12,
	],
	SerpentSpine: [
		enumStatTables.atk42,
		enumStatTables.crit6,
	],
	LithicBlade: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	SnowTombedStarsilver: [
		enumStatTables.atk44,
		enumStatTables.phys8,
	],
	LuxuriousSeaLord: [
		enumStatTables.atk41,
		enumStatTables.atkp12,
	],
	KatsuragikiriNagamasa: [
		enumStatTables.atk42,
		enumStatTables.recharge10,
	],
	MakhairaAquamarine: [
		enumStatTables.atk42,
		enumStatTables.mastery36,
	],
	Akuoumaru: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	ForestRegalia: [
		enumStatTables.atk44,
		enumStatTables.recharge7,
	],
	MailedFlower: [
		enumStatTables.atk44,
		enumStatTables.mastery24,
	],
	TalkingStick: [
		enumStatTables.atk44,
		enumStatTables.crit4,
	],
	TidalShadow: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	MegaMagicSword: [
		enumStatTables.atk44,
		enumStatTables.recharge7,
	],
	PortablePowerSaw: [
		enumStatTables.atk41,
		enumStatTables.hp12,
	],
	FruitfulHook: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	Earthshaker: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	FlameForgedInsight: [
		enumStatTables.atk42,
		enumStatTables.mastery36,
	],
	master_key: [
		enumStatTables.atk41,
		enumStatTables.recharge13,
	],
	SkywardPride: [
		enumStatTables.atk48,
		enumStatTables.recharge8,
	],
	WolfsGravestone: [
		enumStatTables.atk46,
		enumStatTables.atkp11,
	],
	SongofBrokenPines: [
		enumStatTables.atk49,
		enumStatTables.phys4,
	],
	Unforged: [
		enumStatTables.atk46,
		enumStatTables.atkp11,
	],
	RedhornStonethresher: [
		enumStatTables.atk44_2,
		enumStatTables.cdmg19,
	],
	BeaconOfTheReedSea: [
		enumStatTables.atk46,
		enumStatTables.crit7,
	],
	Verdict: [
		enumStatTables.atk48,
		enumStatTables.crit5,
	],
	MountainKingsFang: [
		enumStatTables.atk49,
		enumStatTables.crit2,
	],
	AThousandBlazingSuns: [
		enumStatTables.atk49,
		enumStatTables.crit2,
	],
	gest_of_the_mighty_wolf: [
		enumStatTables.atk46,
		enumStatTables.crit7,
	],
	WhiteTassel: [
		enumStatTables.atk39,
		enumStatTables.crit5_4,
	],
	Halberd: [
		enumStatTables.atk40,
		enumStatTables.atkp5,
	],
	BlackTassel: [
		enumStatTables.atk38,
		enumStatTables.hp10,
	],
	DragonsBane: [
		enumStatTables.atk41,
		enumStatTables.mastery48,
	],
	PrototypeStarglitter: [
		enumStatTables.atk42,
		enumStatTables.recharge10,
	],
	CrescentPike: [
		enumStatTables.atk44,
		enumStatTables.phys8,
	],
	BlackcliffPole: [
		enumStatTables.atk42,
		enumStatTables.cdmg12,
	],
	Deathmatch: [
		enumStatTables.atk41,
		enumStatTables.crit8,
	],
	LithicSpear: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	FavoniusLance: [
		enumStatTables.atk44,
		enumStatTables.recharge7,
	],
	RoyalSpear: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	DragonspineSpear: [
		enumStatTables.atk41,
		enumStatTables.phys15,
	],
	KitainCrossSpear: [
		enumStatTables.atk44,
		enumStatTables.mastery24,
	],
	Catch: [
		enumStatTables.atk42,
		enumStatTables.recharge10,
	],
	WavebreakersFin: [
		enumStatTables.atk45,
		enumStatTables.atkp3,
	],
	Moonpiercer: [
		enumStatTables.atk44,
		enumStatTables.mastery24,
	],
	MissiveWindspear: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	BalladOfTheFjords: [
		enumStatTables.atk42,
		enumStatTables.crit6,
	],
	RightfulReward: [
		enumStatTables.atk44,
		enumStatTables.hp6,
	],
	DialoguesOfTheDesertSages: [
		enumStatTables.atk42,
		enumStatTables.hp9,
	],
	ProspectorsDrill: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	MountainBracingBolt: [
		enumStatTables.atk44,
		enumStatTables.recharge7,
	],
	RainbowsTrail: [
		enumStatTables.atk42,
		enumStatTables.def11,
	],
	BriefPavilionChatter: [
		enumStatTables.atk44,
		enumStatTables.recharge7,
	],
	prospectors_shovel: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	sacrificers_staff: [
		enumStatTables.atk45,
		enumStatTables.crit2_5,
	],
	StaffofHoma: [
		enumStatTables.atk46,
		enumStatTables.cdmg14,
	],
	SkywardSpine: [
		enumStatTables.atk48,
		enumStatTables.recharge8,
	],
	VortexVanquisher: [
		enumStatTables.atk46,
		enumStatTables.atkp11,
	],
	PrimordialJadeWingedSpear: [
		enumStatTables.atk48,
		enumStatTables.crit5,
	],
	CalamityQueller: [
		enumStatTables.atk49,
		enumStatTables.atkp4,
	],
	GrasscuttersLight: [
		enumStatTables.atk46,
		enumStatTables.recharge12,
	],
	StaffOfScarletSands: [
		enumStatTables.atk44_2,
		enumStatTables.crit10,
	],
	CrimsonMoonsSemblance: [
		enumStatTables.atk48,
		enumStatTables.crit5,
	],
	LumidouceElegy: [
		enumStatTables.atk46,
		enumStatTables.crit7,
	],
	SymphonistofScents: [
		enumStatTables.atk46,
		enumStatTables.cdmg14,
	],
	FracturedHalo: [
		enumStatTables.atk46,
		enumStatTables.cdmg14,
	],
	bloodsoaked_ruins: [
		enumStatTables.atk48,
		enumStatTables.crit5,
	],
	MagicGuide: [
		enumStatTables.atk38,
		enumStatTables.mastery41,
	],
	ThrillingTalesofDragonSlayers: [
		enumStatTables.atk39,
		enumStatTables.hp8,
	],
	OtherworldlyStory: [
		enumStatTables.atk39,
		enumStatTables.recharge8_6,
	],
	EmeraldOrb: [
		enumStatTables.atk40,
		enumStatTables.mastery20,
	],
	TwinNephrite: [
		enumStatTables.atk40,
		enumStatTables.crit3,
	],
	FavoniusCodex: [
		enumStatTables.atk42,
		enumStatTables.recharge10,
	],
	Widsith: [
		enumStatTables.atk42,
		enumStatTables.cdmg12,
	],
	SacrificialFragments: [
		enumStatTables.atk41,
		enumStatTables.mastery48,
	],
	RoyalGrimoire: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	SolarPearl: [
		enumStatTables.atk42,
		enumStatTables.crit6,
	],
	PrototypeAmber: [
		enumStatTables.atk42,
		enumStatTables.hp9,
	],
	MappaMare: [
		enumStatTables.atk44,
		enumStatTables.mastery24,
	],
	BlackcliffAgate: [
		enumStatTables.atk42,
		enumStatTables.cdmg12,
	],
	EyeofPerception: [
		enumStatTables.atk41,
		enumStatTables.atkp12,
	],
	WineandSong: [
		enumStatTables.atk44,
		enumStatTables.recharge7,
	],
	Frostbearer: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	DodocoTales: [
		enumStatTables.atk41,
		enumStatTables.atkp12,
	],
	HakushinRing: [
		enumStatTables.atk44,
		enumStatTables.recharge7,
	],
	OathswornEye: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	WanderingEvenstar: [
		enumStatTables.atk42,
		enumStatTables.mastery36,
	],
	FruitOfFulfillment: [
		enumStatTables.atk42,
		enumStatTables.recharge10,
	],
	SacrificialJade: [
		enumStatTables.atk41,
		enumStatTables.crit8,
	],
	FlowingPurity: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	BalladoftheBoundlessBlue: [
		enumStatTables.atk44,
		enumStatTables.recharge7,
	],
	AshGravenDrinkingHorn: [
		enumStatTables.atk42,
		enumStatTables.hp9,
	],
	WaveridingWhirl: [
		enumStatTables.atk41,
		enumStatTables.recharge13,
	],
	RingOfCeiba: [
		enumStatTables.atk42,
		enumStatTables.hp9,
	],
	etherlight_spindlelute: [
		enumStatTables.atk42,
		enumStatTables.recharge10,
	],
	blackmarrow_lantern: [
		enumStatTables.atk41,
		enumStatTables.mastery48,
	],
	dawning_frost: [
		enumStatTables.atk42,
		enumStatTables.cdmg12,
	],
	SkywardAtlas: [
		enumStatTables.atk48,
		enumStatTables.atkp7,
	],
	LostPrayer: [
		enumStatTables.atk46,
		enumStatTables.crit7,
	],
	MemoryofDust: [
		enumStatTables.atk46,
		enumStatTables.atkp11,
	],
	JadefallsSplendor: [
		enumStatTables.atk46,
		enumStatTables.hp11,
	],
	EverlastingMoonglow: [
		enumStatTables.atk46,
		enumStatTables.hp11,
	],
	KagurasVerity: [
		enumStatTables.atk46,
		enumStatTables.cdmg14,
	],
	ThousandFloatingDreams: [
		enumStatTables.atk44_2,
		enumStatTables.mastery58,
	],
	TulaytullahsRemembrance: [
		enumStatTables.atk48,
		enumStatTables.cdmg10_3,
	],
	CashflowSupervision: [
		enumStatTables.atk48,
		enumStatTables.crit5,
	],
	TomeoftheEternalFlow: [
		enumStatTables.atk44_2,
		enumStatTables.cdmg19,
	],
	CranesEchoingCall: [
		enumStatTables.atk49,
		enumStatTables.atkp4,
	],
	SurfingTime: [
		enumStatTables.atk44_2,
		enumStatTables.cdmg19,
	],
	StarcallersWatch: [
		enumStatTables.atk44_2,
		enumStatTables.mastery58,
	],
	MorningHibernation: [
		enumStatTables.atk44_2,
		enumStatTables.mastery58,
	],
	VividNotions: [
		enumStatTables.atk48,
		enumStatTables.cdmg10_3,
	],
	nightweavers_looking_glass: [
		enumStatTables.atk44_2,
		enumStatTables.mastery58,
	],
	reliquary_of_truth: [
		enumStatTables.atk44_2,
		enumStatTables.cdmg19,
	],
	nocturnes_curtain_call: [
		enumStatTables.atk44_2,
		enumStatTables.cdmg19,
	],
	angelos_heptades: [
		enumStatTables.atk49,
		enumStatTables.atkp4,
	],
	RavenBow: [
		enumStatTables.atk40,
		enumStatTables.mastery20,
	],
	SharpshootersOath: [
		enumStatTables.atk39,
		enumStatTables.cdmg10,
	],
	RecurveBow: [
		enumStatTables.atk38,
		enumStatTables.hp10,
	],
	Slingshot: [
		enumStatTables.atk38,
		enumStatTables.crit7_7,
	],
	Messenger: [
		enumStatTables.atk40,
		enumStatTables.cdmg7,
	],
	FavoniusWarbow: [
		enumStatTables.atk41,
		enumStatTables.recharge13,
	],
	Stringless: [
		enumStatTables.atk42,
		enumStatTables.mastery36,
	],
	SacrificialBow: [
		enumStatTables.atk44,
		enumStatTables.recharge7,
	],
	RoyalBow: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	Rust: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	PrototypeCrescent: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	CompoundBow: [
		enumStatTables.atk41,
		enumStatTables.phys15,
	],
	BlackcliffWarbow: [
		enumStatTables.atk44,
		enumStatTables.cdmg8,
	],
	ViridescentHunt: [
		enumStatTables.atk42,
		enumStatTables.crit6,
	],
	AlleyHunter: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	FadingTwilight: [
		enumStatTables.atk44,
		enumStatTables.recharge7,
	],
	MitternachtsWaltz: [
		enumStatTables.atk42,
		enumStatTables.phys11,
	],
	WindblumeOde: [
		enumStatTables.atk42,
		enumStatTables.mastery36,
	],
	Hamayumi: [
		enumStatTables.atk41,
		enumStatTables.atkp12,
	],
	Predator: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	MouunsMoon: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	KingsSquire: [
		enumStatTables.atk41,
		enumStatTables.atkp12,
	],
	EndOfTheLine: [
		enumStatTables.atk42,
		enumStatTables.recharge10,
	],
	IbisPiercer: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	ScionOfTheBlazingSun: [
		enumStatTables.atk44,
		enumStatTables.crit4,
	],
	SongOfStillness: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	Cloudforged: [
		enumStatTables.atk42,
		enumStatTables.mastery36,
	],
	RangeGauge: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	FlowerWreathedFeathers: [
		enumStatTables.atk42,
		enumStatTables.atkp9,
	],
	ShatteredChains: [
		enumStatTables.atk44,
		enumStatTables.atkp6,
	],
	SequenceofSolitude: [
		enumStatTables.atk42,
		enumStatTables.hp9,
	],
	snare_hook: [
		enumStatTables.atk41,
		enumStatTables.recharge13,
	],
	rainbow_serpents_rain_bow: [
		enumStatTables.atk42,
		enumStatTables.recharge10,
	],
	SkywardHarp: [
		enumStatTables.atk48,
		enumStatTables.crit5,
	],
	AmosBow: [
		enumStatTables.atk46,
		enumStatTables.atkp11,
	],
	ElegyfortheEnd: [
		enumStatTables.atk46,
		enumStatTables.recharge12,
	],
	PolarStar: [
		enumStatTables.atk46,
		enumStatTables.crit7,
	],
	AquaSimulacra: [
		enumStatTables.atk44_2,
		enumStatTables.cdmg19,
	],
	ThunderingPulse: [
		enumStatTables.atk46,
		enumStatTables.cdmg14,
	],
	HuntersPath: [
		enumStatTables.atk44_2,
		enumStatTables.crit10,
	],
	TheFirstGreatMagic: [
		enumStatTables.atk46,
		enumStatTables.cdmg14,
	],
	SilvershowerHeartstrings: [
		enumStatTables.atk44_2,
		enumStatTables.hp14,
	],
	AstralVulturesCrimsonPlumage: [
		enumStatTables.atk46,
		enumStatTables.cdmg14,
	],
	the_daybreak_chronicles: [
		enumStatTables.atk48,
		enumStatTables.cdmg10_3,
	],
	golden_frostbound_oath: [
		enumStatTables.atk44_2,
		enumStatTables.cdmg19,
	],
};
export const weaponDataTable = {
	CoolSteel: {
		rarity: 3,
		weapon: "sword",
		gameId: 11301,
		bane_of_water_and_ice: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	HarbingerofDawn: {
		rarity: 3,
		weapon: "sword",
		gameId: 11302,
		vigorous: {
			param1: [0.14, 0.175, 0.21, 0.245, 0.28],
		},
	},
	TravelersHandySword: {
		rarity: 3,
		weapon: "sword",
		gameId: 11303,
		journey: {
			param1: [0.01, 0.0125, 0.015, 0.0175, 0.02],
			param2: [1],
		},
	},
	DarkIronSword: {
		rarity: 3,
		weapon: "sword",
		gameId: 11304,
		overloaded: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [12],
		},
	},
	FilletBlade: {
		rarity: 3,
		weapon: "sword",
		gameId: 11305,
		gash: {
			param1: [0.5],
			param2: [2.4, 2.8, 3.2, 3.6, 4],
			param3: [15, 14, 13, 12, 11],
		},
	},
	SkyriderSword: {
		rarity: 3,
		weapon: "sword",
		gameId: 11306,
		determination: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [15],
		},
	},
	FavoniusSword: {
		rarity: 4,
		weapon: "sword",
		gameId: 11401,
		windfall: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [12, 10.5, 9, 7.5, 6],
		},
	},
	Flute: {
		rarity: 4,
		weapon: "sword",
		gameId: 11402,
		chord: {
			param1: [1],
			param2: [1, 1.25, 1.5, 1.75, 2],
		},
	},
	SacrificialSword: {
		rarity: 4,
		weapon: "sword",
		gameId: 11403,
		composed: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [30, 26, 22, 19, 16],
		},
	},
	RoyalLongsword: {
		rarity: 4,
		weapon: "sword",
		gameId: 11404,
		focus: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	LionsRoar: {
		rarity: 4,
		weapon: "sword",
		gameId: 11405,
		lionsroar: {
			param1: [0.2, 0.24, 0.28, 0.32, 0.36],
		},
	},
	PrototypeRancour: {
		rarity: 4,
		weapon: "sword",
		gameId: 11406,
		smashed_stone: {
			param1: [0.04, 0.05, 0.06, 0.07, 0.08],
		},
	},
	IronSting: {
		rarity: 4,
		weapon: "sword",
		gameId: 11407,
		infusion_stinger: {
			param1: [0.06, 0.075, 0.09, 0.105, 0.12],
			param2: [1],
			param3: [6],
		},
	},
	BlackcliffLongsword: {
		rarity: 4,
		weapon: "sword",
		gameId: 11408,
		blackclifflongsword: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [30],
		},
	},
	BlackSword: {
		rarity: 4,
		weapon: "sword",
		gameId: 11409,
		justice: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.6, 0.7, 0.8, 0.9, 1],
			param3: [5],
			param4: [1],
		},
	},
	AlleyFlash: {
		rarity: 4,
		weapon: "sword",
		gameId: 11410,
		itinerant_hero: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [5],
		},
	},
	SwordofDescension: {
		rarity: 4,
		weapon: "sword",
		gameId: 11412,
		descension: {
			param1: [0.5],
			param2: [2],
			param3: [10],
			param4: [66],
		},
	},
	FesteringDesire: {
		rarity: 4,
		weapon: "sword",
		gameId: 11413,
		undying_admiration: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [0.06, 0.075, 0.09, 0.105, 0.12],
		},
	},
	AmenomaKageuchi: {
		rarity: 4,
		weapon: "sword",
		gameId: 11414,
		iwakura_succession: {
			param1: [30],
			param2: [3],
			param3: [5],
			param4: [6, 7.5, 9, 10.5, 12],
		},
	},
	CinnabarSpindle: {
		rarity: 4,
		weapon: "sword",
		gameId: 11415,
		spotless_heart: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [4000, 5000, 6000, 7000, 8000],
			param3: [1.5],
			param4: [0.1],
		},
	},
	KagotsurubeIsshin: {
		rarity: 4,
		weapon: "sword",
		gameId: 11416,
		isshin_art_clarity: {
			param1: [1.8],
			param2: [0.15],
			param3: [8],
			param4: [8],
		},
	},
	SapwoodBlade: {
		rarity: 4,
		weapon: "sword",
		gameId: 11417,
		forest_sanctuary: {
			param1: [60, 75, 90, 105, 120],
			param2: [12],
			param3: [20],
			param4: [10],
		},
	},
	XiphosMoonlight: {
		rarity: 4,
		weapon: "sword",
		gameId: 11418,
		jinnis_whisper: {
			param1: [10],
			param2: [0.036, 0.045, 0.054, 0.063, 0.072],
			param3: [12],
			param4: [0.3],
		},
	},
	ToukabouShigure: {
		rarity: 4,
		weapon: "sword",
		gameId: 11422,
		kaidan_rainfall_earthbinder: {
			param1: [10],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [15],
		},
	},
	WolfFang: {
		rarity: 4,
		weapon: "sword",
		gameId: 11424,
		northwind_wolf: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [10],
			param3: [4],
			param4: [0.02, 0.025, 0.03, 0.035, 0.04],
			param5: [10],
			param6: [4],
			param7: [0.02, 0.025, 0.03, 0.035, 0.04],
			param8: [0.1],
		},
	},
	FinaleOfTheDeep: {
		rarity: 4,
		weapon: "sword",
		gameId: 11425,
		an_end_sublime: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [15],
			param3: [0.25],
			param4: [0.024, 0.03, 0.036, 0.042, 0.048],
			param5: [150, 187.5, 225, 262.5, 300],
			param6: [15],
			param7: [10],
		},
	},
	FleuveCendreFerryman: {
		rarity: 4,
		weapon: "sword",
		gameId: 11426,
		ironbone: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [5],
		},
	},
	TheDockhandsAssistant: {
		rarity: 4,
		weapon: "sword",
		gameId: 11427,
		sea_shanty: {
			param1: [30],
			param2: [10],
			param3: [15],
			param4: [2, 2.5, 3, 3.5, 4],
			param5: [40, 50, 60, 70, 80],
		},
	},
	SwordOfNarzissenkreuz: {
		rarity: 4,
		weapon: "sword",
		gameId: 11428,
		heros_blade: {
			param1: [1.6, 2, 2.4, 2.8, 3.2],
			param2: [12],
		},
	},
	SturdyBone: {
		rarity: 4,
		weapon: "sword",
		gameId: 11430,
		trappers_pride: {
			param1: [0.15],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [18],
			param4: [7],
		},
	},
	FlamebreathFlute: {
		rarity: 4,
		weapon: "sword",
		gameId: 11431,
		smoke_and_mirror_mystery: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [15],
		},
	},
	CalamityOfEshu: {
		rarity: 4,
		weapon: "sword",
		gameId: 11432,
		diffusing_boundary: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	serenitys_call: {
		rarity: 4,
		weapon: "sword",
		gameId: 11433,
		serenitys_call: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [12],
			param3: [0.16, 0.2, 0.24, 0.28, 0.32],
		},
	},
	moonweavers_dawn: {
		rarity: 4,
		weapon: "sword",
		gameId: 11434,
		moonweavers_dawn: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [0.28, 0.35, 0.42, 0.49, 0.56],
		},
	},
	AquilaFavonia: {
		rarity: 5,
		weapon: "sword",
		gameId: 11501,
		falcons_defiance: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [1, 1.15, 1.3, 1.45, 1.6],
			param3: [2, 2.3, 2.6, 2.9, 3.2],
			param4: [15],
			atk_percent: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	SkywardBlade: {
		rarity: 5,
		weapon: "sword",
		gameId: 11502,
		sky_piercing_fang: {
			param1: [0.04, 0.05, 0.06, 0.07, 0.08],
			param2: [0.1],
			param3: [0.1],
			param4: [0.2, 0.25, 0.3, 0.35, 0.4],
			param5: [12],
			crit_rate_base: [4.0, 5.0, 6.0, 7.0, 8.0],
		},
	},
	FreedomSworn: {
		rarity: 5,
		weapon: "sword",
		gameId: 11503,
		revolutionary_chorale: {
			param1: [0.1, 0.125, 0.15, 0.175, 0.2],
			param2: [0.5],
			param3: [12],
			param4: [0.16, 0.2, 0.24, 0.28, 0.32],
			param5: [0.2, 0.25, 0.3, 0.35, 0.4],
			param6: [20],
			dmg_all: [10.0, 12.5, 15.000000953674316, 17.5, 20.0],
		},
	},
	SummitShaper: {
		rarity: 5,
		weapon: "sword",
		gameId: 11504,
		golden_majesty: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.04, 0.05, 0.06, 0.07, 0.08],
			param3: [8],
			shield: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	PrimordialJadeCutter: {
		rarity: 5,
		weapon: "sword",
		gameId: 11505,
		protectors_virtue: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.012, 0.015, 0.018, 0.021, 0.024],
			hp_percent: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	MistsplitterReforged: {
		rarity: 5,
		weapon: "sword",
		gameId: 11509,
		mistsplitters_edge: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.08, 0.1, 0.12, 0.14, 0.16],
			param3: [0.16, 0.2, 0.24, 0.28, 0.32],
			param4: [0.28, 0.35, 0.42, 0.49, 0.56],
			param5: [5],
			param6: [10],
		},
	},
	HaranGeppakuFutsu: {
		rarity: 5,
		weapon: "sword",
		gameId: 11510,
		honed_flow: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [2],
			param3: [0.3],
			param4: [0.2, 0.25, 0.3, 0.35, 0.4],
			param5: [8],
		},
	},
	KeyofKhajNisut: {
		rarity: 5,
		weapon: "sword",
		gameId: 11511,
		sunken_song_of_the_sands: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.0012, 0.0015, 0.0018, 0.0021, 0.0024],
			param3: [20],
			param4: [0.3],
			param5: [0.002, 0.0025, 0.003, 0.0035, 0.004],
			param6: [20],
			hp_percent: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	LightofFoliarIncision: {
		rarity: 5,
		weapon: "sword",
		gameId: 11512,
		whitemoon_bristle: {
			param1: [0.04, 0.05, 0.06, 0.07, 0.08],
			param2: [1.2, 1.5, 1.8, 2.1, 2.4],
			param3: [28],
			param4: [12],
			param5: [12],
			crit_rate_base: [4.0, 5.0, 6.0, 7.0, 8.0],
		},
	},
	SplendorOfStillWaters: {
		rarity: 5,
		weapon: "sword",
		gameId: 11513,
		dawn_and_dusk_by_the_lake: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
			param2: [6],
			param3: [0.2],
			param4: [0.14, 0.175, 0.21, 0.245, 0.28],
			param5: [6],
			param6: [0.2],
		},
	},
	UrakuMisugiri: {
		rarity: 5,
		weapon: "sword",
		gameId: 11514,
		brocade_bloom_shrine_sword: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [0.24, 0.3, 0.36, 0.42, 0.48],
			param4: [1],
			param5: [15],
			def_percent: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	Absolution: {
		rarity: 5,
		weapon: "sword",
		gameId: 11515,
		deathly_pact: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [6],
			crit_dmg_base: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	PeakPatrolSong: {
		rarity: 5,
		weapon: "sword",
		gameId: 11516,
		halcyon_years_unending: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
			param2: [6],
			param3: [0.1],
			param4: [0.1, 0.125, 0.15, 0.175, 0.2],
			param5: [0.08, 0.1, 0.12, 0.14, 0.16],
			param6: [15],
			param7: [3200],
		},
	},
	Azurelight: {
		rarity: 5,
		weapon: "sword",
		gameId: 11517,
		whitehills_bestowal: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
			param2: [12],
			param3: [0.24, 0.3, 0.36, 0.42, 0.48],
			param4: [0.4, 0.5, 0.6, 0.7, 0.8],
		},
	},
	athame_artis: {
		rarity: 5,
		weapon: "sword",
		gameId: 11518,
		athame_artis: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [3],
			param3: [0.2, 0.25, 0.3, 0.35, 0.4],
			param4: [0.16, 0.2, 0.24, 0.28, 0.32],
			param5: [0.75],
		},
	},
	lightbearing_moonshard: {
		rarity: 5,
		weapon: "sword",
		gameId: 11519,
		lightbearing_moonshard: {
			param1: [0.64, 0.8, 0.96, 1.12, 1.28],
			param2: [5],
			def_percent: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	FerrousShadow: {
		rarity: 3,
		weapon: "claymore",
		gameId: 12301,
		unbending: {
			param1: [0.7, 0.75, 0.8, 0.85, 0.9],
			param2: [0.3, 0.35, 0.4, 0.45, 0.5],
		},
	},
	BloodtaintedGreatsword: {
		rarity: 3,
		weapon: "claymore",
		gameId: 12302,
		bloodtaintedgreatsword: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	WhiteIronGreatsword: {
		rarity: 3,
		weapon: "claymore",
		gameId: 12303,
		cull_the_weak: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	DebateClub: {
		rarity: 3,
		weapon: "claymore",
		gameId: 12305,
		blunt_conclusion: {
			param1: [0.6, 0.75, 0.9, 1.05, 1.2],
			param2: [15],
			param3: [3],
		},
	},
	SkyriderGreatsword: {
		rarity: 3,
		weapon: "claymore",
		gameId: 12306,
		courage: {
			param1: [0.06, 0.07, 0.08, 0.09, 0.1],
		},
	},
	FavoniusGreatsword: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12401,
		windfall: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [12, 10.5, 9, 7.5, 6],
		},
	},
	Bell: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12402,
		rebellious_guardian: {
			param1: [0.2, 0.23, 0.26, 0.29, 0.32],
			param2: [45],
			param3: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	SacrificialGreatsword: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12403,
		composed: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [30, 26, 22, 19, 16],
		},
	},
	RoyalGreatsword: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12404,
		focus: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	Rainslasher: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12405,
		bane_of_storm_and_tide: {
			param1: [0.2, 0.24, 0.28, 0.32, 0.36],
		},
	},
	PrototypeArchaic: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12406,
		crush: {
			param1: [0.5],
			param2: [2.4, 3, 3.6, 4.2, 4.8],
		},
	},
	Whiteblind: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12407,
		infusion_blade: {
			param1: [0.06, 0.075, 0.09, 0.105, 0.12],
		},
	},
	BlackcliffSlasher: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12408,
		blackcliffslasher: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [30],
		},
	},
	SerpentSpine: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12409,
		wavesplitter: {
			param1: [4],
			param2: [0.06, 0.07, 0.08, 0.09, 0.1],
			param3: [0.03, 0.027, 0.024, 0.022, 0.02],
		},
	},
	LithicBlade: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12410,
		lithic_axiom_unity: {
			param1: [0.07, 0.08, 0.09, 0.1, 0.11],
			param2: [0.03, 0.04, 0.05, 0.06, 0.07],
			param3: [4],
		},
	},
	SnowTombedStarsilver: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12411,
		frost_burial: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [0.8, 0.95, 1.1, 1.25, 1.4],
			param3: [2, 2.4, 2.8, 3.2, 3.6],
			param4: [10],
		},
	},
	LuxuriousSeaLord: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12412,
		oceanic_victory: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [1],
			param3: [1, 1.25, 1.5, 1.75, 2],
			param4: [15],
		},
	},
	KatsuragikiriNagamasa: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12414,
		samurai_conduct: {
			param1: [0.06, 0.075, 0.09, 0.105, 0.12],
			param2: [3],
			param3: [3, 3.5, 4, 4.5, 5],
			param4: [6],
			param5: [10],
		},
	},
	MakhairaAquamarine: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12415,
		desert_pavilion: {
			param1: [10],
			param2: [0.24, 0.3, 0.36, 0.42, 0.48],
			param3: [12],
			param4: [0.3],
		},
	},
	Akuoumaru: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12416,
		watatsumi_wavewalker: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.4, 0.5, 0.6, 0.7, 0.8],
		},
	},
	ForestRegalia: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12417,
		forest_sanctuary: {
			param1: [60, 75, 90, 105, 120],
			param2: [12],
			param3: [20],
			param4: [10],
		},
	},
	MailedFlower: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12418,
		whispers_of_wind_and_flower: {
			param1: [8],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
			param3: [48, 60, 72, 84, 96],
		},
	},
	TalkingStick: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12424,
		the_silver_tongue: {
			param1: [12],
			param2: [12],
			param3: [15],
			param4: [15],
			param5: [0.16, 0.2, 0.24, 0.28, 0.32],
			param6: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	TidalShadow: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12425,
		white_cruising_wave: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
			param2: [8],
		},
	},
	MegaMagicSword: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12426,
		melussistance: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.02, 0.025, 0.03, 0.035, 0.04],
			param3: [0.12, 0.15, 0.18, 0.21, 0.24],
			atk_percent: [12.0, 15.000000953674316, 18.0, 21.0, 24.0],
		},
	},
	PortablePowerSaw: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12427,
		sea_shanty: {
			param1: [30],
			param2: [10],
			param3: [15],
			param4: [2, 2.5, 3, 3.5, 4],
			param5: [40, 50, 60, 70, 80],
		},
	},
	FruitfulHook: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12430,
		the_weight_of_falling_branches: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [10],
		},
	},
	Earthshaker: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12431,
		oath_of_qhapaq_nan: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [8],
		},
	},
	FlameForgedInsight: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12432,
		mind_in_bloom: {
			param1: [12, 15, 18, 21, 24],
			param2: [60, 75, 90, 105, 120],
			param3: [15],
			param4: [15],
		},
	},
	master_key: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12433,
		master_key: {
			param1: [60, 75, 90, 105, 120],
			param2: [12],
			param3: [60, 75, 90, 105, 120],
		},
	},
	SkywardPride: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12501,
		sky_ripping_dragon_spine: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
			param2: [0.8, 1, 1.2, 1.4, 1.6],
			param3: [20],
			param4: [8],
			dmg_all: [8.0, 10.0, 12.0, 14.0, 16.0],
		},
	},
	WolfsGravestone: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12502,
		wolfish_tracker: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.4, 0.5, 0.6, 0.7, 0.8],
			atk_percent: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	SongofBrokenPines: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12503,
		rebels_banner_hymn: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [0.3],
			param3: [12],
			param4: [0.12, 0.15, 0.18, 0.21, 0.24],
			param5: [0.2, 0.25, 0.3, 0.35, 0.4],
			param6: [20],
			atk_percent: [16.0, 20.0, 24.0, 28.0, 32.0],
		},
	},
	Unforged: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12504,
		golden_majesty: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.04, 0.05, 0.06, 0.07, 0.08],
			param3: [8],
			shield: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	RedhornStonethresher: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12510,
		gokadaiou_otogibanashi: {
			param1: [0.28, 0.35, 0.42, 0.49, 0.56],
			param2: [0.4, 0.5, 0.6, 0.7, 0.8],
			param3: [80000],
			def_percent: [28.0, 35.0, 42.0, 49.0, 56.0],
		},
	},
	BeaconOfTheReedSea: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12511,
		desert_watch: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [8],
			param3: [0.2, 0.25, 0.3, 0.35, 0.4],
			param4: [8],
			param5: [0.32, 0.4, 0.48, 0.56, 0.64],
		},
	},
	Verdict: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12512,
		many_oaths_of_dawn_and_dusk: {
			param1: [0.18, 0.225, 0.27, 0.315, 0.36],
			param2: [15],
			param3: [1],
			atk_percent: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	MountainKingsFang: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12513,
		turquoise_hunt: {
			param1: [0.5],
			param2: [2],
			param3: [0.1, 0.125, 0.15, 0.175, 0.2],
			param4: [6],
			param5: [6],
		},
	},
	AThousandBlazingSuns: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12514,
		sunset_reignites_the_dawn: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.28, 0.35, 0.42, 0.49, 0.56],
			param3: [0.75],
			param4: [6],
			param5: [10],
			param6: [2],
			param7: [1],
			param8: [3],
		},
	},
	gest_of_the_mighty_wolf: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12515,
		gest_of_the_mighty_wolf: {
			param1: [0.1],
			param2: [0.075, 0.095, 0.115, 0.135, 0.155],
			param3: [0.075, 0.095, 0.115, 0.135, 0.155],
			param4: [4],
			param5: [4],
			param6: [0.01],
		},
	},
	WhiteTassel: {
		rarity: 3,
		weapon: "polearm",
		gameId: 13301,
		sharp: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
		},
	},
	Halberd: {
		rarity: 3,
		weapon: "polearm",
		gameId: 13302,
		heavy: {
			param1: [1.6, 2, 2.4, 2.8, 3.2],
			param2: [10],
		},
	},
	BlackTassel: {
		rarity: 3,
		weapon: "polearm",
		gameId: 13303,
		bane_of_the_soft: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
		},
	},
	DragonsBane: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13401,
		bane_of_flame_and_water: {
			param1: [0.2, 0.24, 0.28, 0.32, 0.36],
		},
	},
	PrototypeStarglitter: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13402,
		magic_affinity: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	CrescentPike: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13403,
		infusion_needle: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
		},
	},
	BlackcliffPole: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13404,
		press_the_advantage: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [30],
		},
	},
	Deathmatch: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13405,
		gladiator: {
			param1: [2],
			param2: [0.24, 0.3, 0.36, 0.42, 0.48],
			param3: [0.16, 0.2, 0.24, 0.28, 0.32],
			param4: [0.16, 0.2, 0.24, 0.28, 0.32],
		},
	},
	LithicSpear: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13406,
		lithic_axiom_unity: {
			param1: [0.07, 0.08, 0.09, 0.1, 0.11],
			param2: [0.03, 0.04, 0.05, 0.06, 0.07],
			param3: [4],
		},
	},
	FavoniusLance: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13407,
		windfall: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [12, 10.5, 9, 7.5, 6],
		},
	},
	RoyalSpear: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13408,
		focus: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	DragonspineSpear: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13409,
		frost_burial: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [0.8, 0.95, 1.1, 1.25, 1.4],
			param3: [2, 2.4, 2.8, 3.2, 3.6],
			param4: [10],
		},
	},
	KitainCrossSpear: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13414,
		samurai_conduct: {
			param1: [0.06, 0.075, 0.09, 0.105, 0.12],
			param2: [3],
			param3: [3, 3.5, 4, 4.5, 5],
			param4: [6],
			param5: [10],
		},
	},
	Catch: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13415,
		shanty: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [0.06, 0.075, 0.09, 0.105, 0.12],
		},
	},
	WavebreakersFin: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13416,
		watatsumi_wavewalker: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.4, 0.5, 0.6, 0.7, 0.8],
		},
	},
	Moonpiercer: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13417,
		stillwood_moonshadow: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [12],
			param3: [20],
			param4: [10],
		},
	},
	MissiveWindspear: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13419,
		the_wind_unattained: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [48, 60, 72, 84, 96],
			param3: [10],
		},
	},
	BalladOfTheFjords: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13424,
		tales_of_the_tundra: {
			param1: [120, 150, 180, 210, 240],
		},
	},
	RightfulReward: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13425,
		tip_of_the_spear: {
			param1: [8, 10, 12, 14, 16],
			param2: [10],
		},
	},
	DialoguesOfTheDesertSages: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13426,
		principle_of_equilibrium: {
			param1: [8, 10, 12, 14, 16],
			param2: [10],
		},
	},
	ProspectorsDrill: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13427,
		masons_ditty: {
			param1: [30],
			param2: [10],
			param3: [15],
			param4: [0.03, 0.04, 0.05, 0.06, 0.07],
			param5: [0.07, 0.085, 0.1, 0.115, 0.13],
		},
	},
	MountainBracingBolt: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13430,
		hope_beyond_the_peaks: {
			param1: [0.15],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
			param3: [0.12, 0.15, 0.18, 0.21, 0.24],
			param4: [8],
		},
	},
	RainbowsTrail: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13431,
		pact_of_flowing_springs: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [15],
		},
	},
	BriefPavilionChatter: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13432,
		busybodys_running_light: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.1],
			param3: [10],
		},
	},
	prospectors_shovel: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13433,
		prospectors_shovel: {
			param1: [0.48, 0.6, 0.72, 0.84, 0.96],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
			param3: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	sacrificers_staff: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13434,
		sacrificers_staff: {
			param1: [6],
			param2: [0.08, 0.1, 0.12, 0.14, 0.16],
			param3: [0.06, 0.075, 0.09, 0.105, 0.12],
			param4: [3],
		},
	},
	StaffofHoma: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13501,
		reckless_cinnabar: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.008, 0.01, 0.012, 0.014, 0.016],
			param3: [0.01, 0.012, 0.014, 0.016, 0.018],
			hp_percent: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	SkywardSpine: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13502,
		black_wing: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
			param2: [0.12],
			param3: [0.5],
			param4: [0.4, 0.55, 0.7, 0.85, 1],
			param5: [2],
			crit_rate_base: [8.0, 10.0, 12.0, 14.0, 16.0],
		},
	},
	VortexVanquisher: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13504,
		golden_majesty: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.04, 0.05, 0.06, 0.07, 0.08],
			param3: [8],
			shield: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	PrimordialJadeWingedSpear: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13505,
		eagle_spear_of_justice: {
			param1: [0.032, 0.039, 0.046, 0.053, 0.06],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	CalamityQueller: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13507,
		extinguishing_precept: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [1],
			param3: [0.032, 0.04, 0.048, 0.056, 0.064],
			param4: [6],
			param5: [20],
		},
	},
	GrasscuttersLight: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13509,
		timeless_dream_eternal_stove: {
			param1: [0.28, 0.35, 0.42, 0.49, 0.56],
			param2: [0.8, 0.9, 1, 1.1, 1.2],
			param3: [0.3, 0.35, 0.4, 0.45, 0.5],
			param4: [12],
		},
	},
	StaffOfScarletSands: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13511,
		heat_haze_at_horizons_end: {
			param1: [0.52, 0.65, 0.78, 0.91, 1.04],
			param2: [0.28, 0.35, 0.42, 0.49, 0.56],
			param3: [10],
			param4: [0.3],
			param5: [3],
		},
	},
	CrimsonMoonsSemblance: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13512,
		ashen_suns_shadow: {
			param1: [0.25],
			param2: [14],
			param3: [0.12, 0.16, 0.2, 0.24, 0.28],
			param4: [0.3],
			param5: [0.24, 0.32, 0.4, 0.48, 0.56],
		},
	},
	LumidouceElegy: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13513,
		bright_dawn_overture: {
			param1: [0.15, 0.19, 0.23, 0.27, 0.31],
			param2: [0.18, 0.23, 0.28, 0.33, 0.38],
			param3: [8],
			param4: [12, 13, 14, 15, 16],
			param5: [12],
			atk_percent: [15.000000953674316, 19.0, 23.0, 27.000001907348633, 31.0],
		},
	},
	SymphonistofScents: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13514,
		seasoned_symphony: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
			param3: [0.32, 0.4, 0.48, 0.56, 0.64],
			param4: [3],
			atk_percent: [12.0, 15.000000953674316, 18.0, 21.0, 24.0],
		},
	},
	FracturedHalo: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13515,
		purifying_crown: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
			param2: [20],
			param3: [0.4, 0.5, 0.6, 0.7, 0.8],
			param4: [20],
		},
	},
	bloodsoaked_ruins: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13516,
		bloodsoaked_ruins: {
			param1: [3.5],
			param2: [0.36, 0.48, 0.6, 0.72, 0.84],
			param3: [6],
			param4: [0.28, 0.35, 0.42, 0.49, 0.56],
			param5: [12, 13, 14, 15, 16],
			param6: [14],
		},
	},
	MagicGuide: {
		rarity: 3,
		weapon: "catalyst",
		gameId: 14301,
		bane_of_storm_and_tide: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	ThrillingTalesofDragonSlayers: {
		rarity: 3,
		weapon: "catalyst",
		gameId: 14302,
		heritage: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
			param2: [10],
			param3: [20],
		},
	},
	OtherworldlyStory: {
		rarity: 3,
		weapon: "catalyst",
		gameId: 14303,
		energy_shower: {
			param1: [0.01, 0.0125, 0.015, 0.0175, 0.02],
		},
	},
	EmeraldOrb: {
		rarity: 3,
		weapon: "catalyst",
		gameId: 14304,
		rapids: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
		},
	},
	TwinNephrite: {
		rarity: 3,
		weapon: "catalyst",
		gameId: 14305,
		guerilla_tactics: {
			param1: [0.12, 0.14, 0.16, 0.18, 0.2],
			param2: [15],
		},
	},
	FavoniusCodex: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14401,
		windfall: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [12, 10.5, 9, 7.5, 6],
		},
	},
	Widsith: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14402,
		debut: {
			param1: [0.6, 0.75, 0.9, 1.05, 1.2],
			param2: [0.48, 0.6, 0.72, 0.84, 0.96],
			param3: [240, 300, 360, 420, 480],
			param4: [10],
			param5: [30],
		},
	},
	SacrificialFragments: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14403,
		composed: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [30, 26, 22, 19, 16],
		},
	},
	RoyalGrimoire: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14404,
		focus: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	SolarPearl: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14405,
		solar_shine: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
		},
	},
	PrototypeAmber: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14406,
		gilding: {
			param1: [6],
			param2: [2],
			param3: [4, 4.5, 5, 5.5, 6],
			param4: [0.04, 0.045, 0.05, 0.055, 0.06],
		},
	},
	MappaMare: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14407,
		infusion_scroll: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	BlackcliffAgate: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14408,
		press_the_advantage: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [30],
		},
	},
	EyeofPerception: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14409,
		echo: {
			param1: [0.5],
			param2: [4],
			param3: [2.4, 2.7, 3, 3.3, 3.6],
			param4: [12, 11, 10, 9, 8],
		},
	},
	WineandSong: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14410,
		ever_changing: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [5],
			param3: [0.14, 0.16, 0.18, 0.2, 0.22],
			param4: [5],
		},
	},
	Frostbearer: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14412,
		frost_burial: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [0.8, 0.95, 1.1, 1.25, 1.4],
			param3: [2, 2.4, 2.8, 3.2, 3.6],
			param4: [10],
		},
	},
	DodocoTales: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14413,
		dodoventure: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [6],
			param3: [0.08, 0.1, 0.12, 0.14, 0.16],
			param4: [6],
		},
	},
	HakushinRing: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14414,
		sakura_saiguu: {
			param1: [0.1, 0.125, 0.15, 0.175, 0.2],
			param2: [6],
			param3: [1],
		},
	},
	OathswornEye: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14415,
		people_of_the_faltering_light: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
			param2: [10],
		},
	},
	WanderingEvenstar: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14416,
		wildling_nightstar: {
			param1: [10],
			param2: [0.24, 0.3, 0.36, 0.42, 0.48],
			param3: [12],
			param4: [0.3],
		},
	},
	FruitOfFulfillment: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14417,
		full_circle: {
			param1: [-0.05],
			param2: [24, 27, 30, 33, 36],
			param3: [0.3],
			param4: [6],
		},
	},
	SacrificialJade: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14424,
		jade_circulation: {
			param1: [10],
			param2: [5],
			param3: [0.32, 0.4, 0.48, 0.56, 0.64],
			param4: [40, 50, 60, 70, 80],
		},
	},
	FlowingPurity: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14425,
		unfinished_masterpiece: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
			param2: [15],
			param3: [0.24],
			param4: [0.02, 0.025, 0.03, 0.035, 0.04],
			param5: [0.12, 0.15, 0.18, 0.21, 0.24],
			param6: [15],
			param7: [10],
		},
	},
	BalladoftheBoundlessBlue: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14426,
		azure_skies: {
			param1: [6],
			param2: [0.3],
			param3: [0.08, 0.1, 0.12, 0.14, 0.16],
			param4: [0.06, 0.075, 0.09, 0.105, 0.12],
		},
	},
	AshGravenDrinkingHorn: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14427,
		tupacs_grip: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [15],
		},
	},
	WaveridingWhirl: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14430,
		fangs_flying_to_and_fro: {
			param1: [0.15],
			param2: [0.2, 0.25, 0.3, 0.35, 0.4],
			param3: [10],
			param4: [15],
			param5: [0.12, 0.15, 0.18, 0.21, 0.24],
			param6: [2],
		},
	},
	RingOfCeiba: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14431,
		echoes_of_the_plentiful_land: {
			param1: [0.006, 0.007, 0.008, 0.009, 0.01],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [10],
		},
	},
	etherlight_spindlelute: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14432,
		etherlight_spindlelute: {
			param1: [100, 125, 150, 175, 200],
			param2: [20],
		},
	},
	blackmarrow_lantern: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14433,
		blackmarrow_lantern: {
			param1: [0.48, 0.6, 0.72, 0.84, 0.96],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
			param3: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	dawning_frost: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14434,
		dawning_frost: {
			param1: [72, 90, 108, 126, 144],
			param2: [10],
			param3: [48, 60, 72, 84, 96],
			param4: [10],
		},
	},
	SkywardAtlas: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14501,
		wandering_clouds: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.5],
			param3: [1.6, 2, 2.4, 2.8, 3.2],
			param4: [30],
		},
	},
	LostPrayer: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14502,
		boundless_blessing: {
			param1: [0.1],
			param2: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	MemoryofDust: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14504,
		golden_majesty: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.04, 0.05, 0.06, 0.07, 0.08],
			param3: [8],
			shield: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	JadefallsSplendor: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14505,
		primordial_jade_regalia: {
			param1: [0.003, 0.005, 0.007, 0.009, 0.011],
			param2: [0.12, 0.2, 0.28, 0.36, 0.44],
			param3: [3],
			param4: [2.5],
			param5: [4.5, 5, 5.5, 6, 6.5],
		},
	},
	EverlastingMoonglow: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14506,
		byakuya_kougetsu: {
			param1: [0.1, 0.125, 0.15, 0.175, 0.2],
			param2: [0.01, 0.015, 0.02, 0.025, 0.03],
			param3: [12],
			param4: [0.6],
			param5: [0.1],
			healing_base: [10.0, 12.5, 15.000000953674316, 17.5, 20.0],
		},
	},
	KagurasVerity: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14509,
		kagura_dance_of_the_sacred_sakura: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [16],
			param3: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	ThousandFloatingDreams: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14511,
		a_thousand_nights_dawnsong: {
			param1: [32, 40, 48, 56, 64],
			param2: [0.1, 0.14, 0.18, 0.22, 0.26],
			param3: [40, 42, 44, 46, 48],
		},
	},
	TulaytullahsRemembrance: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14512,
		bygone_azure_teardrop: {
			param1: [0.1, 0.125, 0.15, 0.175, 0.2],
			param2: [0.048, 0.06, 0.072, 0.084, 0.096],
			param3: [14],
			param4: [1],
			param5: [2],
			param6: [0.3],
			param7: [10],
		},
	},
	CashflowSupervision: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14513,
		golden_blood_tide: {
			param1: [4],
			param2: [0.3],
			param3: [0.16, 0.2, 0.24, 0.28, 0.32],
			param4: [0.14, 0.175, 0.21, 0.245, 0.28],
			param5: [0.08, 0.1, 0.12, 0.14, 0.16],
			atk_percent: [16.0, 20.0, 24.0, 28.0, 32.0],
		},
	},
	TomeoftheEternalFlow: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14514,
		aeon_wave: {
			param1: [4],
			param2: [0.3],
			param3: [0.14, 0.18, 0.22, 0.26, 0.3],
			param4: [8, 9, 10, 11, 12],
			param5: [12],
			hp_percent: [16.0, 20.0, 24.0, 28.0, 32.0],
		},
	},
	CranesEchoingCall: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14515,
		cloudfall_axiom: {
			param1: [2.5, 2.75, 3, 3.25, 3.5],
			param2: [0.7],
			param3: [0.28, 0.41, 0.54, 0.67, 0.8],
			param4: [20],
		},
	},
	SurfingTime: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14516,
		aqua_remembrance: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [15],
			param3: [14],
			param4: [4],
			param5: [0.12, 0.15, 0.18, 0.21, 0.24],
			param6: [1.5],
			param7: [1],
			param8: [1.5],
			hp_percent: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	StarcallersWatch: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14517,
		offering_unto_wind_and_sun: {
			param1: [0.28, 0.35, 0.42, 0.49, 0.56],
			param2: [15],
			param3: [14],
			mastery_base: [100.0, 125.0, 150.0, 175.0, 200.0],
		},
	},
	MorningHibernation: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14518,
		bathhouses_hawks_and_narukami: {
			param1: [120, 150, 180, 210, 240],
			param2: [96, 120, 144, 168, 192],
			param3: [32, 40, 48, 56, 64],
			param4: [6],
			param5: [9],
			param6: [30],
		},
	},
	VividNotions: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14519,
		falling_rainbows_wish: {
			param1: [0.28, 0.35, 0.42, 0.49, 0.56],
			param2: [15],
			param3: [0.28, 0.35, 0.42, 0.49, 0.56],
			param4: [0.4, 0.5, 0.6, 0.7, 0.8],
			atk_percent: [28.0, 35.0, 42.0, 49.0, 56.0],
		},
	},
	nightweavers_looking_glass: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14520,
		nightweavers_looking_glass: {
			param1: [60, 75, 90, 105, 120],
			param2: [10],
			param3: [60, 75, 90, 105, 120],
			param4: [4.5],
			param5: [1.2, 1.5, 1.8, 2.1, 2.4],
			param6: [0.8, 1, 1.2, 1.4, 1.6],
			param7: [0.4, 0.5, 0.6, 0.7, 0.8],
		},
	},
	reliquary_of_truth: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14521,
		reliquary_of_truth: {
			param1: [80, 100, 120, 140, 160],
			param2: [0.24, 0.3, 0.36, 0.42, 0.48],
			param3: [12],
			param4: [4],
			param5: [0.5],
			param6: [0.08, 0.1, 0.12, 0.14, 0.16],
			crit_rate_base: [8.0, 10.0, 12.0, 14.0, 16.0],
		},
	},
	nocturnes_curtain_call: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14522,
		nocturnes_curtain_call: {
			param1: [0.14, 0.16, 0.18, 0.2, 0.22],
			param2: [0.6, 0.8, 1, 1.2, 1.4],
			param3: [12],
			param4: [14, 15, 16, 17, 18],
			param5: [18],
			hp_percent: [10.0, 12.0, 14.0, 16.0, 18.0],
		},
	},
	angelos_heptades: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14523,
		angelos_heptades: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [1000],
			param3: [0.1, 0.13, 0.16, 0.19, 0.22],
			param4: [0.26, 0.34, 0.42, 0.5, 0.58],
			param5: [20],
			param6: [14, 15, 16, 17, 18],
			param7: [14],
			param8: [0.5],
			atk_percent: [12.0, 15.000000953674316, 18.0, 21.0, 24.0],
		},
	},
	RavenBow: {
		rarity: 3,
		weapon: "bow",
		gameId: 15301,
		bane_of_flame_and_water: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	SharpshootersOath: {
		rarity: 3,
		weapon: "bow",
		gameId: 15302,
		precise: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
		},
	},
	RecurveBow: {
		rarity: 3,
		weapon: "bow",
		gameId: 15303,
		cull_the_weak: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	Slingshot: {
		rarity: 3,
		weapon: "bow",
		gameId: 15304,
		slingshot: {
			param1: [0.3],
			param2: [0.36, 0.42, 0.48, 0.54, 0.6],
			param3: [0.1],
		},
	},
	Messenger: {
		rarity: 3,
		weapon: "bow",
		gameId: 15305,
		archers_message: {
			param1: [1, 1.25, 1.5, 1.75, 2],
		},
	},
	FavoniusWarbow: {
		rarity: 4,
		weapon: "bow",
		gameId: 15401,
		windfall: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [12, 10.5, 9, 7.5, 6],
		},
	},
	Stringless: {
		rarity: 4,
		weapon: "bow",
		gameId: 15402,
		arrowless_song: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
		},
	},
	SacrificialBow: {
		rarity: 4,
		weapon: "bow",
		gameId: 15403,
		composed: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [30, 26, 22, 19, 16],
		},
	},
	RoyalBow: {
		rarity: 4,
		weapon: "bow",
		gameId: 15404,
		focus: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	Rust: {
		rarity: 4,
		weapon: "bow",
		gameId: 15405,
		rapid_firing: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [0.1],
		},
	},
	PrototypeCrescent: {
		rarity: 4,
		weapon: "bow",
		gameId: 15406,
		unreturning: {
			param1: [0.1],
			param2: [0.36, 0.45, 0.54, 0.63, 0.72],
			param3: [10],
		},
	},
	CompoundBow: {
		rarity: 4,
		weapon: "bow",
		gameId: 15407,
		infusion_arrow: {
			param1: [0.04, 0.05, 0.06, 0.07, 0.08],
			param2: [0.012, 0.015, 0.018, 0.021, 0.024],
			param3: [0.3],
		},
	},
	BlackcliffWarbow: {
		rarity: 4,
		weapon: "bow",
		gameId: 15408,
		press_the_advantage: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [30],
		},
	},
	ViridescentHunt: {
		rarity: 4,
		weapon: "bow",
		gameId: 15409,
		verdant_wind: {
			param1: [0.5],
			param2: [0.4, 0.5, 0.6, 0.7, 0.8],
			param3: [0.5],
			param4: [4],
			param5: [14, 13, 12, 11, 10],
		},
	},
	AlleyHunter: {
		rarity: 4,
		weapon: "bow",
		gameId: 15410,
		oppidan_ambush: {
			param1: [0.02, 0.025, 0.03, 0.035, 0.04],
			param2: [4],
		},
	},
	FadingTwilight: {
		rarity: 4,
		weapon: "bow",
		gameId: 15411,
		radiance_of_the_deeps: {
			param1: [7],
			param2: [0.06, 0.075, 0.09, 0.105, 0.12],
			param3: [0.1, 0.125, 0.15, 0.175, 0.2],
			param4: [0.14, 0.175, 0.21, 0.245, 0.28],
		},
	},
	MitternachtsWaltz: {
		rarity: 4,
		weapon: "bow",
		gameId: 15412,
		evernight_duet: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [5],
			param3: [0.2, 0.25, 0.3, 0.35, 0.4],
			param4: [5],
		},
	},
	WindblumeOde: {
		rarity: 4,
		weapon: "bow",
		gameId: 15413,
		windblume_wish: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [6],
		},
	},
	Hamayumi: {
		rarity: 4,
		weapon: "bow",
		gameId: 15414,
		full_draw: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
			param3: [1],
		},
	},
	Predator: {
		rarity: 4,
		weapon: "bow",
		gameId: 15415,
		strong_strike: {
			param1: [0.1],
			param2: [6],
			param3: [66],
		},
	},
	MouunsMoon: {
		rarity: 4,
		weapon: "bow",
		gameId: 15416,
		watatsumi_wavewalker: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.4, 0.5, 0.6, 0.7, 0.8],
		},
	},
	KingsSquire: {
		rarity: 4,
		weapon: "bow",
		gameId: 15417,
		labyrinth_lords_instruction: {
			param1: [60, 80, 100, 120, 140],
			param2: [12],
			param3: [1, 1.2, 1.4, 1.6, 1.8],
			param4: [20],
		},
	},
	EndOfTheLine: {
		rarity: 4,
		weapon: "bow",
		gameId: 15418,
		net_snapper: {
			param1: [0.8, 1, 1.2, 1.4, 1.6],
			param2: [15],
			param3: [3],
			param4: [2],
			param5: [12],
		},
	},
	IbisPiercer: {
		rarity: 4,
		weapon: "bow",
		gameId: 15419,
		secret_wisdoms_favor: {
			param1: [40, 50, 60, 70, 80],
			param2: [6],
			param3: [2],
			param4: [0.5],
		},
	},
	ScionOfTheBlazingSun: {
		rarity: 4,
		weapon: "bow",
		gameId: 15424,
		the_way_of_sunfire: {
			param1: [10],
			param2: [0.6, 0.75, 0.9, 1.05, 1.2],
			param3: [10],
			param4: [0.28, 0.35, 0.42, 0.49, 0.56],
		},
	},
	SongOfStillness: {
		rarity: 4,
		weapon: "bow",
		gameId: 15425,
		benthic_pulse: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [8],
		},
	},
	Cloudforged: {
		rarity: 4,
		weapon: "bow",
		gameId: 15426,
		crag_chiseled_forge: {
			param1: [40, 50, 60, 70, 80],
			param2: [18],
		},
	},
	RangeGauge: {
		rarity: 4,
		weapon: "bow",
		gameId: 15427,
		masons_ditty: {
			param1: [30],
			param2: [10],
			param3: [15],
			param4: [0.03, 0.04, 0.05, 0.06, 0.07],
			param5: [0.07, 0.085, 0.1, 0.115, 0.13],
		},
	},
	FlowerWreathedFeathers: {
		rarity: 4,
		weapon: "bow",
		gameId: 15430,
		inflorescence_unattainable: {
			param1: [0.15],
			param2: [0.5],
			param3: [0.06, 0.075, 0.09, 0.105, 0.12],
			param4: [6],
			param5: [10],
		},
	},
	ShatteredChains: {
		rarity: 4,
		weapon: "bow",
		gameId: 15431,
		flower_feather_song: {
			param1: [0.048, 0.06, 0.072, 0.084, 0.096],
			param2: [24, 30, 36, 42, 48],
		},
	},
	SequenceofSolitude: {
		rarity: 4,
		weapon: "bow",
		gameId: 15432,
		silent_trigger: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [15],
		},
	},
	snare_hook: {
		rarity: 4,
		weapon: "bow",
		gameId: 15433,
		snare_hook: {
			param1: [60, 75, 90, 105, 120],
			param2: [12],
			param3: [60, 75, 90, 105, 120],
		},
	},
	rainbow_serpents_rain_bow: {
		rarity: 4,
		weapon: "bow",
		gameId: 15434,
		rainbow_serpents_rain_bow: {
			param1: [8],
			param2: [0.28, 0.35, 0.42, 0.49, 0.56],
		},
	},
	SkywardHarp: {
		rarity: 5,
		weapon: "bow",
		gameId: 15501,
		echoing_ballad: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.6, 0.7, 0.8, 0.9, 1],
			param3: [1.25],
			param4: [4, 3.5, 3, 2.5, 2],
			crit_dmg_base: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	AmosBow: {
		rarity: 5,
		weapon: "bow",
		gameId: 15502,
		strong_willed: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	ElegyfortheEnd: {
		rarity: 5,
		weapon: "bow",
		gameId: 15503,
		the_parting_refrain: {
			param1: [60, 75, 90, 105, 120],
			param2: [0.2],
			param3: [12],
			param4: [100, 125, 150, 175, 200],
			param5: [0.2, 0.25, 0.3, 0.35, 0.4],
			param6: [20],
			mastery_base: [60.0, 75.0, 90.0, 105.0, 120.0],
		},
	},
	PolarStar: {
		rarity: 5,
		weapon: "bow",
		gameId: 15507,
		daylights_augury: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [12],
			param3: [0.1, 0.125, 0.15, 0.175, 0.2],
			param4: [0.2, 0.25, 0.3, 0.35, 0.4],
			param5: [0.3, 0.375, 0.45, 0.525, 0.6],
			param6: [0.48, 0.6, 0.72, 0.84, 0.96],
		},
	},
	AquaSimulacra: {
		rarity: 5,
		weapon: "bow",
		gameId: 15508,
		the_cleansing_form: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [0.2, 0.25, 0.3, 0.35, 0.4],
			param3: [0.5],
			param4: [1.2],
			hp_percent: [16.0, 20.0, 24.0, 28.0, 32.0],
		},
	},
	ThunderingPulse: {
		rarity: 5,
		weapon: "bow",
		gameId: 15509,
		rule_by_thunder: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
			param3: [0.24, 0.3, 0.36, 0.42, 0.48],
			param4: [0.4, 0.5, 0.6, 0.7, 0.8],
			param5: [5],
			param6: [10],
			atk_percent: [20.0, 25.0, 30.000001907348633, 35.0, 40.0],
		},
	},
	HuntersPath: {
		rarity: 5,
		weapon: "bow",
		gameId: 15511,
		at_the_end_of_the_beast_paths: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [1.6, 2, 2.4, 2.8, 3.2],
			param3: [12],
			param4: [10],
			param5: [12],
		},
	},
	TheFirstGreatMagic: {
		rarity: 5,
		weapon: "bow",
		gameId: 15512,
		parsifal_the_great: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [0.32, 0.4, 0.48, 0.56, 0.64],
			param4: [0.48, 0.6, 0.72, 0.84, 0.96],
			param5: [0.04, 0.06, 0.08, 0.1, 0.12],
			param6: [0.07, 0.09, 0.11, 0.13, 0.15],
			param7: [0.1, 0.12, 0.14, 0.16, 0.18],
		},
	},
	SilvershowerHeartstrings: {
		rarity: 5,
		weapon: "bow",
		gameId: 15513,
		dryass_nocturne: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.24, 0.3, 0.36, 0.42, 0.48],
			param3: [0.4, 0.5, 0.6, 0.7, 0.8],
			param4: [25],
			param5: [25],
			param6: [20],
			param7: [0.28, 0.35, 0.42, 0.49, 0.56],
			param8: [4],
		},
	},
	AstralVulturesCrimsonPlumage: {
		rarity: 5,
		weapon: "bow",
		gameId: 15514,
		the_moonring_sighted: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
			param2: [12],
			param3: [0.2, 0.25, 0.3, 0.35, 0.4],
			param4: [0.48, 0.6, 0.72, 0.84, 0.96],
			param5: [0.1, 0.125, 0.15, 0.175, 0.2],
			param6: [0.24, 0.3, 0.36, 0.42, 0.48],
		},
	},
	the_daybreak_chronicles: {
		rarity: 5,
		weapon: "bow",
		gameId: 15515,
		the_daybreak_chronicles: {
			param1: [3],
			param2: [0.6, 0.75, 0.9, 1.05, 1.2],
			param3: [0.1, 0.125, 0.15, 0.175, 0.2],
			param4: [0.1, 0.125, 0.15, 0.175, 0.2],
			param5: [0.1],
			param6: [0.2, 0.25, 0.3, 0.35, 0.4],
		},
	},
	golden_frostbound_oath: {
		rarity: 5,
		weapon: "bow",
		gameId: 15516,
		golden_frostbound_oath: {
			param1: [6],
			param2: [0.4, 0.5, 0.6, 0.7, 0.8],
			param3: [0.4, 0.5, 0.6, 0.7, 0.8],
			param4: [0.5],
			param5: [0.16, 0.2, 0.24, 0.28, 0.32],
			def_percent: [16.0, 20.0, 24.0, 28.0, 32.0],
		},
	},
};
