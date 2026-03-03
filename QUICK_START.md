# Quick Start Guide - Deploy Your Grocery MERN App

## 🚀 Fast Track Deployment (15 minutes)

### Step 1: Setup MongoDB Atlas (3 minutes)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Click "Build a Database" → Choose "FREE" tier (M0)
4. Select your region (closest to you)
5. Click "Create Cluster"
6. Click "Connect" → "Connect your application"
7. Copy the connection string (looks like: `mongodb+srv://username:password@cluster...`)
8. Click "Add Network Access" → Add IP Address: `0.0.0.0/0` (Allow from anywhere)

### Step 2: Push to GitHub (2 minutes)

Open PowerShell in your project folder and run:

```powershell
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create repository on GitHub first, then:
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

### Step 3: Deploy Backend on Render (5 minutes)

1. Go to https://render.com and sign up with GitHub
2. Click "New +" → "Web Service"
3. Select your repository
4. Configure:
   - **Name**: `grocery-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: Free

5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   ```
   PORT = 5000
   MONGO_URI = [paste your MongoDB connection string]
   JWT_SECRET = your_super_secret_key_12345_change_this
   NODE_ENV = production
   
   CLOUDINARY_CLOUD_NAME = dpuqnbikq
   CLOUDINARY_API_KEY = 475778881531154
   CLOUDINARY_API_SECRET = vRS9Jg_OV86WifoujBAN4G_VYac
   
   SELLER_EMAIL = admin@gmail.com
   SELLER_PASSWORD = admin123
   ```

6. Click "Create Web Service"
7. Wait for deployment (check logs)
8. Copy your backend URL (e.g., `https://grocery-backend-xyz.onrender.com`)

### Step 4: Deploy Frontend on Vercel (5 minutes)

1. Go to https://vercel.com and sign up with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variable:
   ```
   VITE_BACKEND_URL = https://your-backend-url.onrender.com
   ```
   (Replace with your actual backend URL from Render)

6. Click "Deploy"
7. Wait for deployment
8. Copy your frontend URL (e.g., `https://grocery-app-xyz.vercel.app`)

### Step 5: Update CORS in Backend (1 minute)

Go back to Render backend dashboard:
1. Add new environment variable:
   ```
   FRONTEND_URL = https://your-frontend-url.vercel.app
   ```
2. Or update the allowed origins in `backend/index.js` with your Vercel URL
3. Redeploy (automatic when you push to Git or manual via dashboard)

### ✅ Test Your App

1. Open your Vercel frontend URL
2. Try registering a user
3. Login as admin (admin@gmail.com / admin123)
4. Add products
5. Test cart functionality

---

## 🔧 Alternative: Deploy Both on Railway (Even Easier!)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repo
5. Railway auto-detects both frontend and backend
6. Add environment variables for each service
7. Deploy!

---

## 📝 Environment Variables Reference

### Backend (.env) - Required for Production:
```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/grocery
JWT_SECRET=change_this_to_secure_random_string
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=dpuqnbikq
CLOUDINARY_API_KEY=475778881531154
CLOUDINARY_API_SECRET=vRS9Jg_OV86WifoujBAN4G_VYac
SELLER_EMAIL=admin@gmail.com
SELLER_PASSWORD=admin123
```

### Frontend (.env) - Required for Production:
```env
VITE_BACKEND_URL=https://your-backend.onrender.com
```

---

## 🎯 Next Steps After Deployment

1. **Change Admin Password**: Login and change default credentials
2. **Custom Domain** (Optional): Buy domain and connect to Vercel/Render
3. **SSL Certificate**: Automatic on Vercel/Render (HTTPS enabled)
4. **Monitoring**: Check logs regularly on both platforms
5. **Backup**: Regular database backups on MongoDB Atlas

---

## ⚠️ Common Issues & Solutions

### Issue: CORS Error
**Solution**: Make sure your frontend URL is in backend's allowed origins

### Issue: Can't Connect to Database
**Solution**: 
- Check MongoDB connection string
- Ensure IP whitelist includes `0.0.0.0/0`
- Verify username/password are correct

### Issue: Images Not Uploading
**Solution**: 
- Verify Cloudinary credentials
- Check file size limits (free tier: 10MB)

### Issue: Build Failed on Vercel
**Solution**: 
- Check Node version compatibility
- Verify build command: `npm run build`
- Check output directory: `dist`

---

## 🆘 Need Help?

- Check deployment logs on Render/Vercel
- Review DEPLOYMENT_GUIDE.md for detailed instructions
- Check MongoDB Atlas connection status
- Verify all environment variables are set correctly

Good luck! 🚀
