# FED-Guidelines 

Frontend code structure for FED-Guidelines. 

Generated 23 February 2015 using [Frontend.md](http://github.com/animade/frontend-md)

---

### Stylesheets

````
styles/
|- application.scss _________________________ # SCSS Imports for (projectName)
|- _inbox.scss ______________________________ # Inbox (shame file)
styles\vendor/
|- _external.scss ___________________________ # External styles
styles\modules/
|- _module.scss _____________________________ # Example module
styles\mixins/
|- _breakpoints.scss ________________________ # Responsive breakpoints.
|- _typography.scss _________________________ # Typography mixins
|- _utilities.scss __________________________ # General helper mixins
styles\foundation/
|- _attributes.scss _________________________ # Global Attribute Modifiers
|- _base.scss _______________________________ # Base-level tags
|- _config.scss _____________________________ # Global Settings
styles\core/
|- _grid.scss _______________________________ # CSSWizandry grids
|- _helpers.scss ____________________________ # Helpers (placeholders)
|- _normalise.scss __________________________ # normalize.css v3.0.0 | MIT License | git.io/normalize
|- _print.scss ______________________________ # Print media styles
````

### Javascripts

````
scripts/
|- main.js __________________________________ # Script loader
|- moduleA.js _______________________________ # Module A (example)
|- moduleB.js _______________________________ # Module B (example)
|- myApp.js _________________________________ # Main Application
````