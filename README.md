# emmanueljet founder

[![Next.js Framework](https://img.shields.io/badge/Framework-NextJS?logo=next.js&label=Next.js&color=77449a)](https://nextjs.org)

The emmanueljet founder portfolio website.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4

## Getting Started

### Prerequisites

- Node.js 26+
- npm 11+

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/emmanueljet-limited/emmanueljet-founder.git
   cd emmanueljet-founder
   ```

2. Install required dependencies:

   ```bash
   npm install
   ```

3. Initialize husky:

   ```bash
   npx husky init
   ```

4. Add husky pre-commit hook:

   ```bash
   npx husky add .husky/pre-commit "npm run lint"
   ```

5. Copy the .env.example to .env.local and fill in the required values.

   ```bash
   cp .env.example .env.local
   ```

6. Run the development server:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.
