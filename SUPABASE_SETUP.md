# Supabase Gallery Setup

## 1. Create a Supabase project
1. Go to https://app.supabase.com and sign in.
2. Create a new project.
3. Note the project URL and the anonymous public key.

## 2. Create a storage bucket
1. In Supabase, open Storage.
2. Create a new bucket named `gallery`.
3. Set the bucket to **public** so images can be loaded directly from the browser.

## 3. Create the database table
Run the SQL in `gallery_schema.sql` from the Supabase SQL editor.

## 4. Configure your site
1. Open `script.js`.
2. Replace `YOUR-PROJECT` and `YOUR-ANON-KEY` in the Supabase config block with your Supabase values:
   - `SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co'`
   - `SUPABASE_ANON_KEY = 'YOUR-ANON-KEY'`
3. Deploy the site to GitHub Pages.

## 5. How the gallery works
- Images are uploaded to Supabase Storage in the `gallery` bucket.
- Gallery records are saved in `gallery_memories`.
- All visitors load the same shared data from Supabase.
- Uploaded images become visible to everyone immediately after the page refreshes.
