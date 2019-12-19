# Overview
This repository provides an example to reproduce this issue: https://github.com/abramenal/cypress-file-upload/issues/138

Namely, version 3.5.1 of [cypress-file-upload](https://github.com/abramenal/cypress-file-upload) breaks drag/drop handling
with Elm files.

There is a separate branch, [cypress-file-upload-3.5.0](https://github.com/yonigibbs/elm-drag-drop-cypress/tree/cypress-file-upload-3.5.0),
which downgrades from v3.5.1 to v3.5.0 of cypress-file-upload, and which _does_ work. The readme in that branch explains why.

# Instructions
## Starting the app
Run the following to start the app:
    
    npm run parcel

This will launch [Parcel](https://parceljs.org/), which will transpile the Elm code into JavaScript, then launch a dev
web server to serve up the page at http://localhost:1234

## Manual execution
When the page is loaded, simply drag/drop an image file onto the drop-zone (a rectange with a dashed border) and notice
that the name of the file is then shown under the "Upload Images" button. There's a sample JPG you can use here:
[cypress/fixtures/sample.jpg](cypress/fixtures/sample.jpg).

## Cypress execution
To launch Cypress run the following:

    npm run cypress:open

From there you can run the single test in this project, and notice that it fails.

## Debugging the failure
In Cypress, open the browser's Dev Tools and go to the Sources tab. In here open the JavaScript file created by Parcel
(which it will have put in the `/dist` folder). The name of this is randomly generated, and will be something like
`src.e31bb0bc.js`. In this file, search for this function (roughly at line 1650):
```
function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}
```
Put a conditional breakpoint on the `return` line, with this condition:
```
value.length === 1 && !!value[0].name
```
(The condition is required to ensure the debugger only stops here when a drop/drop operation completes.)

Now execute the test in the Cypress UI. When the breakpoint is hit, notice that `value` is a `FileList`, but this line
returns false:

    value instanceof FileList 

This is what causes this function to return false, and for the JavaScript generated by the Elm compiler to then reject
the drag/drop operation.

![Cypress browser devtools](https://user-images.githubusercontent.com/39593145/71176966-d8f07c80-2262-11ea-9ae0-3b4c3ffe7872.png)

## Elm
The Elm source code here is taken from one of the Elm examples showing how drag/drop can be handled:
https://elm-lang.org/examples/drag-and-drop. The only change has been the addition of the `data-cy` HTML attribute on a
couple of the elements, so they can be easily found by Cypress.
