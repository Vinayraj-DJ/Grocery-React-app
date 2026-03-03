# 🐛 Troubleshooting: Products Not Showing After Deployment

## Issue Identified

After deploying to Vercel, products are not loading on the frontend. This is typically caused by one of these issues:

1. **Environment Variables Not Set in Vercel**
2. **Backend API Not Accessible (CORS Issues)**
3. **API Rewrite Configuration**

---

## ✅ Fixes Applied

### 1. Added `.env.production` File
Created `frontend/.env.production` with:
```
VITE_BACKEND_URL=https://mern-backend-ed5w.onrender.com
```

This ensures the build process has access to the backend URL during production builds.

### 2. Updated `.gitignore`
Modified `.gitignore` to allow `.env.production` to be committed to Git:
```
# Don't ignore .env.production for Vercel deployment
#.env.production
```

### 3. Verified CORS Configuration
Your backend already has proper CORS setup to accept requests from Vercel domains:
```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app",
  "https://your-frontend.onrender.com"
];

app.use(cors({ 
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('vercel.app') || origin.includes('onrender.com')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));
```

---

## 🚀 Critical: Set Environment Variable in Vercel Dashboard

Even with the `.env.production` file, you MUST also add the environment variable in Vercel's dashboard:

### Steps:

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select Your Project**: Click on your grocery-app project
3. **Go to Settings**: Click on "Settings" tab
4. **Environment Variables**: Click on "Environment Variables" in the left sidebar
5. **Add Variable**:
   - **Name**: `VITE_BACKEND_URL`
   - **Value**: `https://mern-backend-ed5w.onrender.com`
   - **Environment**: Select "Production" (and "Preview" if needed)
6. **Save** the variable
7. **Redeploy**: Go to "Deployments" and redeploy the latest commit

---

## 🔍 How to Verify It's Working

### Check Browser Console:
1. Open your deployed app
2. Press F12 to open DevTools
3. Go to "Console" tab
4. Look for any errors related to API calls

### Check Network Tab:
1. In DevTools, go to "Network" tab
2. Refresh the page
3. Look for requests to `/api/product/list`
4. Check if they're successful (status 200) or failing (4xx/5xx)

### Common Errors:
- **Failed to fetch**: Backend URL is incorrect or backend is down
- **CORS Error**: Backend isn't allowing requests from your Vercel domain
- **404 Not Found**: API route is incorrect

---

## 📊 Testing Your Backend

Test if your backend is responding:

1. **Direct API Test**: Visit in browser:
   ```
   https://mern-backend-ed5w.onrender.com/api/product/list
   ```
   
2. **Expected Response**: Should return JSON with products array

3. **If backend doesn't respond**:
   - Check Render dashboard for backend status
   - Ensure backend server is running
   - Verify database connection

---

## 🎯 Quick Checklist

- [x] `.env.production` file created
- [x] `.gitignore` updated
- [x] Code pushed to GitHub
- [ ] **Environment variable added in Vercel dashboard** ⚠️ REQUIRED
- [ ] Redeploy triggered in Vercel
- [ ] Backend is running and accessible
- [ ] Browser console checked for errors

---

## 🔧 Additional Fix: Update vercel.json (Optional)

If issues persist, you can try hardcoding the backend URL in the AppContext instead of using environment variables:

**File**: `frontend/src/context/AppContext.jsx`
```javascript
// Change line 7 from:
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// To:
axios.defaults.baseURL = "https://mern-backend-ed5w.onrender.com";
```

However, using environment variables is the recommended approach.

---

## 📞 Support

If products still don't show after following all steps:

1. Check Vercel deployment logs for build errors
2. Check Render logs for backend errors
3. Verify database has products added
4. Test backend API directly using Postman or browser

---

**Status**: All fixes have been committed and pushed to GitHub. Vercel will automatically rebuild when you add the environment variable and trigger a redeployment.
