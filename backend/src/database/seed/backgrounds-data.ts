import { IBackground } from '../../../../common/types/background-interface';
import { IBackgroundType } from '../../../../common/types/background-type-interface';

const backgroundSeed: IBackground[] = [
    {
        "id": 1,
        "title": "Curiosity",
        "description": "Always eager to explore the unknown.",
        "type": IBackgroundType.TRAIT,
    },
    {
        "id": 2,
        "title": "Confidence",
        "description": "Knows how to command attention and respect.",
        "type": IBackgroundType.TRAIT,
    },
    {
        "id": 3,
        "title": "Selfless",
        "description": "Willing to endure hardship for others.",
        "type": IBackgroundType.TRAIT,
    },
    {
        "id": 13,
        "title": "Charm",
        "description": "Easily forges deep connections.",
        "type": IBackgroundType.TRAIT,
    },
    {
        "id": 14,
        "title": "Determination",
        "description": "Unstoppable when pursuing goals.",
        "type": IBackgroundType.TRAIT,
    },
    {
        "id": 15,
        "title": "Fairness",
        "description": "Always strives to do what is right.",
        "type": IBackgroundType.TRAIT,
    },
    {
        "id": 7,
        "title": "Impulsiveness",
        "description": "Acts without thinking of the consequences.",
        "type": IBackgroundType.FLAW,
    },
    {
        "id": 8,
        "title": "Arrogance",
        "description": "Overestimates their abilities.",
        "type": IBackgroundType.FLAW,
    },
    {
        "id": 9,
        "title": "Secrecy",
        "description": "Keeps important information to themselves.",
        "type": IBackgroundType.FLAW,
    },
    {
        "id": 16,
        "title": "Overbearing",
        "description": "Suffocates others with excessive care.",
        "type": IBackgroundType.FLAW,
    },
    {
        "id": 17,
        "title": "Rigid",
        "description": "Unwilling to adapt or accept change.",
        "type": IBackgroundType.FLAW,
    },
    {
        "id": 18,
        "title": "Dogmatic",
        "description": "Clings too tightly to outdated traditions.",
        "type": IBackgroundType.FLAW,
    },
    {
        "id": 4,
        "title": "Mentor",
        "description": "Deeply connected to a mentor or guide.",
        "type": IBackgroundType.BOND,
    },
    {
        "id": 5,
        "title": "Sibling",
        "description": "Searching for a lost sibling with mystical ties.",
        "type": IBackgroundType.BOND,
    },
    {
        "id": 6,
        "title": "Beast",
        "description": "Shares a bond with a mighty and loyal animal.",
        "type": IBackgroundType.BOND,
    },
    {
        "id": 19,
        "title": "Artifact",
        "description": "Bound to a magical artifact of great power.",
        "type": IBackgroundType.BOND,
    },
    {
        "id": 20,
        "title": "Pet",
        "description": "Fiercely loyal to a magical creature or animal.",
        "type": IBackgroundType.BOND,
    },
    {
        "id": 21,
        "title": "Throne",
        "description": "Feels bound to a seat of power or authority.",
        "type": IBackgroundType.BOND,
    },
    {
        "id": 10,
        "title": "Independence",
        "description": "A free spirit.",
        "type": IBackgroundType.IDEAL,
    },
    {
        "id": 11,
        "title": "Family",
        "description": "Family and loved ones are their top priority.",
        "type": IBackgroundType.IDEAL,
    },
    {
        "id": 12,
        "title": "Radical Change",
        "description": "Destruction is necessary for renewal.",
        "type": IBackgroundType.IDEAL,
    },
    {
        "id": 22,
        "title": "Power",
        "description": "Knowledge and mastery are keys to greatness.",
        "type": IBackgroundType.IDEAL,
    },
    {
        "id": 23,
        "title": "Wisdom",
        "description": "Reflecting and seeking hidden truths is their duty.",
        "type": IBackgroundType.IDEAL,
    },
    {
        "id": 24,
        "title": "Responsibility",
        "description": "Must maintain order and protect those under their care.",
        "type": IBackgroundType.IDEAL,
    }
];

export default backgroundSeed;