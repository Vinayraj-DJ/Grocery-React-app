# Deployment Checklist ✅

## Pre-Deployment Preparation

### 1. MongoDB Setup
- [ ] Create MongoDB Atlas account
- [ ] Create free cluster (M0)
- [ ] Get connection string
- [ ] Whitelist IP: `0.0.0.0/0` (allow all)
- [ ] Test connection locally (optional)

### 2. Git & GitHub
- [ ] Initialize git repository (`git init`)
- [ ] Create `.gitignore` file ✅ (Already created)
- [ ] Add files to git (`git add .`)
- [ ] Commit changes (`git commit -m "Initial commit"`)
- [ ] Create GitHub repository
- [ ] Push to GitHub (`git push -u origin main`)

### 3. Cloudinary (For Images)
- [ ] Verify Cloudinary account is active
- [ ] Note down credentials:
  - Cloud Name: `dpuqnbikq`
  - API Key: `475778881531154`
  - API Secret: `vRS9Jg_OV86WifoujBAN4G_VYac`

---

## Backend Deployment (Render/Railway)

### Environment Variables
- [ ] `PORT=5000`
- [ ] `MONGO_URI=mongodb+srv://...` (Your Atlas connection string)
- [ ] `JWT_SECRET=<strong-random-string>` ⚠️ **CHANGE THIS!**
- [ ] `NODE_ENV=production`
- [ ] `CLOUDINARY_CLOUD_NAME=dpuqnbikq`
- [ ] `CLOUDINARY_API_KEY=475778881531154`
- [ ] `CLOUDINARY_API_SECRET=vRS9Jg_OV86WifoujBAN4G_VYac`
- [ ] `SELLER_EMAIL=admin@gmail.com`
- [ ] `SELLER_PASSWORD=admin123` ⚠️ **Change in production!**

### Deployment Steps
- [ ] Sign up on Render.com with GitHub
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set Root Directory: `backend`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `node index.js`
- [ ] Add all environment variables
- [ ] Deploy
- [ ] Copy backend URL (e.g., `https://grocery-backend-xyz.onrender.com`)

---

## Frontend Deployment (Vercel)

### Environment Variables
- [ ] `VITE_BACKEND_URL=https://your-backend-url.onrender.com`

### Deployment Steps
- [ ] Sign up on Vercel.com with GitHub
- [ ] Import GitHub repository
- [ ] Set Framework Preset: Vite
- [ ] Set Root Directory: `frontend`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Add environment variable
- [ ] Deploy
- [ ] Copy frontend URL (e.g., `https://grocery-app-xyz.vercel.app`)

---

## Post-Deployment Configuration

### Update CORS Settings
- [ ] Add frontend URL to backend's allowed origins
- [ ] Redeploy backend if needed

### Security Updates
- [ ] Change default admin password
- [ ] Generate new JWT_SECRET (use: https://generate-secret.vercel.app/32)
- [ ] Update CORS to only allow your domains

---

## Testing Checklist

### Functional Tests
- [ ] Open frontend URL in browser
- [ ] Register a new user
- [ ] Login with registered user
- [ ] Login as admin
- [ ] View products
- [ ] Add product to cart
- [ ] Update cart quantity
- [ ] Remove from cart
- [ ] Add address
- [ ] Place order
- [ ] Upload product images (as seller)

### API Tests
- [ ] Test user registration endpoint
- [ ] Test login endpoint
- [ ] Test get products endpoint
- [ ] Test cart operations
- [ ] All endpoints return proper responses

### Console Checks
- [ ] No CORS errors in browser console
- [ ] No network errors
- [ ] All API calls successful (status 200/201)

---

## Troubleshooting

### If Backend Won't Start:
- [ ] Check Render logs
- [ ] Verify MONGO_URI is correct
- [ ] Check all environment variables are set
- [ ] Ensure `package.json` has `"start": "node index.js"`

### If Frontend Can't Connect:
- [ ] Update `VITE_BACKEND_URL` with correct backend URL
- [ ] Check CORS settings in backend
- [ ] Verify backend is running (visit backend URL)

### If Images Don't Upload:
- [ ] Check Cloudinary credentials
- [ ] Verify image size < 10MB (free tier limit)
- [ ] Check Cloudinary dashboard for upload errors

### If Database Connection Fails:
- [ ] Verify MongoDB connection string
- [ ] Check IP whitelist includes `0.0.0.0/0`
- [ ] Test connection string in MongoDB Compass

---

## Optional Enhancements

### Performance
- [ ] Enable gzip compression in backend
- [ ] Add caching headers
- [ ] Optimize images before upload

### Monitoring
- [ ] Set up UptimeRobot for monitoring
- [ ] Enable MongoDB Atlas insights
- [ ] Check Render analytics regularly

### Security
- [ ] Add rate limiting
- [ ] Enable helmet.js security headers
- [ ] Implement input validation
- [ ] Add request sanitization

### Features
- [ ] Add email notifications
- [ ] Implement payment gateway (Stripe)
- [ ] Add order tracking
- [ ] Enable reviews/ratings

---

## Final Verification

- [ ] Application is accessible via custom domain (optional)
- [ ] HTTPS is enabled (automatic on Vercel/Render)
- [ ] All features work in production
- [ ] Admin can manage products
- [ ] Users can place orders
- [ ] Images upload successfully
- [ ] Database is storing data correctly

---

## 🎉 Success Criteria

When all items are checked, you should have:
✅ A live frontend accessible from anywhere
✅ A working backend API
✅ Connected MongoDB database
✅ Working image uploads
✅ Secure authentication
✅ Full e-commerce functionality

**Congratulations! Your grocery MERN app is now live! 🚀**
