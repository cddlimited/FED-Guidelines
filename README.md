# CDD FED Guidelines


## Guidelines for Front-End Development

### Document is under construction!


The goal of the following document is to deal with our approach to writing managable and maintainable code in a unified way. It will cover syntax, formatting and anatomy, but also aims to align the mindframe and approach to writing and collaborating on code.

Key goals:

  - Stylesheets must be maintainable and readable
  - CSS must be written in a modular approach
  - Stylesheets must be scalable for future development

The following document is based on years of trial and errors, but also a collection of best practies and patterns inspired by [OOCSS], [SMACSS], [BEM], [MVCSS] and [inuitCSS]. [Harry Roberts CSS Guidelines] has also been a great help. Credits where credits due.


> Separate structure from skin, and create reusable modules 



## Version

0.1


## Contents
-----------

* General Overview
	* SASS
	* OOCSS		 
	* Naming Conventions
* The Workflow
* Yeoman generator
	* The base kit
* Building components
* Pattern library build
* Static site build
* Do's and Don't's
	
	
	

## General Overview
-----------

### SASS

The setup relies heavily on [Sass].

Sass allows us to split up our markup across multiple partials. It also lets you use variables and functions in your CSS, amongst other things. Read the [user guide] for a quick intro.

### OOCSS

The basic principle of Object Oriented CSS is to separate structure from the skin, creating reusable modules of code. Our goal is to [create a "tiny bootstrap" for each project], and to do this all our code must be reusable and modular.

Saying that, there will be many things that won't be modular. Break something into a module only if it would be useful in another context. Everything else remains an element or component inside a module.

Here's an example of a module, and three variants of the module (for different times of the day):


```
.meal {}

.meal--breakfast {}
.meal--lunch {}
.meal--dinner {}
```
Here is an example of one of these, and it's sub-modules

```
.meal--breakfast {}

.meal--breakfast__toast {}
.meal--breakfast__marmelade {}
```

##### When to make a module?

When sketching or wireframing the site you'll already have a pretty good idea of what to modularise. However, in many cases that will be done before you take on the build, so it's primarily when you write markup that you can manifest these ideas.

As you code the markup, focus on the logical modules (ignoring the grid system or overall containers they may reside within) and ask yourself the following:

* Can this piece of code be reused, for this site or even other sites?

If the answer is yes, then it should be a module. If the answer is no, then you don't need to spend too much efforts on modularising something entirely app specific don’t really lend well to re-use.

 

### Naming Conventions

Naming plays a big part in our approach.

