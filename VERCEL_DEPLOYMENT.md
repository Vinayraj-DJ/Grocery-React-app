# 🚀 Vercel Deployment Guide - Grocery MERN App

## Quick Deploy Steps

### Step 1: Push to GitHub
Before deploying to Vercel, you need to push your code to GitHub.

**Option A: If you have your own repository:**
```bash
# Make sure you're on the feature branch
git checkout feature/add-build-scripts

# Add all changes
git add .

# Commit
git commit -m "Prepare for Vercel deployment"

# Push to your repository
git push origin feature/add-build-scripts
```

**Option B: Create a new repository:**
1. Go to https://github.com/new
2. Create a new repository named `grocery-mern-app`
3. Follow the instructions to push your existing code:
   ```bash
   git remote set-url origin https://github.com/YOUR_USERNAME/grocery-mern-app.git
   git push -u origin feature/add-build-scripts
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com/dashboard
2. **Import Project**: Click "Add New..." → "Project"
3. **Connect GitHub**: Select your `grocery-mern-app` repository
4. **Configure Project**:
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables**: Add this in Vercel settings:
   - `VITE_BACKEND_URL`: `https://mern-backend-ed5w.onrender.com`

6. **Click Deploy** 🎉

### Step 3: Post-Deployment

After deployment completes:
- Your app will be live at `https://your-app-name.vercel.app`
- API calls will automatically route through the rewrites in `vercel.json`
- The frontend will connect to your backend on Render

---

## 🔧 Configuration Details

### Frontend vercel.json Setup
The `vercel.json` file includes:
- Build commands for Vite
- API rewrites to forward `/api/*` requests to your Render backend
- SPA routing support

### Environment Variables
- `VITE_BACKEND_URL`: Your deployed backend URL (currently pointing to Render)

### Build Process
- Root `package.json` has `npm run build` script
- Builds the React frontend with Vite
- Output goes to `frontend/dist`

---

## ✅ Pre-Deployment Checklist

- [x] Build script added to package.json
- [x] `.env` configured with production backend URL
- [x] `vercel.json` configured with API rewrites
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables set in Vercel

---

## 🐛 Troubleshooting

### Build Fails
- Check that all dependencies are installed
- Verify `npm run build` works locally first
- Check Vercel build logs for specific errors

### API Calls Fail
- Verify backend URL is correct in environment variables
- Ensure backend has CORS enabled for your Vercel domain
- Check that API routes match the rewrite rules

### Permission Issues
- If you can't push to the current repo, fork it or create a new one
- Make sure you have write access to the repository

---

## 📝 Notes

- The backend is currently hosted on Render: `https://mern-backend-ed5w.onrender.com`
- You can change this URL in the `.env` file if you deploy the backend elsewhere
- Vercel will automatically redeploy when you push changes to your branch

---

**Ready to deploy?** Just push to GitHub and import your repo in Vercel! 🚀
