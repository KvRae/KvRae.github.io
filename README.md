# KvRae

Link: https://karam-mannai.kvrae.social/
![website](https://user-images.githubusercontent.com/58667227/177841015-fab45af0-36a1-432b-8d40-b7a8c2cf78f9.jpeg)

This is the source code to my personal blog and website.

## How it's built

### Data

A majority of the website's page content is stored in the `/data/` directory in HTML or MD files. I started with HTML but soon decided that Markdown would be more future proof as it could easily be ported between websites without much work. It allows also the viewing of the content on GitHub in a pretty way.

The `/data/` folder also contains `JSON` files which describe the pages that there are. For examaple, `blog.json` looks something like this:

```
{
    "path": "/blog",
    "name": "blog",
    "pageTitle": "Blog",
    "pageGroup": "blog",
    "metaDescription": "Read about my latest thoughts and experiences in the world of web development.",
    "controller": "blogs"
}
```

This file defines that if the website is visited at `/blog/`, then a page will be returned using the `blogs` controller.

I used this approach to avoid the overhead of using a database.

### Views

Built using [EJS](https://ejs.co/).

### Sass/CSS

[Sass](https://sass-lang.com/) is used to style the website. [Susy](https://www.oddbird.net/susy/) is used as the grid system to give me full control of the website.

### JS

Nothing fancy here, just [pure.js](https://pure-js.com/).

### Gulp

[Gulp](https://gulpjs.com/) is used for development. I must warn anyone that the gulpfile got a little out of hand - it's been made pretty by using [Blessed](https://github.com/chjj/blessed) to make windows in the terminal window which data is printed to.

![Gulp - using Blessed to create a fancy terminal interface](/.github/project/gulp.png)

Running `npm start` (which runs `gulp --silent`) compiles the SCSS, JS and starts the website. Make sure to run `npm install` before trying this.

## Misc

### IIS

IIS is used to run the live site as I already have a Windows server. This is done by using IISNode and changing the `/server/config.js` `type` to `iis`.

I actually have a whole blog post on how you can setup IIS to run NodeJS websites using NodeJS: https://harveywilliams.net/blog/installing-iisnode

## Contributing

Found a bug on my site? Think there's a feature missing? Found a typo in a blog post? File an issue or send me a pull request!
