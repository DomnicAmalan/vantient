## Vantient


Completed Pieces:

- Scraping of websites for basic level and advanced informations
  - Enter URL
  - Scrape website 
  - store in db

- Dashboard
  - Paginated Dashboard
  - contains cards with basic details
  - subscribe for a form (working for: https://jomostudio.sg/)


Design Considerations:

- Backend
   Api were created within NextJS App
  - MongoDB connection created withing app
  - Two handlers
    - /addwebsite
    - /scraper
  - cheerio parse content generically for following
    - Name
    - Description
    - Image
    - Form Inputs and Actions
    - Category of website(GPT3)
  - Regex were used to parse some basic level trimming and cleaning

- Frontend
  - MaterilUI used for fast implementation of components
  - Redux and Redux Sagas used for gloabal state management (Clean Code & smooth UI)
  - Emails added in localstorage
  - Upon Clicking subsribe button it will subscribe to the relevant site if not throw error in Toast Format

- Deployment
  - Vercel 

#
# TODO (Thought of doing)
  - Designs in separate files (Clean Code)
  - V3 Captcha based subscriptions(Hack)
  - After Scraping manual addition or editing of parameters (More power to admin users)
  - Bulk Addition of url (Queue Based System)

