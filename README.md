# Rouin Safi Bites

A modern restaurant website built with React, TypeScript, and Tailwind CSS.

## Project Overview

Rouin Safi Bites is a beautiful restaurant website showcasing Afghan cuisine with a modern, responsive design.

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase

## Getting Started

### Prerequisites

Make sure you have Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd rouin-safi-bites

# Step 3: Install the necessary dependencies
npm install

# Step 4: Set up environment variables
cp env.example .env
# Edit .env file with your Supabase credentials

# Step 5: Start the development server
npm run dev
```

## Development

The development server will start on `http://localhost:5173` with hot reload enabled.

### Environment Variables

This project uses environment variables for Supabase configuration. Copy the example environment file and update it with your credentials:

```sh
cp env.example .env
```

Required environment variables:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_SUPABASE_PROJECT_ID`: Your Supabase project ID

**Note**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

## Building for Production

```sh
npm run build
```

## Deployment

### Docker Deployment (Recommended for Render)

This project includes Docker configuration for easy deployment on Render or any container platform.

#### Build and Run Locally
```sh
# Build the Docker image
docker build -t rouin-safi-bites .

# Run the container
docker run -p 3000:80 rouin-safi-bites
```

#### Deploy on Render

1. **Connect your repository** to Render
2. **Create a new Web Service**
3. **Configure the service:**
   - **Build Command**: `docker build -t rouin-safi-bites .`
   - **Start Command**: `docker run -p $PORT:80 rouin-safi-bites`
   - **Environment Variables**: Add your Supabase environment variables

#### Alternative Static Hosting

You can also deploy to static hosting services:

- Vercel
- Netlify
- GitHub Pages
- AWS S3

## Project Structure

```
src/
├── components/    # React components
├── pages/         # Page components
├── contexts/      # React contexts
├── hooks/         # Custom hooks
├── lib/           # Utility functions
└── integrations/  # Third-party integrations
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
