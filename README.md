# Mane Chain Website — V1.3

Static GitHub Pages storefront.

## V1.3 update
- Rebuilt cleanly from scratch.
- Typography changed away from the high-fashion Bodoni direction.
- Mane Chain wordmark now uses a softer flowing script treatment.
- Headlines use a cleaner geometric sans style closer to the Agrandir Grand feel.
- Body, navigation, products, and UI use a simple readable sans-serif.
- Original palette retained:
  - #DFCFBD
  - #3B342A
  - #BD9B74
  - #896C51
- Includes Home, Shop, Product, About, FAQ, Contact, responsive nav, product filters, and localStorage cart.

## Still needed before launch
- Real product photos
- Final product prices
- Payment platform / checkout links
- Shipping / returns / processing details
- Live contact-form integration

## V1.3 Google Calendar event sync
- Added `events.html`.
- Added Upcoming Events section to the homepage.
- Calendar source: the supplied public Google Calendar iCal feed.
- Added a GitHub Actions workflow that refreshes `assets/data/events.json` hourly.
- The storefront reads only local JSON, so the browser does not depend on Google Calendar CORS support.
- You can force an immediate refresh from GitHub > Actions > Sync Mane Chain Calendar > Run workflow.

### First deploy
After pushing V1.3 to GitHub, run the calendar workflow once manually. It will pull the current events and commit them to the repository. After that it runs automatically every hour.

## V1.3 Real photography
- Replaced the abstract homepage hero with supplied Mane Chain lifestyle photography.
- Added supplied real hair-jewelry photography throughout the homepage, shop cards, cart, product page, and About page.
- Added a responsive Real Mane Chain lookbook/gallery section.
- Product cards use the supplied lifestyle images as visual references until exact named product photography is available.
