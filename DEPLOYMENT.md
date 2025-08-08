# Todo App Deployment Guide for Render

This guide will help you deploy your Todo application to Render with the frontend served via the backend.

## Prerequisites

1. A GitHub account with your code pushed to a repository
2. A Render account (free tier available)
3. A MongoDB Atlas account for your database

## Pre-Deployment Checklist

✅ **Code Changes Made:**
- Frontend API configuration updated to work in production
- Server configured to use dynamic PORT from environment
- Build scripts properly configured
- Environment variables properly set up

## Step-by-Step Deployment Instructions

### Step 1: Prepare Your Repository

1. **Commit all changes to your repository:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### Step 2: Set Up Render Service

1. **Go to Render Dashboard:**
   - Visit [https://render.com](https://render.com)
   - Sign in with your GitHub account

2. **Create a New Web Service:**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub repository
   - Select your todo project repository

3. **Configure the Service:**
   - **Name:** `todo-app` (or your preferred name)
   - **Environment:** `Node`
   - **Region:** Choose closest to your users
   - **Branch:** `main` (or your default branch)
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`

### Step 3: Set Environment Variables

1. **In the Render dashboard, go to Environment tab:**
   - Add the following environment variables:
   
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `MONGO_URI` | Your MongoDB connection string |

2. **Get your MongoDB URI:**
   - Go to MongoDB Atlas dashboard
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

### Step 4: Deploy

1. **Click "Create Web Service"**
   - Render will automatically start building and deploying
   - This process takes 5-10 minutes for the first deployment

2. **Monitor the deployment:**
   - Watch the build logs in the Render dashboard
   - Look for any errors during build or startup

### Step 5: Verify Deployment

1. **Once deployed, you'll get a URL like:**
   `https://your-app-name.onrender.com`

2. **Test your application:**
   - Visit the URL
   - Try adding, editing, and deleting todos
   - Verify all functionality works

## Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check that all dependencies are in package.json
   - Verify build command is correct

2. **App Crashes on Startup:**
   - Check environment variables are set correctly
   - Verify MongoDB connection string is valid

3. **Frontend Not Loading:**
   - Ensure build completed successfully
   - Check that static files are being served correctly

4. **API Calls Failing:**
   - Verify the frontend is making requests to the correct URLs
   - Check browser console for errors

### Logs and Debugging:

- **View Logs:** Go to your service in Render dashboard → Logs tab
- **Check Build Logs:** Available during deployment
- **Runtime Logs:** Available after deployment

## Post-Deployment

### Automatic Deployments:
- Render automatically redeploys when you push to your connected branch
- No manual intervention needed for updates

### Custom Domain (Optional):
- Go to Settings → Custom Domains
- Add your domain and configure DNS

### Monitoring:
- Render provides basic monitoring and metrics
- Check the Metrics tab in your service dashboard

## Important Notes

1. **Free Tier Limitations:**
   - Services sleep after 15 minutes of inactivity
   - First request after sleep may be slow (cold start)

2. **Database:**
   - Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
   - Or whitelist Render's IP ranges

3. **Environment Variables:**
   - Never commit .env file to repository
   - Always use Render's environment variable settings

## Support

If you encounter issues:
1. Check Render's documentation: https://render.com/docs
2. Review build and runtime logs
3. Verify all environment variables are set correctly

Your Todo app should now be successfully deployed and accessible via the Render URL!
