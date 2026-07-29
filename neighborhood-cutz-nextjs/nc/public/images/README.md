# Images

Drop files here using these exact filenames. Paths are already wired up in
`content/`, so nothing else needs changing.

    barbers/    esvin.jpg  cj.jpg  brayan.jpg  david.jpg  johnny.jpg
    services/   haircut.jpg  cut-beard.jpg  skin-fade.jpg  beard.jpg
                lineup.jpg  kids.jpg  shave.jpg  design.jpg
    gallery/    01.jpg  02.jpg  03.jpg  04.jpg  05.jpg  06.jpg  07.jpg  08.jpg

Before committing:

- Resize to roughly 1200px on the long edge
- Compress with https://squoosh.app, target under 200KB each
- Crop barber photos to 3:4 portrait, face toward the top of the frame

Tiles render as neutral grey boxes while images are missing, so the site
stays usable during the wait.

To change which gallery photos appear or how large each tile is, edit
`content/gallery.js`.
