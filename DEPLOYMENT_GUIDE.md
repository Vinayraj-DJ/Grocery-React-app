# MERN Grocery App Deployment Guide

## 📋 Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud like MongoDB Atlas)
- Git account (GitHub, GitLab, or Bitbucket)
- Deployment platform account (Render, Railway, Heroku, etc.)

## 🚀 Deployment Steps

### Option 1: Deploy on Render (Recommended - Free Tier Available)

#### Backend Deployment:
1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign up
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: grocery-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
6. Add Environment Variables:
   - `PORT`: 5000
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secret key
   - `NODE_ENV`: production
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary name
   - `CLOUDINARY_API_KEY`: Your Cloudinary key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary secret
7. Deploy!

#### Frontend Deployment:
1. In Render, click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: grocery-frontend
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Add Environment Variable:
   - `VITE_BACKEND_URL`: Your backend URL from Render
5. Deploy!

### Option 2: Deploy on Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js
6. Add environment variables in Railway dashboard
7. Deploy both frontend and backend as separate services

### Option 3: Deploy on Vercel (Frontend) + Render (Backend)

#### Backend on Render (follow Option 1)

#### Frontend on Vercel:
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_BACKEND_URL`: Your backend URL
6. Deploy!

### Option 4: Deploy on Heroku

#### Backend:
```bash
cd backend
heroku create grocery-backend
heroku config:set MONGO_URI=your_mongo_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production
git push heroku main
```

#### Frontend:
Use Vercel or Netlify for better Vite support

## 🔧 MongoDB Setup

### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Whitelist all IPs (0.0.0.0/0) for production
5. Update `MONGO_URI` in your backend env

### Option B: Local MongoDB
Only for development. For production, use Atlas.

## 🔐 Environment Variables

### Backend (.env):
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/grocery-app
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=production
SELLER_EMAIL=admin@gmail.com
SELLER_PASSWORD=admin123
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env):
```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

## 📝 Post-Deployment Checklist

- [ ] Test user registration/login
- [ ] Test product listing
- [ ] Test cart functionality
- [ ] Test image uploads (Cloudinary)
- [ ] Check CORS settings in backend
- [ ] Verify database connection
- [ ] Test all API endpoints
- [ ] Check browser console for errors

## 🔒 Security Notes

1. **Change default admin credentials** before going live
2. **Use strong JWT_SECRET** (minimum 32 characters)
3. **Enable CORS only for your frontend domain**
4. **Use HTTPS** in production
5. **Keep environment variables secure**
6. **Don't commit .env files to Git**

## 🆘 Troubleshooting

### Backend not starting:
- Check logs on deployment platform
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

### Frontend can't connect to backend:
- Update `VITE_BACKEND_URL` to production URL
- Check CORS configuration in backend
- Ensure backend is running

### Images not uploading:
- Verify Cloudinary credentials
- Check upload limits on free tier

## 📊 Monitoring

- Use platform logs (Render, Railway, Vercel)
- Monitor MongoDB Atlas for database performance
- Set up uptime monitoring (UptimeRobot, Pingdom)

Good luck with your deployment! 🎉
