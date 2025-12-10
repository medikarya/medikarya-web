# Formspree Setup Guide for MediKarya

Your application is configured to use **Formspree** for handling form submissions without a backend.

## Step 1: Create Forms
Go to [Formspree](https://formspree.io/) and create 3 separate forms:
1.  **Student Waitlist** (for the main waitlist)
2.  **Case Writer Application** (for contributors)
3.  **Institution Inquiry** (for the contact page)

## Step 2: Get Endpoint URLs
For each form, you will get a submission URL like `https://formspree.io/f/xyzaabbcc`.

> **Pro Tip:** You can just create **ONE** form if you want to keep it simple. Just paste the **SAME URL** for all three variables below. The emails will look the same, but the message will say "Role: Student" or "Source: Institution Contact" so you can tell them apart.

## Step 3: Configure Environment
Create a file named `.env.local` in your project root and add the following keys with your URLs:

```env
NEXT_PUBLIC_FORMSPREE_STUDENT=https://formspree.io/f/YOUR_STUDENT_FORM_ID
NEXT_PUBLIC_FORMSPREE_WRITER=https://formspree.io/f/YOUR_WRITER_FORM_ID
NEXT_PUBLIC_FORMSPREE_INSTITUTION=https://formspree.io/f/YOUR_INSTITUTION_FORM_ID
```

## Step 4: Restart Server
Stop your running server and run `npm run dev` again to load the new environment variables.

Everything is already wired up in the code to use these keys!
