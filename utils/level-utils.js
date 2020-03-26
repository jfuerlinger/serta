const createLogger = require('logging').default;
const logger = createLogger('level-utils');

const levels = [
    {
        id: 0,
        abbreviation: 'S',
        name: 'Loops'
    },
    {
        id: 1,
        abbreviation: 'A',
        name: 'Arrays'
    },
    {
        id: 2,
        abbreviation: 'M',
        name: 'Methods'
    },
    {
        id: 3,
        abbreviation: 'C',
        name: 'Classes'
    },
    {
        id: 4,
        abbreviation: 'F',
        name: 'Files'
    },
    {
        id: 5,
        abbreviation: 'P',
        name: 'Greenfoot Serta figher'
    },
];

module.exports.getNextLevel = (levelIdx) => levels[Math.min(levelIdx + 1, levels.length-1)];
module.exports.getPrevLevel = (levelIdx) => levels[Math.max(0, levelIdx - 1)];

module.exports.getDefaultLevel = () => levels[0];
module.exports.getMaxLevel = () => levels.length - 1;