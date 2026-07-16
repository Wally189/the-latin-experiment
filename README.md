# The Catholic Experiment

A static prototype for a modern Catholic field guide: part guided route, part textbook and part author’s notebook.

## Public proposition

The site begins with the reader’s inherited questions and uses a repeated six-sign method:

1. Look
2. Ask
3. Understand
4. Check
5. Weigh
6. Try

Developed pages guide readers towards official Catholic sources while distinguishing Church teaching, Canon Law, official communication, scholarship and personal reflection.

## Structure

- `index.html` — public front door and field-guide key
- `formation.html` — guided route
- `chapter-01-belief.html` to `chapter-03-science.html` — first developed chapters
- `questions.html` — subject map with official starting points
- `latin.html` — first author-learning strand
- `notebook.html` — Augustine, saints and future original materials
- `story.html` — origin and editorial promise
- `sources.html` — source hierarchy and free-source-first policy
- `assets/guide-icons.svg` — reusable textbook-style icon system

## Editorial rules

- link directly to official Church texts where appropriate;
- identify the kind of authority each source carries;
- keep criticism, scandal and institutional failure visible;
- distinguish personal work from Church teaching;
- never hide official Church sources behind paid original material;
- avoid factionalism, controversy farming and professional/employment connections.

## Deployment

GitHub Pages deploys from `main` through `.github/workflows/pages.yml`.
