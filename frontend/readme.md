# Happy

## Credentials

Credentials used on this project.

### Map

We're using the mapbox service maps for our maps, but your can use the open street.

Both maps are available on the `src/pages/OrphanagesMap.tsx`, line 28.

If you choose mapbox service, go on this [link](https://account.mapbox.com/auth/signup/) to create your account.

Then copy the `Default public token` and paste on `.env` file

Has to be like:
```.env
REACT_APP_MAPBOX_TOKEN=pk.eyJ1Ijoid2lsbGlhbXRvcnJlczEiLCJhIjoiY2tnOXdubWVqMDFncDJzcXVjMG03anpxZSJ9.-yuu5vgnpYI_CwMROdtONg
```
