
const cap = (word, capRule = true) => capRule && word.charAt(0).toUpperCase() + word.slice(1) || word

const maybeCap = (word) => (Math.floor(Math.random() * 2)) && (word.charAt(0).toUpperCase() + word.slice(1)) || word
const random = (words) => words[Math.floor(Math.random() * words.length)]

const maybe = (word, chance = 2) => (Math.floor(Math.random() * chance)) && word || ""

module.exports = {
  addons: require('./lists/addons'),
  adjectives: require('./lists/adjectives'),
  concepts: require('./lists/concepts'),
  descriptions: require('./lists/descriptions'),
  gametypes: require('./lists/gametypes'),
  locations: require('./lists/locations'),
  nouns: require('./lists/nouns'),
  superlatives: require('./lists/superlatives'),
  verbs: require('./lists/verbs'),
  collections: require('./lists/collections'),
  objects: require('./lists/objects'),
  predicates: require('./lists/predicates'),
  teams: require('./lists/teams'),

  randomTeamName: () => {
    const adjective = maybe(cap(random(adjectives)) + " ") || ""
    const before = !adjective && maybe(cap(random(superlatives) + " ")) || ""
    const after = !before && !adjective && " of the " + cap(random(locations)) || ""
    const team = cap(random(teams))

    return before + adjective + team + after
  },
  randomUserName: () => {
    const caprule = !!Math.floor(Math.random() * 4);

    const adjective = (random(adjectives))
    const description = (random(descriptions))
    const predicate = (random(predicates))
    const spacing = (maybe(random([".", "_", "-"]), 2)) || ""
    const before = cap(random([adjective, description, predicate]), caprule) + spacing

    const concept = (random(concepts))
    const object = (random(objects))
    const noun = (random(nouns.map(noun => noun[0])))
    const number = !spacing && maybe(Math.floor(Math.random() * 999), 1.35) || ""
    const name = cap(random([concept, noun, object]), caprule) + number

    return (before + name).replace(" ", spacing)
  },
  randomTeamDescription: (team) => {

    const general = `"${cap(team)}" is an e-sports team that ${random(verbs.secondConcepts)} ${random(concepts)}, ${random(verbs.secondConcepts)} ${random(concepts)} and ${random(verbs.secondPerson)} ${random(nouns.map((noun) => noun[1]))}.`
    const location = `They play in ${random(locations)}.`
    const memberVariantion1 = `It's members are known to be ${random([random(adjectives), random(descriptions)])} and ${random([random(adjectives), random(descriptions)])}.`
    const memberVariantion2 = `Team members are expirieinced in ${random([random(adjectives), random(descriptions)])} ${random(gametypes)} games.`

    const members = random([memberVariantion1, memberVariantion2])
    const pre = random([`No ${random(concepts)}`, `As a team "${cap(team)}" believes that ${random(descriptions)} ${random(concepts)} ${random(verbs.thirdPerson)}`])
    return general + maybe(" " + location) + " " + members + " " + pre + random(addons)
  },
  randomTournament: () => {
    const location = cap(random(locations));
    const collection = cap(random(collections))
    const concept = cap(random(concepts))
    const team = cap(random(teams))
    const gametype = cap(random(gametypes))
    const locationBased = location + " " + team
    const gametypeBased = gametype + " " + concept
    const collectionBased = gametype + " " + collection
    return random([locationBased, gametypeBased, collectionBased])
  }

};