Our approach is [csswizandry's take on the BEM syntax]. I suggest reading this article as it explains the concept really well.

* module-name
* module-name--variant
* module-name__component

#####A real-life example:

This is taken from the new [guardian.com responsive website]

The markup is for a single news item on the front-page. As you can see, it contains the components you would expect from a news container. A image and a headline, wrapped in a link to the article.



```
`<div class="item">
    <div class="item__container">
        <a href="http://" class="item__link">
            <div class="item__media-wrapper">
                <div class="item__image-container">
                    <img src="013.jpg"alt=""/>
                </div>
                <h2 class="item__title">
                    Will Self: my energy-drink addiction
                </h2>
            </div>
        </a>
        <div class="item__meta">
            <time class="item__timestamp" datetime="2014-06-15T19:55:00+0000">
                <span class="timestamp__text" title="Published: 15 Jun 2014">14h</span>
            </time>
        </div>
    </div>
</div>`

```
The benefits of this approach becomes quite clear. Any developer dropped into this project would immediately see what the below code is for, and how each component works together, without having to read through any project documentation first. 
In large builds, you may also typically find markup in template-files, and not in their logical place in the context of a complete page, which makes it even harder to know what you are looking at without this approach.


There are a lot of websites out there that have adopted this (or a variation of this) approach. I suggest using the inspector on a few of the following sites to see how they have done it:

* http://www.firstborn.com/
* https://github.com/guardian/frontend/tree/master/common/app/assets/stylesheets




## The Workflow
-----------

The Front-End workflow for a new build can be summarised like this:

* planning and project setup
* building the pattern library
	* building of modules
		* writing of the module markup
		* writing of the module CSS
		* writing of the module JavaScript
		* (repeat for all modules)
	* Combinging of modules to create templates/pages
	* Testing and sign-off of pattern library
* Production of static site from templates/pages 
	* Testing and sign-off of static site
* Deployment to staging for back-end wrapping
* Final round of testing after site has been wrapped



## Yeoman generator
-----------

The [CDD Yeoman generator] (Currently under construction) is designed to be a quick starting point for any new build. It’s goal is to ensure a consistent toolset is used across all our projects, and to include best practices from the outset using a combination of Yeoman, Bower, Grunt and grunt-tasks such as Autoprefixer, jslint, cssmin etc to make your life as easy as possible.

When ran, the generator will ask you a series of questions and scaffold a project depending on your requirements.

Below is a quick introduction and documentation of the generator, it’s contents and how to use it.


### The base kit

* Sass
* Bower
* Grunt

These three tools combined takes away a lot of the pains of FED and automates the things you don’t want to worry about.

The generated grunt script, when started, will do the following:

- watch and compile your Sass
- watch, jsLint and compile your Js
- Autoprefix the generated CSS. Never write another vendor-prefix!
- (optional) Open the site with a live reload-enabled server



## Building Components
-----------

When building modular components you always write the markup first, before writing any CSS.

### Responsiveness

SASS partial: `_breakpoints.scss`

When building modules, start with a narrow viewport, mobile screen. The best way to ensure a fluid experience across all the thousands of screen sizes and resolutions is to start small, resize the window until it doesn't look right, and then add a breakpoint where you make adjustments.

The default breakpoints are purposely named not to refer to any device or screen-size. You are free to amend these as you wish, but try to keep it generic. (I.E not `ipad 2` etc)

Example:

```
  .cell {
    
    display: block;
    width: 100%;

    @include breakpoint(teen-bear) { 
    	display: inline-block;
    	width: 50%;
    }
```

Keep doing this until you reach the maximum size.

Our breakpoints are defined in em's instead of px. This means if the user zooms in on the page, or otherwise changes the font-size, our breakpoints will trigger.

### Typography

SASS partial: `_fonts.scss`

http://guyroutledge.co.uk/blog/simplify-font-size-with-rems/

html { font-size: 62.5%; } 

font-size:62.5%




## Pattern Library
-----------

In most cases, you will be creating a pattern library with your modules.

This is part of our workflow for several reasons.

Every developer is going to lose track of their css/sass after a couple of weeks, even with the benefits of sass's modular files there's just a limit to how much you can keep in your head. (Did i already style one of these? If i change this padding, will it break something else? etc.)

A Pattern Library (extending a style guide) per project eliminates these pains, as well as streamline the FED workflow in several ways.

Firstly, it makes the Design -> FED more tightly coupled. A static PSD is great as a visual concept, but once that design has been worked into living HTML in a changing environment (with dynamic data), it gives everyone a more accurate idea of what the finished site will look like.

Seeing the components in the browser allows for adjustments and tweaks to be picked up rapidly as the components are developed, and not all at the end once the whole site has been stitched together (and making even small changes can be a nightmare).

The workflow win is just one of several gains:

* Rapid development: As mentioned, when you start a build, you knock up the components in a style/guide/pattern library that can then be reviewed by the designer before you glue them together.
* Easier testing: Each component could be easily tested in a controlled environment where you can get each component right for it's own sake.
* No more duplication of code: How many times have you written a new rule because you've been afraid to override an existing rule?
* Future-proof! makes the life of anyone picking the project up after completion a lot easier. They can see the components with the accompanying markup, and making tweaks should be easy.

I’ve attached a picture i took of an excellent article from the newest net magazine at the bottom of this doc. I recommend the read, it’s where most of this write-up comes from.

####Getting started

We're using [pattern lab] for our implementation.  

####References:

This is an example of a beautiful pattern library, made my Mailchimp, for their site: [http://ux.mailchimp.com/patterns/]

Another great example, by lonely planet [http://rizzo.lonelyplanet.com/styleguide/]

Pattern library introduction: [http://boagworld.com/design/pattern-library/]

A list apart article on pattern libraries: [http://alistapart.com/blog/post/getting-started-with-pattern-libraries]

Entertainment Weekly build process using patternlab.io: [http://bradfrostweb.com/blog/post/entertainment-weekly/]


	
## static site build
-----------
## Do's and Don't's
-----------









### Don't do it!
-----------

* Don't let ID's anywhere near your CSS. This will come back to bite you (or someone else)
* Avoid nested SASS unless it makes sense, and never more than 3-4 levels. Unless it actually needs to be nested, don't. Your css output will have long selectors that will be hard to override down the line.
Use variables instead of colours and things that might change.

* Instead of 'color: blue', use 'color: $primary', and define primary in your variables partial. If the colour changes, no need to find-replace. Same goes for things like test-transform, font sizes and any global attributes.

* Avoid heights on anything but assets like images and videos. It’s a good idea to let the content control the height of it’s container. You'll thank yourself when the content changes and the design doesn't break. An example would be a navigation bar. Let the line-height of the `<a>` tags push the container and surrounding `<li>` up and down. If you have to specify height, in most cases you could probably use line-height.



***

---

- - - -

***

---

- - - -




[OOCSS]:https://github.com/stubbornella/oocss
[SMACSS]:https://smacss.com/
[BEM]:http://bem.info/method/
[MVCSS]:http://mvcss.github.io/
[inuitCSS]:https://github.com/csswizardry/inuit.css
[Harry Roberts CSS Guidelines]:https://github.com/csswizardry/CSS-Guidelines
[User Guide]:http://sass-lang.com/guide
[Sass]:http://sass-lang.com/
[grunt.js]:http://gruntjs.com/
[create a "tiny bootstrap" for each project]:http://daverupert.com/2013/04/responsive-deliverables/
[http://ux.mailchimp.com/patterns/]:http://ux.mailchimp.com/patterns/
[http://boagworld.com/design/pattern-library/]:http://boagworld.com/design/pattern-library/
[http://alistapart.com/blog/post/getting-started-with-pattern-libraries]:http://alistapart.com/blog/post/getting-started-with-pattern-libraries
[http://bradfrostweb.com/blog/post/entertainment-weekly/]:http://bradfrostweb.com/blog/post/entertainment-weekly/
[http://rizzo.lonelyplanet.com/styleguide/]:http://rizzo.lonelyplanet.com/styleguide/
[pattern lab]:http://patternlab.io/
[csswizandry's take on the BEM syntax]:http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
[guardian.com responsive website]:http://www.theguardian.com/uk?view=mobile
[CDD Yeoman generator]:https://github.com/cddlimited/generator-cdd
