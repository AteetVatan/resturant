# Deployment Guide

This guide covers deploying Bella India Bites to various platforms.

## 🐳 Docker Deployment (Recommended)

### Prerequisites
- Docker installed and running
- Your Supabase environment variables

### Local Testing
```bash
# Build the Docker image
docker build -t bella-india-bites .

# Run the container
docker run -p 3000:80 bella-india-bites

# Visit http://localhost:3000
```

## 🚀 Render Deployment

### Option 1: Using render.yaml (Recommended)
1. Push your code to GitHub
2. Connect your repository to Render
3. Render will automatically detect the `render.yaml` file
4. Add your environment variables in the Render dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SUPABASE_PROJECT_ID`

### Option 2: Manual Configuration
1. **Create a new Web Service** on Render
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Environment**: Docker
   - **Build Command**: `docker build -t bella-india-bites .`
   - **Start Command**: `docker run -p $PORT:80 bella-india-bites`
4. **Add Environment Variables:**
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `VITE_SUPABASE_PROJECT_ID`: Your Supabase project ID

## 🌐 Other Deployment Options

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

### GitHub Pages
```bash
# Add to package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

## 🔧 Environment Variables

Make sure to set these environment variables in your deployment platform:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_SUPABASE_PROJECT_ID=your_project_id
```

## 📊 Health Check

The application includes a health check endpoint at `/health` that returns a simple "healthy" response.

## 🔒 Security Notes

- Environment variables are properly secured and not exposed to the client
- The nginx configuration includes security headers
- Static assets are cached for optimal performance

## 🐛 Troubleshooting

### Common Issues

1. **Build fails**: Check that all dependencies are in `package.json`
2. **Environment variables not working**: Ensure they're prefixed with `VITE_`
3. **Routing issues**: The nginx config handles React Router properly
4. **Port issues**: The Docker container runs on port 80, Render will map to `$PORT`

### Debug Commands

```bash
# Check Docker build
docker build -t bella-india-bites .

# Run with logs
docker run -p 3000:80 bella-india-bites

# Check container logs
docker logs <container_id>

# Access container shell
docker exec -it <container_id> /bin/sh
``` 