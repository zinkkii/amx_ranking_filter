function createData(
  name,
  racing,
  finishedraces,
  wins,
  poles,
  country,
  game,
  tier,
  region,
  period
) {
  const player = country + " " + name;
  const date = new Date();
  return {
    name,
    player,
    racing,
    finishedraces,
    wins,
    poles,
    country,
    game,
    tier,
    region,
    period,
  };
}

const rows = [
  createData(
    "nameAA11",
    1111,
    111,
    99,
    999,
    "🏁",
    "iracing",
    "AMX Zero",
    "Global",
    "09/09/2022"
  ),
  createData("nameBB", 1112, 112, 98, 998, "🏁", "iracing", "AMX 10", "NA"),
  createData(
    "nameCC11",
    1113,
    113,
    97,
    997,
    "🏁",
    "Assetto Corsa",
    "AMX Zero",
    "EUW",
    "09/09/2022"
  ),
  createData(
    "nameDD22",
    1114,
    114,
    96,
    996,
    "🏁",
    "Asssetto Corsa Competizione",
    "AMX 10",
    "EUNE"
  ),
  createData(
    "nameEE11",
    1115,
    115,
    95,
    995,
    "🏁",
    "Automobilista2",
    "AMX Zero",
    "KR"
  ),
  createData(
    "nameFF22",
    1116,
    116,
    94,
    994,
    "🎌",
    "Gran Turismo",
    "AMX 10",
    "JP"
  ),
  createData("nameGG", 1117, 117, 93, 993, "🎌", "iracing", "AMX Zero", "AUS"),
  createData(
    "nameHH11",
    1118,
    118,
    92,
    992,
    "🎌",
    "Gran Turismo",
    "AMX 10",
    "Global"
  ),
  createData(
    "nameII22",
    1119,
    119,
    91,
    991,
    "🏳️‍🌈",
    "Automobilista2",
    "AMX Zero",
    "Global"
  ),
  createData(
    "nameJJ11",
    1120,
    120,
    90,
    990,
    "🏳️‍🌈",
    "Asssetto Corsa Competizione",
    "AMX 10",
    "Global"
  ),
  createData(
    "nameKK22",
    1121,
    121,
    89,
    989,
    "🏴‍☠️",
    "Gran Turismo",
    "AMX Zero",
    "EUW"
  ),
  createData(
    "nameLL33",
    1122,
    122,
    88,
    988,
    "🏴‍☠️",
    "Automobilista2",
    "AMX 10",
    "EUNE"
  ),
  createData(
    "nameMM33",
    1123,
    123,
    87,
    987,
    "🏳️‍🌈",
    "Asssetto Corsa Competizione",
    "AMX Zero",
    "NA"
  ),
  createData(
    "nameNN33",
    1124,
    124,
    86,
    986,
    "🏳️‍🌈",
    "Automobilista2",
    "AMX 10",
    "NA"
  ),
  createData("nameOO", 1125, 125, 85, 985, "🏳️‍🌈", "iracing", "AMX Zero", "EUW"),
  createData(
    "namePP44",
    1126,
    126,
    84,
    984,
    "🏳️‍🌈",
    "Gran Turismo",
    "AMX 10",
    "EUW"
  ),
  createData(
    "nameQQ44",
    1127,
    127,
    83,
    983,
    "🏳️‍🌈",
    "Automobilista2",
    "AMX Zero",
    "EUNE"
  ),
  createData(
    "nameRR44",
    1128,
    128,
    82,
    982,
    "🏴‍☠️",
    "Assetto Corsa",
    "AMX 10",
    "KR"
  ),
  createData("nameSS", 1129, 129, 81, 981, "🏴‍☠️", "iracing", "AMX Zero", "KR"),
  createData(
    "nameTT55",
    1130,
    130,
    80,
    980,
    "🏴‍☠️",
    "Automobilista2",
    "AMX 10",
    "AUS"
  ),
  createData(
    "nameUU55",
    1131,
    131,
    79,
    979,
    "🏴‍☠️",
    "Gran Turismo",
    "AMX Zero",
    "AUS"
  ),
  createData(
    "nameVV55",
    1132,
    132,
    78,
    978,
    "🏴‍☠️",
    "Asssetto Corsa Competizione",
    "AMX 10",
    "NA"
  ),
  createData(
    "nameWW666",
    1133,
    133,
    77,
    977,
    "🏴‍☠️",
    "Assetto Corsa",
    "AMX Zero",
    "KR"
  ),
  createData(
    "nameXX66",
    1134,
    134,
    76,
    976,
    "🏴‍☠️",
    "Automobilista2",
    "AMX 10",
    "JP"
  ),
  createData("nameYY", 1135, 135, 75, 975, "🏴‍☠️", "iracing", "AMX Zero", "JP"),
  createData(
    "nameZZ6666",
    1136,
    136,
    74,
    974,
    "🏴‍☠️",
    "Assetto Corsa",
    "AMX 10",
    "KR"
  ),
];

export default rows;
