--sql for Postresql in case you need the data

DROP TABLE IF EXISTS backgrounds;

CREATE TABLE backgrounds (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(255) NOT NULL CHECK (type IN ('trait', 'flaw', 'bond', 'ideal')),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO backgrounds (title, description, type, "createdAt", "updatedAt") VALUES
('Curiosity', 'Always eager to explore the unknown.', 'trait', NOW(), NOW()),
('Confidence', 'Knows how to command attention and respect.', 'trait', NOW(), NOW()),
('Selfless', 'Willing to endure hardship for others.', 'trait', NOW(), NOW()),
('Charm', 'Easily forges deep connections.', 'trait', NOW(), NOW()),
('Determination', 'Unstoppable when pursuing goals.', 'trait', NOW(), NOW()),
('Fairness', 'Always strives to do what is right.', 'trait', NOW(), NOW()),
('Impulsiveness', 'Acts without thinking of the consequences.', 'flaw', NOW(), NOW()),
('Arrogance', 'Overestimates their abilities.', 'flaw', NOW(), NOW()),
('Secrecy', 'Keeps important information to themselves.', 'flaw', NOW(), NOW()),
('Overbearing', 'Suffocates others with excessive care.', 'flaw', NOW(), NOW()),
('Rigid', 'Unwilling to adapt or accept change.', 'flaw', NOW(), NOW()),
('Dogmatic', 'Clings too tightly to outdated traditions.', 'flaw', NOW(), NOW()),
('Mentor', 'Deeply connected to a mentor or guide.', 'bond', NOW(), NOW()),
('Sibling', 'Searching for a lost sibling with mystical ties.', 'bond', NOW(), NOW()),
('Beast', 'Shares a bond with a mighty and loyal animal.', 'bond', NOW(), NOW()),
('Artifact', 'Bound to a magical artifact of great power.', 'bond', NOW(), NOW()),
('Pet', 'Fiercely loyal to a magical creature or animal.', 'bond', NOW(), NOW()),
('Throne', 'Feels bound to a seat of power or authority.', 'bond', NOW(), NOW()),
('Independence', 'A free spirit.', 'ideal', NOW(), NOW()),
('Family', 'Family and loved ones are their top priority.', 'ideal', NOW(), NOW()),
('Radical Change', 'Destruction is necessary for renewal.', 'ideal', NOW(), NOW()),
('Power', 'Knowledge and mastery are keys to greatness.', 'ideal', NOW(), NOW()),
('Wisdom', 'Reflecting and seeking hidden truths is their duty.', 'ideal', NOW(), NOW()),
('Responsibility', 'Must maintain order and protect those under their care.', 'ideal', NOW(), NOW());