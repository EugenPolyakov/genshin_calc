// This file is auto generated
import { StatTable } from "../../classes/StatTable";
import { StatTableAscensionScale } from "../../classes/StatTable/Ascension/Scale";
import { weaponStatScales } from "./WeaponScale";

const enumAscensionTables = {
	n1: new StatTable('', [19.5, 38.9, 58.4, 77.8, 97.3, 116.7]),
	n2: new StatTable('', [25.9, 51.9, 77.8, 103.7, 129.7, 155.6]),
	n3: new StatTable('', [31.1, 62.2, 93.4, 124.5, 155.6, 186.7]),
};

const enumStatTables = {
	atk39: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 38.7413,
		ascension: enumAscensionTables.n1,
		scale: weaponStatScales.atk_1_1,
	}),
	atkp8: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 7.66,
		scale: weaponStatScales.crt_1_1,
	}),
	cdmg10: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 10.2,
		scale: weaponStatScales.crt_1_1,
	}),
	atk40: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 39.8751,
		ascension: enumAscensionTables.n1,
		scale: weaponStatScales.atk_1_2,
	}),
	def6: new StatTableAscensionScale({
		stat: 'def_percent',
		base: 6.3733,
		scale: weaponStatScales.crt_1_1,
	}),
	mastery31: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 30.6,
		scale: weaponStatScales.crt_1_1,
	}),
	atk38: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 37.6075,
		ascension: enumAscensionTables.n1,
		scale: weaponStatScales.atk_1_4,
	}),
	recharge11: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 11.3333,
		scale: weaponStatScales.crt_1_1,
	}),
	atk41: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 41.0671,
		ascension: enumAscensionTables.n2,
		scale: weaponStatScales.atk_2_4,
	}),
	recharge13: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 13.3333,
		scale: weaponStatScales.crt_2_1,
	}),
	atk42: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 42.401,
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
		base: 43.7349,
		ascension: enumAscensionTables.n2,
		scale: weaponStatScales.atk_2_2,
	}),
	phys8: new StatTableAscensionScale({
		stat: 'dmg_phys_base',
		base: 7.5067,
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
		base: 45.0687,
		ascension: enumAscensionTables.n2,
		scale: weaponStatScales.atk_2_3,
	}),
	mastery12: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 12,
		scale: weaponStatScales.crt_2_1,
	}),
	atk39_1: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 38.7413,
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
		base: 15.0133,
		scale: weaponStatScales.crt_2_1,
	}),
	recharge7: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 6.6667,
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
		base: 47.537,
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
		base: 45.9364,
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
		base: 43.2,
		scale: weaponStatScales.crt_3_1,
	}),
	atkp11: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 10.8,
		scale: weaponStatScales.crt_3_1,
	}),
	atk44_2: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 44.3358,
		ascension: enumAscensionTables.n3,
		scale: weaponStatScales.atk_3_4,
	}),
	crit10: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 9.6,
		scale: weaponStatScales.crt_3_1,
	}),
	cdmg10_3: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 9.6,
		scale: weaponStatScales.crt_3_1,
	}),
	crit7: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 7.2,
		scale: weaponStatScales.crt_3_1,
	}),
	hp14: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 14.4,
		scale: weaponStatScales.crt_3_1,
	}),
	cdmg19: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 19.2,
		scale: weaponStatScales.crt_3_1,
	}),
	def18: new StatTableAscensionScale({
		stat: 'def_percent',
		base: 18,
		scale: weaponStatScales.crt_3_1,
	}),
	crit5: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 4.8,
		scale: weaponStatScales.crt_3_1,
	}),
	hp8: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 7.66,
		scale: weaponStatScales.crt_1_1,
	}),
	mastery41: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 40.8,
		scale: weaponStatScales.crt_1_1,
	}),
	def10: new StatTableAscensionScale({
		stat: 'def_percent',
		base: 9.56,
		scale: weaponStatScales.crt_1_1,
	}),
	phys10: new StatTableAscensionScale({
		stat: 'dmg_phys_base',
		base: 9.56,
		scale: weaponStatScales.crt_1_1,
	}),
	def11: new StatTableAscensionScale({
		stat: 'def_percent',
		base: 11.26,
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
		base: 49.1377,
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
		base: 2.4,
		scale: weaponStatScales.crt_3_1,
	}),
	crit5_4: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 5.1,
		scale: weaponStatScales.crt_1_1,
	}),
	atkp5: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 5.1067,
		scale: weaponStatScales.crt_1_1,
	}),
	hp10: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 10.2133,
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
		base: 15.0133,
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
		base: 14.4,
		scale: weaponStatScales.crt_3_1,
	}),
	atkp4: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 3.6,
		scale: weaponStatScales.crt_3_1,
	}),
	recharge8_6: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 8.5,
		scale: weaponStatScales.crt_1_1,
	}),
	mastery20: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 20.4,
		scale: weaponStatScales.crt_1_1,
	}),
	crit3: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 3.4,
		scale: weaponStatScales.crt_1_1,
	}),
	atkp7: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 7.2,
		scale: weaponStatScales.crt_3_1,
	}),
	hp11: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 10.8,
		scale: weaponStatScales.crt_3_1,
	}),
	mastery58: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 57.6,
		scale: weaponStatScales.crt_3_1,
	}),
	crit7_7: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 6.8,
		scale: weaponStatScales.crt_1_1,
	}),
	cdmg7: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 6.8,
		scale: weaponStatScales.crt_1_1,
	}),
	phys11: new StatTableAscensionScale({
		stat: 'dmg_phys_base',
		base: 11.26,
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
};
export const weaponDataTable = {
	CoolSteel: {
		rarity: 3,
		weapon: "sword",
		gameId: 11301,
		Weapon_Sword_DamageUpToEnemy: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	HarbingerofDawn: {
		rarity: 3,
		weapon: "sword",
		gameId: 11302,
		Weapon_Sword_FullHPCriticUp: {
			param1: [0.14, 0.175, 0.21, 0.245, 0.28],
		},
	},
	TravelersHandySword: {
		rarity: 3,
		weapon: "sword",
		gameId: 11303,
		Weapon_Sword_OnGainEnergyHealHP: {
			param1: [0.01, 0.0125, 0.015, 0.0175, 0.02],
			param2: [1, 1, 1, 1, 1],
		},
	},
	DarkIronSword: {
		rarity: 3,
		weapon: "sword",
		gameId: 11304,
		Weapon_Sword_AttacktUpAfterReaction: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [12, 12, 12, 12, 12],
		},
	},
	FilletBlade: {
		rarity: 3,
		weapon: "sword",
		gameId: 11305,
		Weapon_Sword_ExtraDamageWhenCDReady: {
			param1: [0.5, 0.5, 0.5, 0.5, 0.5],
			param2: [2.4, 2.8, 3.2, 3.6, 4],
			param3: [15, 14, 13, 12, 11],
		},
	},
	SkyriderSword: {
		rarity: 3,
		weapon: "sword",
		gameId: 11306,
		Weapon_Sword_MoveSpeedAfterULT: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [15, 15, 15, 15, 15],
		},
	},
	FavoniusSword: {
		rarity: 4,
		weapon: "sword",
		gameId: 11401,
		Weapon_Sword_GenerateBallWhenCritic: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [12, 10.5, 9, 7.5, 6],
		},
	},
	Flute: {
		rarity: 4,
		weapon: "sword",
		gameId: 11402,
		Weapon_Sword_MusicBlast: {
			param1: [1, 1, 1, 1, 1],
			param2: [1, 1.25, 1.5, 1.75, 2],
		},
	},
	SacrificialSword: {
		rarity: 4,
		weapon: "sword",
		gameId: 11403,
		Weapon_Sword_ResetCDWhenSkillHit: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [30, 26, 22, 19, 16],
		},
	},
	RoyalLongsword: {
		rarity: 4,
		weapon: "sword",
		gameId: 11404,
		Weapon_Sword_CritUpWhenHitNoCrit: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	LionsRoar: {
		rarity: 4,
		weapon: "sword",
		gameId: 11405,
		Weapon_Sword_DamageUpToWindEnemy: {
			param1: [0.2, 0.24, 0.28, 0.32, 0.36],
		},
	},
	PrototypeRancour: {
		rarity: 4,
		weapon: "sword",
		gameId: 11406,
		Weapon_Sword_AttackGainAKTDEFBuff: {
			param1: [0.04, 0.05, 0.06, 0.07, 0.08],
		},
	},
	IronSting: {
		rarity: 4,
		weapon: "sword",
		gameId: 11407,
		Weapon_Sword_AttackGainFullDamgeUpBuff: {
			param1: [0.06, 0.075, 0.09, 0.105, 0.12],
			param2: [1, 1, 1, 1, 1],
			param3: [6, 6, 6, 6, 6],
		},
	},
	BlackcliffLongsword: {
		rarity: 4,
		weapon: "sword",
		gameId: 11408,
		Weapon_Sword_Blackrock: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [30, 30, 30, 30, 30],
		},
	},
	BlackSword: {
		rarity: 4,
		weapon: "sword",
		gameId: 11409,
		Weapon_Sword_Bloodstained: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.6, 0.7, 0.8, 0.9, 1],
			param3: [5, 5, 5, 5, 5],
			param4: [1, 1, 1, 1, 1],
		},
	},
	AlleyFlash: {
		rarity: 4,
		weapon: "sword",
		gameId: 11410,
		Weapon_Sword_Outlaw: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [5, 5, 5, 5, 5],
		},
	},
	SwordofDescension: {
		rarity: 4,
		weapon: "sword",
		gameId: 11412,
		Weapon_Sword_Psalmus: {
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
		Weapon_Sword_Magnum: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [0.06, 0.075, 0.09, 0.105, 0.12],
		},
	},
	AmenomaKageuchi: {
		rarity: 4,
		weapon: "sword",
		gameId: 11414,
		Weapon_Sword_Bakufu: {
			param1: [30, 30, 30, 30, 30],
			param2: [3, 3, 3, 3, 3],
			param3: [5, 5, 5, 5, 5],
			param4: [6, 7.5, 9, 10.5, 12],
		},
	},
	CinnabarSpindle: {
		rarity: 4,
		weapon: "sword",
		gameId: 11415,
		Weapon_Sword_Opus: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [4000, 5000, 6000, 7000, 8000],
			param3: [1.5, 1.5, 1.5, 1.5, 1.5],
			param4: [0.1, 0.1, 0.1, 0.1, 0.1],
		},
	},
	KagotsurubeIsshin: {
		rarity: 4,
		weapon: "sword",
		gameId: 11416,
		Weapon_Sword_Youtou: {
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
		Weapon_Sword_Arakalari: {
			param1: [60, 75, 90, 105, 120],
			param2: [12, 12, 12, 12, 12],
			param3: [20, 20, 20, 20, 20],
			param4: [10, 10, 10, 10, 10],
		},
	},
	XiphosMoonlight: {
		rarity: 4,
		weapon: "sword",
		gameId: 11418,
		Weapon_Sword_Pleroma: {
			param1: [10, 10, 10, 10, 10],
			param2: [0.036, 0.045, 0.054, 0.063, 0.072],
			param3: [12, 12, 12, 12, 12],
			param4: [0.3, 0.3, 0.3, 0.3, 0.3],
		},
	},
	ToukabouShigure: {
		rarity: 4,
		weapon: "sword",
		gameId: 11422,
		Weapon_Sword_Kasabouzu: {
			param1: [10, 10, 10, 10, 10],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [15, 15, 15, 15, 15],
		},
	},
	WolfFang: {
		rarity: 4,
		weapon: "sword",
		gameId: 11424,
		Weapon_Sword_Boreas: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [10, 10, 10, 10, 10],
			param3: [4, 4, 4, 4, 4],
			param4: [0.02, 0.025, 0.03, 0.035, 0.04],
			param5: [10, 10, 10, 10, 10],
			param6: [4, 4, 4, 4, 4],
			param7: [0.02, 0.025, 0.03, 0.035, 0.04],
			param8: [0.1, 0.1, 0.1, 0.1, 0.1],
		},
	},
	FinaleOfTheDeep: {
		rarity: 4,
		weapon: "sword",
		gameId: 11425,
		Weapon_Sword_Vorpal: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [15, 15, 15, 15, 15],
			param3: [0.25, 0.25, 0.25, 0.25, 0.25],
			param4: [0.024, 0.03, 0.036, 0.042, 0.048],
			param5: [150, 187.5, 225, 262.5, 300],
			param6: [15, 15, 15, 15, 15],
			param7: [10, 10, 10, 10, 10],
		},
	},
	FleuveCendreFerryman: {
		rarity: 4,
		weapon: "sword",
		gameId: 11426,
		Weapon_Sword_Machination: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [5, 5, 5, 5, 5],
		},
	},
	TheDockhandsAssistant: {
		rarity: 4,
		weapon: "sword",
		gameId: 11427,
		Weapon_Sword_Mechanic: {
			param1: [30, 30, 30, 30, 30],
			param2: [10, 10, 10, 10, 10],
			param3: [15, 15, 15, 15, 15],
			param4: [2, 2.5, 3, 3.5, 4],
			param5: [40, 50, 60, 70, 80],
		},
	},
	SwordOfNarzissenkreuz: {
		rarity: 4,
		weapon: "sword",
		gameId: 11428,
		Weapon_Sword_Purewill: {
			param1: [1.6, 2, 2.4, 2.8, 3.2],
			param2: [12, 12, 12, 12, 12],
		},
	},
	SturdyBone: {
		rarity: 4,
		weapon: "sword",
		gameId: 11430,
		Weapon_Sword_Umpakati: {
			param1: [0.15, 0.15, 0.15, 0.15, 0.15],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [18, 18, 18, 18, 18],
			param4: [7, 7, 7, 7, 7],
		},
	},
	FlamebreathFlute: {
		rarity: 4,
		weapon: "sword",
		gameId: 11431,
		Weapon_Sword_Isikhulu: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [15, 15, 15, 15, 15],
		},
	},
	CalamityOfEshu: {
		rarity: 4,
		weapon: "sword",
		gameId: 11432,
		Weapon_Sword_SacrificialNgombe: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	serenitys_call: {
		rarity: 4,
		weapon: "sword",
		gameId: 11433,
		Weapon_Sword_Ilmarinen: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [12, 12, 12, 12, 12],
			param3: [0.16, 0.2, 0.24, 0.28, 0.32],
		},
	},
	moonweavers_dawn: {
		rarity: 4,
		weapon: "sword",
		gameId: 11434,
		Weapon_Sword_Miekka: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [0.28, 0.35, 0.42, 0.49, 0.56],
		},
	},
	AquilaFavonia: {
		rarity: 5,
		weapon: "sword",
		gameId: 11501,
		Weapon_Sword_Legend_Falcon: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [1, 1.15, 1.3, 1.45, 1.6],
			param3: [2, 2.3, 2.6, 2.9, 3.2],
			param4: [15, 15, 15, 15, 15],
		},
	},
	SkywardBlade: {
		rarity: 5,
		weapon: "sword",
		gameId: 11502,
		Weapon_Sword_Legend_Dvalin: {
			param1: [0.04, 0.05, 0.06, 0.07, 0.08],
			param2: [0.1, 0.1, 0.1, 0.1, 0.1],
			param3: [0.1, 0.1, 0.1, 0.1, 0.1],
			param4: [0.2, 0.25, 0.3, 0.35, 0.4],
			param5: [12, 12, 12, 12, 12],
		},
	},
	FreedomSworn: {
		rarity: 5,
		weapon: "sword",
		gameId: 11503,
		Weapon_Sword_Widsith: {
			param1: [0.1, 0.125, 0.15, 0.175, 0.2],
			param2: [0.5, 0.5, 0.5, 0.5, 0.5],
			param3: [12, 12, 12, 12, 12],
			param4: [0.16, 0.2, 0.24, 0.28, 0.32],
			param5: [0.2, 0.25, 0.3, 0.35, 0.4],
			param6: [20, 20, 20, 20, 20],
		},
	},
	SummitShaper: {
		rarity: 5,
		weapon: "sword",
		gameId: 11504,
		Weapon_Sword_Kunwu_DamageUpWithShield: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.04, 0.05, 0.06, 0.07, 0.08],
			param3: [8, 8, 8, 8, 8],
		},
	},
	PrimordialJadeCutter: {
		rarity: 5,
		weapon: "sword",
		gameId: 11505,
		Weapon_Sword_Morax_HpToAtk: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.012, 0.015, 0.018, 0.021, 0.024],
		},
	},
	MistsplitterReforged: {
		rarity: 5,
		weapon: "sword",
		gameId: 11509,
		Weapon_Sword_Narukami: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.08, 0.1, 0.12, 0.14, 0.16],
			param3: [0.16, 0.2, 0.24, 0.28, 0.32],
			param4: [0.28, 0.35, 0.42, 0.49, 0.56],
			param5: [5, 5, 5, 5, 5],
			param6: [10, 10, 10, 10, 10],
		},
	},
	HaranGeppakuFutsu: {
		rarity: 5,
		weapon: "sword",
		gameId: 11510,
		Weapon_Sword_Amenoma: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [2, 2, 2, 2, 2],
			param3: [0.3, 0.3, 0.3, 0.3, 0.3],
			param4: [0.2, 0.25, 0.3, 0.35, 0.4],
			param5: [8, 8, 8, 8, 8],
		},
	},
	KeyofKhajNisut: {
		rarity: 5,
		weapon: "sword",
		gameId: 11511,
		Weapon_Sword_Deshret: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.0012, 0.0015, 0.0018, 0.0021, 0.0024],
			param3: [20, 20, 20, 20, 20],
			param4: [0.3, 0.3, 0.3, 0.3, 0.3],
			param5: [0.002, 0.0025, 0.003, 0.0035, 0.004],
			param6: [20, 20, 20, 20, 20],
		},
	},
	LightofFoliarIncision: {
		rarity: 5,
		weapon: "sword",
		gameId: 11512,
		Weapon_Sword_Ayus: {
			param1: [0.04, 0.05, 0.06, 0.07, 0.08],
			param2: [1.2, 1.5, 1.8, 2.1, 2.4],
			param3: [28, 28, 28, 28, 28],
			param4: [12, 12, 12, 12, 12],
			param5: [12, 12, 12, 12, 12],
		},
	},
	SplendorOfStillWaters: {
		rarity: 5,
		weapon: "sword",
		gameId: 11513,
		Weapon_Sword_Regalis: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
			param2: [6, 6, 6, 6, 6],
			param3: [0.2, 0.2, 0.2, 0.2, 0.2],
			param4: [0.14, 0.175, 0.21, 0.245, 0.28],
			param5: [6, 6, 6, 6, 6],
			param6: [0.2, 0.2, 0.2, 0.2, 0.2],
		},
	},
	UrakuMisugiri: {
		rarity: 5,
		weapon: "sword",
		gameId: 11514,
		Weapon_Sword_Needle: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [0.24, 0.3, 0.36, 0.42, 0.48],
			param4: [1, 1, 1, 1, 1],
			param5: [15, 15, 15, 15, 15],
		},
	},
	Absolution: {
		rarity: 5,
		weapon: "sword",
		gameId: 11515,
		Weapon_Sword_Estoc: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [6, 6, 6, 6, 6],
		},
	},
	PeakPatrolSong: {
		rarity: 5,
		weapon: "sword",
		gameId: 11516,
		Weapon_Sword_XochitlsTube: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
			param2: [6, 6, 6, 6, 6],
			param3: [0.1, 0.1, 0.1, 0.1, 0.1],
			param4: [0.1, 0.125, 0.15, 0.175, 0.2],
			param5: [0.08, 0.1, 0.12, 0.14, 0.16],
			param6: [15, 15, 15, 15, 15],
			param7: [3200, 3200, 3200, 3200, 3200],
		},
	},
	Azurelight: {
		rarity: 5,
		weapon: "sword",
		gameId: 11517,
		Weapon_Sword_OuterSword: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
			param2: [12, 12, 12, 12, 12],
			param3: [0.24, 0.3, 0.36, 0.42, 0.48],
			param4: [0.4, 0.5, 0.6, 0.7, 0.8],
		},
	},
	FerrousShadow: {
		rarity: 3,
		weapon: "claymore",
		gameId: 12301,
		Weapon_Claymore_LowHPAddExtraAttackEndura: {
			param1: [0.7, 0.75, 0.8, 0.85, 0.9],
			param2: [0.3, 0.35, 0.4, 0.45, 0.5],
		},
	},
	BloodtaintedGreatsword: {
		rarity: 3,
		weapon: "claymore",
		gameId: 12302,
		Weapon_Claymore_DamageUpToEnemy: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	WhiteIronGreatsword: {
		rarity: 3,
		weapon: "claymore",
		gameId: 12303,
		Weapon_Claymore_HealAmountHPonEnemyKilled: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	DebateClub: {
		rarity: 3,
		weapon: "claymore",
		gameId: 12305,
		Weapon_Claymore_NormalAttackExtraDamageAfterSkill: {
			param1: [0.6, 0.75, 0.9, 1.05, 1.2],
			param2: [15, 15, 15, 15, 15],
			param3: [3, 3, 3, 3, 3],
		},
	},
	SkyriderGreatsword: {
		rarity: 3,
		weapon: "claymore",
		gameId: 12306,
		Weapon_Claymore_AttackUpBuff: {
			param1: [0.06, 0.07, 0.08, 0.09, 0.1],
		},
	},
	FavoniusGreatsword: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12401,
		Weapon_Claymore_GenerateBallWhenCritic: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [12, 10.5, 9, 7.5, 6],
		},
	},
	Bell: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12402,
		Weapon_Claymore_GetShieldBeingHit: {
			param1: [0.2, 0.23, 0.26, 0.29, 0.32],
			param2: [45, 45, 45, 45, 45],
			param3: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	SacrificialGreatsword: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12403,
		Weapon_Claymore_ResetCDWhenSkillHit: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [30, 26, 22, 19, 16],
		},
	},
	RoyalGreatsword: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12404,
		Weapon_Claymore_CritUpWhenHitNoCrit: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	Rainslasher: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12405,
		Weapon_Claymore_DamageUpToElectricEnemy: {
			param1: [0.2, 0.24, 0.28, 0.32, 0.36],
		},
	},
	PrototypeArchaic: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12406,
		Weapon_Claymore_AOEDamage: {
			param1: [0.5, 0.5, 0.5, 0.5, 0.5],
			param2: [2.4, 3, 3.6, 4.2, 4.8],
		},
	},
	Whiteblind: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12407,
		Weapon_Claymore_AttackGainAKTDEFBuff: {
			param1: [0.06, 0.075, 0.09, 0.105, 0.12],
		},
	},
	BlackcliffSlasher: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12408,
		Weapon_Claymore_Blackrock: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [30, 30, 30, 30, 30],
		},
	},
	SerpentSpine: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12409,
		Weapon_Claymore_Berserker: {
			param1: [4, 4, 4, 4, 4],
			param2: [0.06, 0.07, 0.08, 0.09, 0.1],
			param3: [0.03, 0.027, 0.024, 0.022, 0.02],
		},
	},
	LithicBlade: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12410,
		Weapon_Claymore_Liyue: {
			param1: [0.07, 0.08, 0.09, 0.1, 0.11],
			param2: [0.03, 0.04, 0.05, 0.06, 0.07],
			param3: [4, 4, 4, 4, 4],
		},
	},
	SnowTombedStarsilver: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12411,
		Weapon_Claymore_Dragonfell: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [0.8, 0.95, 1.1, 1.25, 1.4],
			param3: [2, 2.4, 2.8, 3.2, 3.6],
			param4: [10, 10, 10, 10, 10],
		},
	},
	LuxuriousSeaLord: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12412,
		Weapon_Claymore_MillenniaTuna: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [1, 1, 1, 1, 1],
			param3: [1, 1.25, 1.5, 1.75, 2],
			param4: [15, 15, 15, 15, 15],
		},
	},
	KatsuragikiriNagamasa: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12414,
		Weapon_Claymore_Bakufu: {
			param1: [0.06, 0.075, 0.09, 0.105, 0.12],
			param2: [3, 3, 3, 3, 3],
			param3: [3, 3.5, 4, 4.5, 5],
			param4: [6, 6, 6, 6, 6],
			param5: [10, 10, 10, 10, 10],
		},
	},
	MakhairaAquamarine: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12415,
		Weapon_Claymore_Pleroma: {
			param1: [10, 10, 10, 10, 10],
			param2: [0.24, 0.3, 0.36, 0.42, 0.48],
			param3: [12, 12, 12, 12, 12],
			param4: [0.3, 0.3, 0.3, 0.3, 0.3],
		},
	},
	Akuoumaru: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12416,
		Weapon_Claymore_Maria: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.4, 0.5, 0.6, 0.7, 0.8],
		},
	},
	ForestRegalia: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12417,
		Weapon_Claymore_Arakalari: {
			param1: [60, 75, 90, 105, 120],
			param2: [12, 12, 12, 12, 12],
			param3: [20, 20, 20, 20, 20],
			param4: [10, 10, 10, 10, 10],
		},
	},
	MailedFlower: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12418,
		Weapon_Claymore_Fleurfair: {
			param1: [8, 8, 8, 8, 8],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
			param3: [48, 60, 72, 84, 96],
		},
	},
	TalkingStick: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12424,
		Weapon_Claymore_BeastTamer: {
			param1: [12, 12, 12, 12, 12],
			param2: [12, 12, 12, 12, 12],
			param3: [15, 15, 15, 15, 15],
			param4: [15, 15, 15, 15, 15],
			param5: [0.16, 0.2, 0.24, 0.28, 0.32],
			param6: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	TidalShadow: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12425,
		Weapon_Claymore_Vorpal: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
			param2: [8, 8, 8, 8, 8],
		},
	},
	MegaMagicSword: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12426,
		Weapon_Claymore_Champion: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.02, 0.025, 0.03, 0.035, 0.04],
			param3: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	PortablePowerSaw: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12427,
		Weapon_Claymore_Mechanic: {
			param1: [30, 30, 30, 30, 30],
			param2: [10, 10, 10, 10, 10],
			param3: [15, 15, 15, 15, 15],
			param4: [2, 2.5, 3, 3.5, 4],
			param5: [40, 50, 60, 70, 80],
		},
	},
	FruitfulHook: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12430,
		Weapon_Claymore_Umpakati: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [10, 10, 10, 10, 10],
		},
	},
	Earthshaker: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12431,
		Weapon_Claymore_Isikhulu: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [8, 8, 8, 8, 8],
		},
	},
	FlameForgedInsight: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12432,
		Weapon_Claymore_Polilith: {
			param1: [12, 15, 18, 21, 24],
			param2: [60, 75, 90, 105, 120],
			param3: [15, 15, 15, 15, 15],
			param4: [15, 15, 15, 15, 15],
		},
	},
	master_key: {
		rarity: 4,
		weapon: "claymore",
		gameId: 12433,
		Weapon_Claymore_Ilmarinen: {
			param1: [60, 75, 90, 105, 120],
			param2: [12, 12, 12, 12, 12],
			param3: [60, 75, 90, 105, 120],
		},
	},
	SkywardPride: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12501,
		Weapon_Claymore_Legend_Dvalin: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
			param2: [0.8, 1, 1.2, 1.4, 1.6],
			param3: [20, 20, 20, 20, 20],
			param4: [8, 8, 8, 8, 8],
		},
	},
	WolfsGravestone: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12502,
		Weapon_Claymore_Legend_Wolfmound: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.4, 0.5, 0.6, 0.7, 0.8],
		},
	},
	SongofBrokenPines: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12503,
		Weapon_Claymore_Widsith: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [0.3, 0.3, 0.3, 0.3, 0.3],
			param3: [12, 12, 12, 12, 12],
			param4: [0.12, 0.15, 0.18, 0.21, 0.24],
			param5: [0.2, 0.25, 0.3, 0.35, 0.4],
			param6: [20, 20, 20, 20, 20],
		},
	},
	Unforged: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12504,
		Weapon_Claymore_Kunwu_DamageUpWithShield: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.04, 0.05, 0.06, 0.07, 0.08],
			param3: [8, 8, 8, 8, 8],
		},
	},
	RedhornStonethresher: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12510,
		Weapon_Claymore_Itadorimaru: {
			param1: [0.28, 0.35, 0.42, 0.49, 0.56],
			param2: [0.4, 0.5, 0.6, 0.7, 0.8],
			param3: [80000, 80000, 80000, 80000, 80000],
		},
	},
	BeaconOfTheReedSea: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12511,
		Weapon_Claymore_Deshret: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [8, 8, 8, 8, 8],
			param3: [0.2, 0.25, 0.3, 0.35, 0.4],
			param4: [8, 8, 8, 8, 8],
			param5: [0.32, 0.4, 0.48, 0.56, 0.64],
		},
	},
	Verdict: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12512,
		Weapon_Claymore_GoldenVerdict: {
			param1: [0.18, 0.225, 0.27, 0.315, 0.36],
			param2: [15, 15, 15, 15, 15],
		},
	},
	MountainKingsFang: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12513,
		Weapon_Claymore_EmeraldSword: {
			param1: [0.5, 0.5, 0.5, 0.5, 0.5],
			param2: [2, 2, 2, 2, 2],
			param3: [0.1, 0.125, 0.15, 0.175, 0.2],
			param4: [6, 6, 6, 6, 6],
			param5: [6, 6, 6, 6, 6],
		},
	},
	AThousandBlazingSuns: {
		rarity: 5,
		weapon: "claymore",
		gameId: 12514,
		Weapon_Claymore_RadianceSword: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.28, 0.35, 0.42, 0.49, 0.56],
			param3: [0.75, 0.75, 0.75, 0.75, 0.75],
			param4: [6, 6, 6, 6, 6],
			param5: [10, 10, 10, 10, 10],
			param6: [2, 2, 2, 2, 2],
			param7: [1, 1, 1, 1, 1],
			param8: [3, 3, 3, 3, 3],
		},
	},
	WhiteTassel: {
		rarity: 3,
		weapon: "polearm",
		gameId: 13301,
		Weapon_Pole_NormalAttackUp: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
		},
	},
	Halberd: {
		rarity: 3,
		weapon: "polearm",
		gameId: 13302,
		Weapon_Pole_ExtraDamageWhenCDReady: {
			param1: [1.6, 2, 2.4, 2.8, 3.2],
			param2: [10, 10, 10, 10, 10],
		},
	},
	BlackTassel: {
		rarity: 3,
		weapon: "polearm",
		gameId: 13303,
		Weapon_Pole_SlimeKiller: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
		},
	},
	DragonsBane: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13401,
		Weapon_Pole_DamageUpToWaterEnemy: {
			param1: [0.2, 0.24, 0.28, 0.32, 0.36],
		},
	},
	PrototypeStarglitter: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13402,
		Weapon_Pole_NormalAttackAndExtraAttackUpAfterSkill: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	CrescentPike: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13403,
		Weapon_Pole_NormalAttackExtraDamageWhenGetEnergyBall: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
		},
	},
	BlackcliffPole: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13404,
		Weapon_Pole_Blackrock: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [30, 30, 30, 30, 30],
		},
	},
	Deathmatch: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13405,
		Weapon_Pole_Dual: {
			param1: [2, 2, 2, 2, 2],
			param2: [0.24, 0.3, 0.36, 0.42, 0.48],
			param3: [0.16, 0.2, 0.24, 0.28, 0.32],
			param4: [0.16, 0.2, 0.24, 0.28, 0.32],
		},
	},
	LithicSpear: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13406,
		Weapon_Pole_Liyue: {
			param1: [0.07, 0.08, 0.09, 0.1, 0.11],
			param2: [0.03, 0.04, 0.05, 0.06, 0.07],
			param3: [4, 4, 4, 4, 4],
		},
	},
	FavoniusLance: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13407,
		Weapon_Pole_GenerateBallWhenCritic: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [12, 10.5, 9, 7.5, 6],
		},
	},
	RoyalSpear: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13408,
		Weapon_Pole_CritUpWhenHitNoCrit: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	DragonspineSpear: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13409,
		Weapon_Pole_Dragonfell: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [0.8, 0.95, 1.1, 1.25, 1.4],
			param3: [2, 2.4, 2.8, 3.2, 3.6],
			param4: [10, 10, 10, 10, 10],
		},
	},
	KitainCrossSpear: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13414,
		Weapon_Pole_Bakufu: {
			param1: [0.06, 0.075, 0.09, 0.105, 0.12],
			param2: [3, 3, 3, 3, 3],
			param3: [3, 3.5, 4, 4.5, 5],
			param4: [6, 6, 6, 6, 6],
			param5: [10, 10, 10, 10, 10],
		},
	},
	Catch: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13415,
		Weapon_Pole_Mori: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [0.06, 0.075, 0.09, 0.105, 0.12],
		},
	},
	WavebreakersFin: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13416,
		Weapon_Pole_Maria: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.4, 0.5, 0.6, 0.7, 0.8],
		},
	},
	Moonpiercer: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13417,
		Weapon_Pole_Arakalari: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [12, 12, 12, 12, 12],
			param3: [20, 20, 20, 20, 20],
			param4: [10, 10, 10, 10, 10],
		},
	},
	MissiveWindspear: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13419,
		Weapon_Pole_Windvane: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [48, 60, 72, 84, 96],
			param3: [10, 10, 10, 10, 10],
		},
	},
	BalladOfTheFjords: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13424,
		Weapon_Pole_Shanty: {
			param1: [120, 150, 180, 210, 240],
		},
	},
	RightfulReward: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13425,
		Weapon_Pole_Vorpal: {
			param1: [8, 10, 12, 14, 16],
			param2: [10, 10, 10, 10, 10],
		},
	},
	DialoguesOfTheDesertSages: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13426,
		Weapon_Pole_Caduceus: {
			param1: [8, 10, 12, 14, 16],
			param2: [10, 10, 10, 10, 10],
		},
	},
	ProspectorsDrill: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13427,
		Weapon_Pole_Mechanic: {
			param1: [30, 30, 30, 30, 30],
			param2: [10, 10, 10, 10, 10],
			param3: [15, 15, 15, 15, 15],
			param4: [0.03, 0.04, 0.05, 0.06, 0.07],
			param5: [0.07, 0.085, 0.1, 0.115, 0.13],
		},
	},
	MountainBracingBolt: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13430,
		Weapon_Pole_Umpakati: {
			param1: [0.15, 0.15, 0.15, 0.15, 0.15],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
			param3: [0.12, 0.15, 0.18, 0.21, 0.24],
			param4: [8, 8, 8, 8, 8],
		},
	},
	RainbowsTrail: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13431,
		Weapon_Pole_Isikhulu: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [15, 15, 15, 15, 15],
		},
	},
	BriefPavilionChatter: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13432,
		Weapon_Pole_Aoandon: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.1, 0.1, 0.1, 0.1, 0.1],
			param3: [10, 10, 10, 10, 10],
		},
	},
	prospectors_shovel: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13433,
		Weapon_Pole_Ilmarinen: {
			param1: [0.48, 0.6, 0.72, 0.84, 0.96],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
			param3: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	sacrificers_staff: {
		rarity: 4,
		weapon: "polearm",
		gameId: 13434,
		Weapon_Pole_Krivule: {
			param1: [6, 6, 6, 6, 6],
			param2: [0.08, 0.1, 0.12, 0.14, 0.16],
			param3: [0.06, 0.075, 0.09, 0.105, 0.12],
			param4: [3, 3, 3, 3, 3],
		},
	},
	StaffofHoma: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13501,
		Weapon_Pole_Homa: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.008, 0.01, 0.012, 0.014, 0.016],
			param3: [0.01, 0.012, 0.014, 0.016, 0.018],
		},
	},
	SkywardSpine: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13502,
		Weapon_Pole_Dvalin: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
			param2: [0.12, 0.12, 0.12, 0.12, 0.12],
			param3: [0.5, 0.5, 0.5, 0.5, 0.5],
			param4: [0.4, 0.55, 0.7, 0.85, 1],
			param5: [2, 2, 2, 2, 2],
		},
	},
	VortexVanquisher: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13504,
		Weapon_Pole_Kunwu_DamageUpWithShield: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.04, 0.05, 0.06, 0.07, 0.08],
			param3: [8, 8, 8, 8, 8],
		},
	},
	PrimordialJadeWingedSpear: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13505,
		Weapon_Pole_AttackUpAndSkillDamageUp: {
			param1: [0.032, 0.039, 0.046, 0.053, 0.06],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	CalamityQueller: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13507,
		Weapon_Pole_Santika: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [1, 1, 1, 1, 1],
			param3: [0.032, 0.04, 0.048, 0.056, 0.064],
			param4: [6, 6, 6, 6, 6],
			param5: [20, 20, 20, 20, 20],
		},
	},
	GrasscuttersLight: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13509,
		Weapon_Pole_Narukami: {
			param1: [0.28, 0.35, 0.42, 0.49, 0.56],
			param2: [0.8, 0.9, 1, 1.1, 1.2],
			param3: [0.3, 0.35, 0.4, 0.45, 0.5],
			param4: [12, 12, 12, 12, 12],
		},
	},
	StaffOfScarletSands: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13511,
		Weapon_Pole_Deshret: {
			param1: [0.52, 0.65, 0.78, 0.91, 1.04],
			param2: [0.28, 0.35, 0.42, 0.49, 0.56],
			param3: [10, 10, 10, 10, 10],
			param4: [0.3, 0.3, 0.3, 0.3, 0.3],
			param5: [3, 3, 3, 3, 3],
		},
	},
	CrimsonMoonsSemblance: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13512,
		Weapon_Pole_BloodMoon: {
			param1: [0.25, 0.25, 0.25, 0.25, 0.25],
			param2: [14, 14, 14, 14, 14],
			param3: [0.12, 0.16, 0.2, 0.24, 0.28],
			param4: [0.3, 0.3, 0.3, 0.3, 0.3],
			param5: [0.24, 0.32, 0.4, 0.48, 0.56],
		},
	},
	LumidouceElegy: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13513,
		Weapon_Pole_Muguet: {
			param1: [0.15, 0.19, 0.23, 0.27, 0.31],
			param2: [0.18, 0.23, 0.28, 0.33, 0.38],
			param3: [8, 8, 8, 8, 8],
			param4: [12, 13, 14, 15, 16],
			param5: [12, 12, 12, 12, 12],
		},
	},
	SymphonistofScents: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13514,
		Weapon_Pole_Trident: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
			param3: [0.32, 0.4, 0.48, 0.56, 0.64],
			param4: [3, 3, 3, 3, 3],
		},
	},
	FracturedHalo: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13515,
		Weapon_Pole_Perdix: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
			param2: [20, 20, 20, 20, 20],
			param3: [0.4, 0.5, 0.6, 0.7, 0.8],
			param4: [20, 20, 20, 20, 20],
		},
	},
	bloodsoaked_ruins: {
		rarity: 5,
		weapon: "polearm",
		gameId: 13516,
		Weapon_Pole_TummaLyhty: {
			param1: [3.5, 3.5, 3.5, 3.5, 3.5],
			param2: [0.36, 0.48, 0.6, 0.72, 0.84],
			param3: [6, 6, 6, 6, 6],
			param4: [0.28, 0.35, 0.42, 0.49, 0.56],
			param5: [12, 13, 14, 15, 16],
			param6: [14, 14, 14, 14, 14],
		},
	},
	MagicGuide: {
		rarity: 3,
		weapon: "catalyst",
		gameId: 14301,
		Weapon_Catalyst_DamageUpToEnemy: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	ThrillingTalesofDragonSlayers: {
		rarity: 3,
		weapon: "catalyst",
		gameId: 14302,
		Weapon_Catalyst_OnChangeAttackUp: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
			param2: [10, 10, 10, 10, 10],
			param3: [20, 20, 20, 20, 20],
		},
	},
	OtherworldlyStory: {
		rarity: 3,
		weapon: "catalyst",
		gameId: 14303,
		Weapon_Catalyst_OnGainEnergyHealHP: {
			param1: [0.01, 0.0125, 0.015, 0.0175, 0.02],
		},
	},
	EmeraldOrb: {
		rarity: 3,
		weapon: "catalyst",
		gameId: 14304,
		Weapon_Catalyst_AttacktUpAfterReaction: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
		},
	},
	TwinNephrite: {
		rarity: 3,
		weapon: "catalyst",
		gameId: 14305,
		Weapon_Catalyst_SpeedUponEnemeyKilled: {
			param1: [0.12, 0.14, 0.16, 0.18, 0.2],
			param2: [15, 15, 15, 15, 15],
		},
	},
	FavoniusCodex: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14401,
		Weapon_Catalyst_GenerateBallWhenCritic: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [12, 10.5, 9, 7.5, 6],
		},
	},
	Widsith: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14402,
		Weapon_Catalyst_RandomBuff: {
			param1: [0.6, 0.75, 0.9, 1.05, 1.2],
			param2: [0.48, 0.6, 0.72, 0.84, 0.96],
			param3: [240, 300, 360, 420, 480],
			param4: [10, 10, 10, 10, 10],
			param5: [30, 30, 30, 30, 30],
		},
	},
	SacrificialFragments: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14403,
		Weapon_Catalyst_ResetCDWhenSkillHit: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [30, 26, 22, 19, 16],
		},
	},
	RoyalGrimoire: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14404,
		Weapon_Catalyst_CritUpWhenHitNoCrit: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	SolarPearl: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14405,
		Weapon_Catalyst_NormalAttackAndSkillAttack: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
		},
	},
	PrototypeAmber: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14406,
		Weapon_Catalyst_TeamHealAfterElementalBurst: {
			param1: [6, 6, 6, 6, 6],
			param2: [2, 2, 2, 2, 2],
			param3: [4, 4.5, 5, 5.5, 6],
			param4: [0.04, 0.045, 0.05, 0.055, 0.06],
		},
	},
	MappaMare: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14407,
		Weapon_Catalyst_ElementUpAfterReaction: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	BlackcliffAgate: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14408,
		Weapon_Catalyst_Blackrock: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [30, 30, 30, 30, 30],
		},
	},
	EyeofPerception: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14409,
		Weapon_Catalyst_BouncingBall: {
			param1: [0.5, 0.5, 0.5, 0.5, 0.5],
			param2: [4, 4, 4, 4, 4],
			param3: [2.4, 2.7, 3, 3.3, 3.6],
			param4: [12, 11, 10, 9, 8],
		},
	},
	WineandSong: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14410,
		Weapon_Catalyst_Outlaw: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [5, 5, 5, 5, 5],
			param3: [0.14, 0.16, 0.18, 0.2, 0.22],
			param4: [5, 5, 5, 5, 5],
		},
	},
	Frostbearer: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14412,
		Weapon_Catalyst_Dragonfell: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [0.8, 0.95, 1.1, 1.25, 1.4],
			param3: [2, 2.4, 2.8, 3.2, 3.6],
			param4: [10, 10, 10, 10, 10],
		},
	},
	DodocoTales: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14413,
		Weapon_Catalyst_NormalAttackAndExtraAttack: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [6, 6, 6, 6, 6],
			param3: [0.08, 0.1, 0.12, 0.14, 0.16],
			param4: [6, 6, 6, 6, 6],
		},
	},
	HakushinRing: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14414,
		Weapon_Catalyst_Bakufu: {
			param1: [0.1, 0.125, 0.15, 0.175, 0.2],
			param2: [6, 6, 6, 6, 6],
			param3: [1, 1, 1, 1, 1],
		},
	},
	OathswornEye: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14415,
		Weapon_Catalyst_Jyanome: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
			param2: [10, 10, 10, 10, 10],
		},
	},
	WanderingEvenstar: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14416,
		Weapon_Catalyst_Pleroma: {
			param1: [10, 10, 10, 10, 10],
			param2: [0.24, 0.3, 0.36, 0.42, 0.48],
			param3: [12, 12, 12, 12, 12],
			param4: [0.3, 0.3, 0.3, 0.3, 0.3],
		},
	},
	FruitOfFulfillment: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14417,
		Weapon_Catalyst_Arakalari: {
			param1: [-0.05, -0.05, -0.05, -0.05, -0.05],
			param2: [24, 27, 30, 33, 36],
			param3: [0.3, 0.3, 0.3, 0.3, 0.3],
			param4: [6, 6, 6, 6, 6],
		},
	},
	SacrificialJade: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14424,
		Weapon_Catalyst_Yue: {
			param1: [10, 10, 10, 10, 10],
			param2: [5, 5, 5, 5, 5],
			param3: [0.32, 0.4, 0.48, 0.56, 0.64],
			param4: [40, 50, 60, 70, 80],
		},
	},
	FlowingPurity: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14425,
		Weapon_Catalyst_Vorpal: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
			param2: [15, 15, 15, 15, 15],
			param3: [0.24, 0.24, 0.24, 0.24, 0.24],
			param4: [0.02, 0.025, 0.03, 0.035, 0.04],
			param5: [0.12, 0.15, 0.18, 0.21, 0.24],
			param6: [15, 15, 15, 15, 15],
			param7: [10, 10, 10, 10, 10],
		},
	},
	BalladoftheBoundlessBlue: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14426,
		Weapon_Catalyst_DandelionPoem: {
			param1: [6, 6, 6, 6, 6],
			param2: [0.3, 0.3, 0.3, 0.3, 0.3],
			param3: [0.08, 0.1, 0.12, 0.14, 0.16],
			param4: [0.06, 0.075, 0.09, 0.105, 0.12],
		},
	},
	AshGravenDrinkingHorn: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14427,
		Weapon_Catalyst_ConchSprayer: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [15, 15, 15, 15, 15],
		},
	},
	WaveridingWhirl: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14430,
		Weapon_Catalyst_Umpakati: {
			param1: [0.15, 0.15, 0.15, 0.15, 0.15],
			param2: [0.2, 0.25, 0.3, 0.35, 0.4],
			param3: [10, 10, 10, 10, 10],
			param4: [15, 15, 15, 15, 15],
			param5: [0.12, 0.15, 0.18, 0.21, 0.24],
			param6: [2, 2, 2, 2, 2],
		},
	},
	RingOfCeiba: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14431,
		Weapon_Catalyst_Isikhulu: {
			param1: [0.006, 0.007, 0.008, 0.009, 0.01],
			param2: [0.16, 0.2, 0.24, 0.28, 0.32],
			param3: [10, 10, 10, 10, 10],
		},
	},
	etherlight_spindlelute: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14432,
		Weapon_Catalyst_SeeliesLute: {
			param1: [100, 125, 150, 175, 200],
			param2: [20, 20, 20, 20, 20],
		},
	},
	blackmarrow_lantern: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14433,
		Weapon_Catalyst_Ilmarinen: {
			param1: [0.48, 0.6, 0.72, 0.84, 0.96],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
			param3: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	dawning_frost: {
		rarity: 4,
		weapon: "catalyst",
		gameId: 14434,
		Weapon_Catalyst_Ziedas: {
			param1: [72, 90, 108, 126, 144],
			param2: [10, 10, 10, 10, 10],
			param3: [48, 60, 72, 84, 96],
			param4: [10, 10, 10, 10, 10],
		},
	},
	SkywardAtlas: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14501,
		Weapon_Catalyst_Legend_Dvalin: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.5, 0.5, 0.5, 0.5, 0.5],
			param3: [1.6, 2, 2.4, 2.8, 3.2],
			param4: [30, 30, 30, 30, 30],
		},
	},
	LostPrayer: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14502,
		Weapon_Catalyst_Legend_Fourwinds: {
			param1: [0.1, 0.1, 0.1, 0.1, 0.1],
			param2: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	MemoryofDust: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14504,
		Weapon_Catalyst_Kunwu_DamageUpWithShield: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.04, 0.05, 0.06, 0.07, 0.08],
			param3: [8, 8, 8, 8, 8],
		},
	},
	JadefallsSplendor: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14505,
		Weapon_Catalyst_Morax: {
			param1: [0.003, 0.005, 0.007, 0.009, 0.011],
			param2: [0.12, 0.2, 0.28, 0.36, 0.44],
			param3: [3, 3, 3, 3, 3],
			param4: [2.5, 2.5, 2.5, 2.5, 2.5],
			param5: [4.5, 5, 5.5, 6, 6.5],
		},
	},
	EverlastingMoonglow: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14506,
		Weapon_Catalyst_Kaleido: {
			param1: [0.1, 0.125, 0.15, 0.175, 0.2],
			param2: [0.01, 0.015, 0.02, 0.025, 0.03],
			param3: [12, 12, 12, 12, 12],
			param4: [0.6, 0.6, 0.6, 0.6, 0.6],
			param5: [0.1, 0.1, 0.1, 0.1, 0.1],
		},
	},
	KagurasVerity: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14509,
		Weapon_Catalyst_Narukami: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [16, 16, 16, 16, 16],
			param3: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	ThousandFloatingDreams: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14511,
		Weapon_Catalyst_Ayus: {
			param1: [32, 40, 48, 56, 64],
			param2: [0.1, 0.14, 0.18, 0.22, 0.26],
			param3: [40, 42, 44, 46, 48],
		},
	},
	TulaytullahsRemembrance: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14512,
		Weapon_Catalyst_Alaya: {
			param1: [0.1, 0.125, 0.15, 0.175, 0.2],
			param2: [0.048, 0.06, 0.072, 0.084, 0.096],
			param3: [14, 14, 14, 14, 14],
			param4: [1, 1, 1, 1, 1],
			param5: [2, 2, 2, 2, 2],
			param6: [0.3, 0.3, 0.3, 0.3, 0.3],
			param7: [10, 10, 10, 10, 10],
		},
	},
	CashflowSupervision: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14513,
		Weapon_Catalyst_Wheatley: {
			param1: [4, 4, 4, 4, 4],
			param2: [0.3, 0.3, 0.3, 0.3, 0.3],
			param3: [0.16, 0.2, 0.24, 0.28, 0.32],
			param4: [0.14, 0.175, 0.21, 0.245, 0.28],
			param5: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	TomeoftheEternalFlow: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14514,
		Weapon_Catalyst_Iudex: {
			param1: [4, 4, 4, 4, 4],
			param2: [0.3, 0.3, 0.3, 0.3, 0.3],
			param3: [0.14, 0.18, 0.22, 0.26, 0.3],
			param4: [8, 9, 10, 11, 12],
			param5: [12, 12, 12, 12, 12],
		},
	},
	CranesEchoingCall: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14515,
		Weapon_Catalyst_MountainGale: {
			param1: [2.5, 2.75, 3, 3.25, 3.5],
			param2: [0.7, 0.7, 0.7, 0.7, 0.7],
			param3: [0.28, 0.41, 0.54, 0.67, 0.8],
			param4: [20, 20, 20, 20, 20],
		},
	},
	SurfingTime: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14516,
		Weapon_Catalyst_MechaPufferfish: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [15, 15, 15, 15, 15],
			param3: [14, 14, 14, 14, 14],
			param4: [4, 4, 4, 4, 4],
			param5: [0.12, 0.15, 0.18, 0.21, 0.24],
			param6: [1.5, 1.5, 1.5, 1.5, 1.5],
			param7: [1, 1, 1, 1, 1],
			param8: [1.5, 1.5, 1.5, 1.5, 1.5],
		},
	},
	StarcallersWatch: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14517,
		Weapon_Catalyst_Figurines: {
			param1: [0.28, 0.35, 0.42, 0.49, 0.56],
			param2: [15, 15, 15, 15, 15],
			param3: [14, 14, 14, 14, 14],
		},
	},
	MorningHibernation: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14518,
		Weapon_Catalyst_SakuraFan: {
			param1: [120, 150, 180, 210, 240],
			param2: [96, 120, 144, 168, 192],
			param3: [32, 40, 48, 56, 64],
			param4: [6, 6, 6, 6, 6],
			param5: [9, 9, 9, 9, 9],
			param6: [30, 30, 30, 30, 30],
		},
	},
	VividNotions: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14519,
		Weapon_Catalyst_VaresaTransformer: {
			param1: [0.28, 0.35, 0.42, 0.49, 0.56],
			param2: [15, 15, 15, 15, 15],
			param3: [0.28, 0.35, 0.42, 0.49, 0.56],
			param4: [0.4, 0.5, 0.6, 0.7, 0.8],
		},
	},
	nightweavers_looking_glass: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14520,
		Weapon_Catalyst_MenulisRing: {
			param1: [60, 75, 90, 105, 120],
			param2: [10, 10, 10, 10, 10],
			param3: [60, 75, 90, 105, 120],
			param4: [4.5, 4.5, 4.5, 4.5, 4.5],
			param5: [1.2, 1.5, 1.8, 2.1, 2.4],
			param6: [0.8, 1, 1.2, 1.4, 1.6],
			param7: [0.4, 0.5, 0.6, 0.7, 0.8],
		},
	},
	reliquary_of_truth: {
		rarity: 5,
		weapon: "catalyst",
		gameId: 14521,
		Weapon_Catalyst_Sistrum: {
			param1: [80, 100, 120, 140, 160],
			param2: [0.24, 0.3, 0.36, 0.42, 0.48],
			param3: [12, 12, 12, 12, 12],
			param4: [4, 4, 4, 4, 4],
			param5: [0.5, 0.5, 0.5, 0.5, 0.5],
			param6: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	RavenBow: {
		rarity: 3,
		weapon: "bow",
		gameId: 15301,
		Weapon_Bow_DamageUpToEnemy: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
		},
	},
	SharpshootersOath: {
		rarity: 3,
		weapon: "bow",
		gameId: 15302,
		Weapon_Bow_DamageUpHitHeadBox: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
		},
	},
	RecurveBow: {
		rarity: 3,
		weapon: "bow",
		gameId: 15303,
		Weapon_Bow_HealAmountHPonEnemyKilled: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	Slingshot: {
		rarity: 3,
		weapon: "bow",
		gameId: 15304,
		Weapon_Bow_RiseDMGWithinTime: {
			param1: [0.3, 0.3, 0.3, 0.3, 0.3],
			param2: [0.36, 0.42, 0.48, 0.54, 0.6],
			param3: [0.1, 0.1, 0.1, 0.1, 0.1],
		},
	},
	Messenger: {
		rarity: 3,
		weapon: "bow",
		gameId: 15305,
		Weapon_Bow_HeavyCritical: {
			param1: [1, 1.25, 1.5, 1.75, 2],
		},
	},
	FavoniusWarbow: {
		rarity: 4,
		weapon: "bow",
		gameId: 15401,
		Weapon_Bow_GenerateBallWhenCritic: {
			param1: [0.6, 0.7, 0.8, 0.9, 1],
			param2: [12, 10.5, 9, 7.5, 6],
		},
	},
	Stringless: {
		rarity: 4,
		weapon: "bow",
		gameId: 15402,
		Weapon_Bow_RiseElementalSkillDMG: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
		},
	},
	SacrificialBow: {
		rarity: 4,
		weapon: "bow",
		gameId: 15403,
		Weapon_Bow_ResetCDWhenSkillHit: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [30, 26, 22, 19, 16],
		},
	},
	RoyalBow: {
		rarity: 4,
		weapon: "bow",
		gameId: 15404,
		Weapon_Bow_CritUpWhenHitNoCrit: {
			param1: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	Rust: {
		rarity: 4,
		weapon: "bow",
		gameId: 15405,
		Weapon_Bow_RiseNormalFallExtra: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [0.1, 0.1, 0.1, 0.1, 0.1],
		},
	},
	PrototypeCrescent: {
		rarity: 4,
		weapon: "bow",
		gameId: 15406,
		Weapon_Bow_AttackGainSPDAKTBuff: {
			param1: [0.1, 0.1, 0.1, 0.1, 0.1],
			param2: [0.36, 0.45, 0.54, 0.63, 0.72],
			param3: [10, 10, 10, 10, 10],
		},
	},
	CompoundBow: {
		rarity: 4,
		weapon: "bow",
		gameId: 15407,
		Weapon_Bow_AttackGainAKTSPDBuff: {
			param1: [0.04, 0.05, 0.06, 0.07, 0.08],
			param2: [0.012, 0.015, 0.018, 0.021, 0.024],
			param3: [0.3, 0.3, 0.3, 0.3, 0.3],
		},
	},
	BlackcliffWarbow: {
		rarity: 4,
		weapon: "bow",
		gameId: 15408,
		Weapon_Bow_Blackrock: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [30, 30, 30, 30, 30],
		},
	},
	ViridescentHunt: {
		rarity: 4,
		weapon: "bow",
		gameId: 15409,
		Weapon_Bow_AttractField: {
			param1: [0.5, 0.5, 0.5, 0.5, 0.5],
			param2: [0.4, 0.5, 0.6, 0.7, 0.8],
			param3: [0.5, 0.5, 0.5, 0.5, 0.5],
			param4: [4, 4, 4, 4, 4],
			param5: [14, 13, 12, 11, 10],
		},
	},
	AlleyHunter: {
		rarity: 4,
		weapon: "bow",
		gameId: 15410,
		Weapon_Bow_Outlaw: {
			param1: [0.02, 0.025, 0.03, 0.035, 0.04],
			param2: [4, 4, 4, 4, 4],
		},
	},
	FadingTwilight: {
		rarity: 4,
		weapon: "bow",
		gameId: 15411,
		Weapon_Bow_FallenSun: {
			param1: [7, 7, 7, 7, 7],
			param2: [0.06, 0.075, 0.09, 0.105, 0.12],
			param3: [0.1, 0.125, 0.15, 0.175, 0.2],
			param4: [0.14, 0.175, 0.21, 0.245, 0.28],
		},
	},
	MitternachtsWaltz: {
		rarity: 4,
		weapon: "bow",
		gameId: 15412,
		Weapon_Bow_NormalAttackAndElementalArt: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [5, 5, 5, 5, 5],
			param3: [0.2, 0.25, 0.3, 0.35, 0.4],
			param4: [5, 5, 5, 5, 5],
		},
	},
	WindblumeOde: {
		rarity: 4,
		weapon: "bow",
		gameId: 15413,
		Weapon_Bow_Fleurfair: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [6, 6, 6, 6, 6],
		},
	},
	Hamayumi: {
		rarity: 4,
		weapon: "bow",
		gameId: 15414,
		Weapon_Bow_Bakufu: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
			param3: [1, 1, 1, 1, 1],
		},
	},
	Predator: {
		rarity: 4,
		weapon: "bow",
		gameId: 15415,
		Weapon_Bow_Predator: {
			param1: [0.1],
			param2: [6],
			param3: [66],
		},
	},
	MouunsMoon: {
		rarity: 4,
		weapon: "bow",
		gameId: 15416,
		Weapon_Bow_Maria: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.4, 0.5, 0.6, 0.7, 0.8],
		},
	},
	KingsSquire: {
		rarity: 4,
		weapon: "bow",
		gameId: 15417,
		Weapon_Bow_Arakalari: {
			param1: [60, 80, 100, 120, 140],
			param2: [12, 12, 12, 12, 12],
			param3: [1, 1.2, 1.4, 1.6, 1.8],
			param4: [20, 20, 20, 20, 20],
		},
	},
	EndOfTheLine: {
		rarity: 4,
		weapon: "bow",
		gameId: 15418,
		Weapon_Bow_Fin: {
			param1: [0.8, 1, 1.2, 1.4, 1.6],
			param2: [15, 15, 15, 15, 15],
			param3: [3, 3, 3, 3, 3],
			param4: [2, 2, 2, 2, 2],
			param5: [12, 12, 12, 12, 12],
		},
	},
	IbisPiercer: {
		rarity: 4,
		weapon: "bow",
		gameId: 15419,
		Weapon_Bow_Ibis: {
			param1: [40, 50, 60, 70, 80],
			param2: [6, 6, 6, 6, 6],
			param3: [2, 2, 2, 2, 2],
			param4: [0.5, 0.5, 0.5, 0.5, 0.5],
		},
	},
	ScionOfTheBlazingSun: {
		rarity: 4,
		weapon: "bow",
		gameId: 15424,
		Weapon_Bow_Gurabad: {
			param1: [10, 10, 10, 10, 10],
			param2: [0.6, 0.75, 0.9, 1.05, 1.2],
			param3: [10, 10, 10, 10, 10],
			param4: [0.28, 0.35, 0.42, 0.49, 0.56],
		},
	},
	SongOfStillness: {
		rarity: 4,
		weapon: "bow",
		gameId: 15425,
		Weapon_Bow_Vorpal: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [8, 8, 8, 8, 8],
		},
	},
	Cloudforged: {
		rarity: 4,
		weapon: "bow",
		gameId: 15426,
		Weapon_Bow_Ultimatum: {
			param1: [40, 50, 60, 70, 80],
			param2: [18, 18, 18, 18, 18],
		},
	},
	RangeGauge: {
		rarity: 4,
		weapon: "bow",
		gameId: 15427,
		Weapon_Bow_Mechanic: {
			param1: [30, 30, 30, 30, 30],
			param2: [10, 10, 10, 10, 10],
			param3: [15, 15, 15, 15, 15],
			param4: [0.03, 0.04, 0.05, 0.06, 0.07],
			param5: [0.07, 0.085, 0.1, 0.115, 0.13],
		},
	},
	FlowerWreathedFeathers: {
		rarity: 4,
		weapon: "bow",
		gameId: 15430,
		Weapon_Bow_Umpakati: {
			param1: [0.15, 0.15, 0.15, 0.15, 0.15],
			param2: [0.5, 0.5, 0.5, 0.5, 0.5],
			param3: [0.06, 0.075, 0.09, 0.105, 0.12],
			param4: [6, 6, 6, 6, 6],
			param5: [10, 10, 10, 10, 10],
		},
	},
	ShatteredChains: {
		rarity: 4,
		weapon: "bow",
		gameId: 15431,
		Weapon_Bow_Isikhulu: {
			param1: [0.048, 0.06, 0.072, 0.084, 0.096],
			param2: [24, 30, 36, 42, 48],
		},
	},
	SequenceofSolitude: {
		rarity: 4,
		weapon: "bow",
		gameId: 15432,
		Weapon_Bow_Stinger: {
			param1: [0.4, 0.5, 0.6, 0.7, 0.8],
			param2: [15, 15, 15, 15, 15],
		},
	},
	snare_hook: {
		rarity: 4,
		weapon: "bow",
		gameId: 15433,
		Weapon_Bow_Ilmarinen: {
			param1: [60, 75, 90, 105, 120],
			param2: [12, 12, 12, 12, 12],
			param3: [60, 75, 90, 105, 120],
		},
	},
	SkywardHarp: {
		rarity: 5,
		weapon: "bow",
		gameId: 15501,
		Weapon_Bow_RangeAttackOnAttackLanded: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.6, 0.7, 0.8, 0.9, 1],
			param3: [1.25, 1.25, 1.25, 1.25, 1.25],
			param4: [4, 3.5, 3, 2.5, 2],
		},
	},
	AmosBow: {
		rarity: 5,
		weapon: "bow",
		gameId: 15502,
		Weapon_Bow_RiseDMGWithTime: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.08, 0.1, 0.12, 0.14, 0.16],
		},
	},
	ElegyfortheEnd: {
		rarity: 5,
		weapon: "bow",
		gameId: 15503,
		Weapon_Bow_Widsith: {
			param1: [60, 75, 90, 105, 120],
			param2: [0.2, 0.2, 0.2, 0.2, 0.2],
			param3: [12, 12, 12, 12, 12],
			param4: [100, 125, 150, 175, 200],
			param5: [0.2, 0.25, 0.3, 0.35, 0.4],
			param6: [20, 20, 20, 20, 20],
		},
	},
	PolarStar: {
		rarity: 5,
		weapon: "bow",
		gameId: 15507,
		Weapon_Bow_Worldbane: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [12, 12, 12, 12, 12],
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
		Weapon_Bow_Kirin: {
			param1: [0.16, 0.2, 0.24, 0.28, 0.32],
			param2: [0.2, 0.25, 0.3, 0.35, 0.4],
			param3: [0.5, 0.5, 0.5, 0.5, 0.5],
			param4: [1.2, 1.2, 1.2, 1.2, 1.2],
		},
	},
	ThunderingPulse: {
		rarity: 5,
		weapon: "bow",
		gameId: 15509,
		Weapon_Bow_Narukami: {
			param1: [0.2, 0.25, 0.3, 0.35, 0.4],
			param2: [0.12, 0.15, 0.18, 0.21, 0.24],
			param3: [0.24, 0.3, 0.36, 0.42, 0.48],
			param4: [0.4, 0.5, 0.6, 0.7, 0.8],
			param5: [5, 5, 5, 5, 5],
			param6: [10, 10, 10, 10, 10],
		},
	},
	HuntersPath: {
		rarity: 5,
		weapon: "bow",
		gameId: 15511,
		Weapon_Bow_Ayus: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [1.6, 2, 2.4, 2.8, 3.2],
			param3: [12, 12, 12, 12, 12],
			param4: [10, 10, 10, 10, 10],
			param5: [12, 12, 12, 12, 12],
		},
	},
	TheFirstGreatMagic: {
		rarity: 5,
		weapon: "bow",
		gameId: 15512,
		Weapon_Bow_Pledge: {
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
		Weapon_Bow_Arcdange: {
			param1: [0.12, 0.15, 0.18, 0.21, 0.24],
			param2: [0.24, 0.3, 0.36, 0.42, 0.48],
			param3: [0.4, 0.5, 0.6, 0.7, 0.8],
			param4: [25, 25, 25, 25, 25],
			param5: [25, 25, 25, 25, 25],
			param6: [20, 20, 20, 20, 20],
			param7: [0.28, 0.35, 0.42, 0.49, 0.56],
			param8: [4, 4, 4, 4, 4],
		},
	},
	AstralVulturesCrimsonPlumage: {
		rarity: 5,
		weapon: "bow",
		gameId: 15514,
		Weapon_Bow_Qoyllorsnova: {
			param1: [0.24, 0.3, 0.36, 0.42, 0.48],
			param2: [12, 12, 12, 12, 12],
			param3: [0.2, 0.25, 0.3, 0.35, 0.4],
			param4: [0.48, 0.6, 0.72, 0.84, 0.96],
			param5: [0.1, 0.125, 0.15, 0.175, 0.2],
			param6: [0.24, 0.3, 0.36, 0.42, 0.48],
		},
	},
};
