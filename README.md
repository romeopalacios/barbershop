# The Don LA — VS Code Website Template

A responsive, mobile-first barber portfolio and booking website.

## Open it
1. Unzip the folder.
2. Open `The-Don-LA` in VS Code.
3. Install/use the **Live Server** extension and open `index.html` with Live Server.

## Instagram logo/profile image
The public @thedonla23 profile logo is included locally at:

`assets/profile.jpg`

It is used for the favicon, mobile home-screen icon, header, service icons, gallery fallbacks, and footer.

## Add the best Instagram gallery photos
Download/select six photos from @thedonla23 and save them exactly as:

- `assets/gallery/01.jpg`
- `assets/gallery/02.jpg`
- `assets/gallery/03.jpg`
- `assets/gallery/04.jpg`
- `assets/gallery/05.jpg`
- `assets/gallery/06.jpg`

No HTML changes are required. Placeholder art appears until those files are added.

Suggested ordering:
- 01 = strongest overall haircut / hero image
- 02 = clean fade close-up
- 03 = lineup/detail shot
- 04 = strong wide or lifestyle/barber-chair image
- 05 = different hair texture/style
- 06 = another standout transformation/result

## Booking
All booking CTAs currently point to:
`https://mbarbering.booksy.com/a/`

The copy tells users to select **The Don** on Booksy.

## Contact form
The contact form sends inquiries to `donjohnson1902@gmail.com`. It opens the visitor's email client with a pre-filled email, which works on static GitHub Pages without a backend.

If you want fully in-page form delivery later, connect Formspree, FormSubmit, Basin, Netlify Forms, or your own backend.

## GitHub Pages
1. Create a GitHub repo.
2. Push this folder.
3. In GitHub: Settings → Pages → Deploy from branch → `main` / root.
4. Set the custom domain to `alwayscuttin.org` and enable **Enforce HTTPS** after the certificate is issued.

## Squarespace DNS for alwayscuttin.org

Add these records in Squarespace Domains → DNS Settings:

| Host | Type | Data |
| --- | --- | --- |
| `@` | A | `185.199.108.153` |
| `@` | A | `185.199.109.153` |
| `@` | A | `185.199.110.153` |
| `@` | A | `185.199.111.153` |
| `www` | CNAME | `romeopalacios.github.io` |

Remove any conflicting `@` A/AAAA records or `www` CNAME records. DNS and the GitHub HTTPS certificate may take up to 24 hours to finish provisioning.
