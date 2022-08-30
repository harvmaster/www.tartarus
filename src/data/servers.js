export const generateMockServers = () => {
  const servers = []
  for (let i = 0; i < 20; i++) {
    const server = {
      name: generateUsername(),
      channels: [],
      imgURL: 'data:image/png;base64,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',
      unread: Math.random() > 0.3
    }

    for (let i = 0; i < 20; i++) {
      server.channels.push({
        name: generateUsername(),
      })
    }

    servers.push(server)
  }
  console.log(servers)
  return servers

}

export const generateUsername = () => {
  const insult = Math.floor(Math.random() * insults.length)
  const job = Math.floor(Math.random() * jobs.length)
  const name = insults[insult] + ''  + jobs[job]
  return name
}

export const insults = [
  'Pigface',   'Dick',      'Joker',    'Jackass',  'Reject',
  'Idiot',     'Deadbeat',  'Minger',   'Barmpot',  'Bimbo',
  'Anarchist', 'Dufus',     'Louse',    'Booby',    'Boozer',
  'Sod',       'Pussy',     'Milksop',  'Grouch',   'Hooligan',
  'Nancy',     'Nonce',     'Fool',     'Dumbo',    'Cheater',
  'Lardface',  'Lardass',   'Muppet',   'Dweeb',    'Nut',
  'Duffer',    'Meathead',  'Tosser',   'Spoon',    'Doofus',
  'Honky',     'Plonker',   'Snob',     'Junkie',   'Patsy',
  'Swindler',  'Gorilla',   'Wimp',     'Wuss',     'Stinker',
  'Scumbag',   'Lug',       'Ligger',   'Poop',     'Gannet',
  'Shyster',   'Monster',   'Gasbag',   'Pish',     'Bogeyman',
  'Sucker',    'Loudmouth', 'Freak',    'Witch',    'Gormless',
  'Nobody',    'Butt',      'Shit',     'Skunk',    'Pansy',
  'Bloated',   'Flairhead', 'Wazzack',  'Fibber',   'Mutant',
  'Skiver',    'Butthead',  'Cretin',   'Drunkard', 'Pillock',
  'Bastard',   'Wally',     'Arse',     'Oddball',  'Fink',
  'Criminal',  'Bozo',      'Dickhead', 'Numpty',   'Pussface',
  'Dingaling', 'Sodding',   'Sicko',    'Chuffer',  'Scab',
  'Jerk',      'Boob',      'Tyke',     'Dipstick', 'Alcoholic',
  'Flange',    'Ninny',     'Pox',      'Dumbass'
]
export const jobs = [
  'Analyst',    'Banker',     'Physicist',  'Butcher',    'Librarian',
  'Butler',     'Laborer',    'Realtor',    'Fitter',     'Critic',
  'Expert',     'Widow',      'Brewer',     'Examiner',   'Pedlar',
  'Director',   'Governess',  'Piper',      'Estimator',  'Geologist',
  'Pharmacist', 'Arsonist',   'Hermit',     'Announcer',  'Plasterer',
  'Roofer',     'Buyer',      'Fabricator', 'Cashier',    'Horseman',
  'Podiatrist', 'Vicar',      'Journalist', 'Machinist',  'Actor',
  'Archivist',  'Paver',      'Traveler',   'Don',        'Lecturer',
  'Dean',       'Mortician',  'Author',     'Undertaker', 'Singer',
  'Carpenter',  'Hygienist',  'Actuary',    'Tourist',    'Paramedic',
  'Artiste',    'Nurse',      'Mechanic',   'Policeman',  'Physician',
  'Drafter',    'Builder',    'Canon',      'Yeoman',     'Harpist',
  'Midwife',    'Chemist',    'Masons',     'Worshipper', 'Artist',
  'Player',     'Merchant',   'Bricklayer', 'Tailor',     'Accountant',
  'Joiner',     'Alderman',   'Thief',      'Striker',    'Scientist',
  'Grammarian', 'Girlguide',  'Cameraman',  'Tutor',      'Plumber',
  'Agent',      'Bureaucrat', 'Technician', 'Cobbler',    'Farmer',
  'Magistrate', 'Academic',   'Painter',    'Writer',     'Workman',
  'Matron',     'Prisoner',   'Churchgoer', 'Courier',    'Trainer',
  'Designer',   'Shoemaker',  'Broker',     'Architect',  'Caterer',
  'Doctor',     'Publisher',  'Engineer',   'Baker',      'Listener',
  'Auditor',    'Therapist',  'Translator', 'Pilot',      'Sheriff'
]
export default { generateMockServers }