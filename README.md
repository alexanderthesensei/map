# Interactive maps
This is our history project. Our professor saw something like this at a museum and wanted her own version.

## Architecture
The data is added by directly altering the source code. The reason for doing it this way instead of having a database is that
1. Doing it like this is easier and more safe, I have literally zero attack surface
2. When I stop actively maintaining this project, it won't die because I didn't pay for the server - the hosting on GitHub is free

It is stored in `src/data.json`.

## Adding new data
If you want to add any images, put it in the `public` directory first and commit that. The commit message must start with `data: `.

A map has an image and may have points (entries).
Each point has a title, a description and may contain one or more maps (placed inside `children`). If you want to put an image in it, wrap the url using the `imgToMap` function, like this:
```ts
imgToMap("https://upload.wikimedia.org/wikipedia/commons/4/44/Europe_orthographic_Caucasus_Urals_boundary_%28with_borders%29.svg")
```

Everything but the `children` (nested maps or images) can be generated using a [graphical editor](https://alexanderthesensei.github.io/map/edit) I made the other day.
There is no nesting support because that would make both the UI and the code way more complicated.
You fill in the data on the right, check that everything works on the left, copy the code on the bottom and put it inside the appropriate `children` field in `data.ts`.
