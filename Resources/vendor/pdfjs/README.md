How to host PDF.js locally for the viewer

This viewer prefers local PDF.js files if present. To host PDF.js locally:

1. Download the production builds of PDF.js (matching versions are best).
   - A convenient source is the official PDF.js GitHub releases: https://github.com/mozilla/pdf.js/releases
   - Download the `pdf.min.js` and `pdf.worker.min.js` files from the `build/` folder of the release you want.

2. Place the files into this folder:
   Resources/vendor/pdfjs/
   - pdf.min.js
   - pdf.worker.min.js

3. Verify the paths: the viewer expects the files at `Resources/vendor/pdfjs/pdf.min.js` and `Resources/vendor/pdfjs/pdf.worker.min.js`.

4. The viewer will automatically try the local files first. If they are not present it will fall back to a CDN copy.

Quick helper (Windows PowerShell)

I added a small PowerShell helper script `download_pdfjs.ps1` which can download the two required files from cdnjs:

1. Open PowerShell in the `Resources/vendor/pdfjs/` folder.
2. Run:

   .\download_pdfjs.ps1 -Version 2.16.105 -Destination .\

3. Confirm the files `pdf.min.js` and `pdf.worker.min.js` exist in this folder.

Notes
- Hosting the worker file locally avoids cross-origin and SRI issues and is recommended for production.
- PDF.js is Apache-2.0 licensed. Review the license if you redistribute the library.
- If you'd like, I can commit the PDF.js files into the repo for you (they're permissively licensed). Tell me and I'll add them.
How to host PDF.js locally for the viewer

This viewer prefers local PDF.js files if present. To host PDF.js locally:

1. Download the production builds of PDF.js (matching versions are best).
   - A convenient source is the official PDF.js GitHub releases: https://github.com/mozilla/pdf.js/releases
   - Download the `pdf.min.js` and `pdf.worker.min.js` files from the `build/` folder of the release you want.

2. Place the files into this folder:
   Resources/vendor/pdfjs/
   - pdf.min.js
   - pdf.worker.min.js

3. Verify the paths: the viewer expects the files at `Resources/vendor/pdfjs/pdf.min.js` and `Resources/vendor/pdfjs/pdf.worker.min.js`.

4. The viewer will automatically try the local files first. If they are not present it will fall back to a CDN copy.

Notes
- Hosting the worker file locally avoids cross-origin and SRI issues and is recommended for production.
- PDF.js is Apache-2.0 licensed. Review the license if you redistribute the library.
- If you want me to add the library files into the repo for you, I can (they're permissively licensed), but I can't fetch them automatically in this environment—please confirm and I will add placeholders or instructions to commit them locally.
