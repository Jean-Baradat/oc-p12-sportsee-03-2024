# 7-1 pattern
#### Documentary resources
- [structurez-sass-avec-le-systeme-7-1](https://louisetiennegirard.fr/blog/structurez-sass-avec-le-systeme-7-1)
- [Use the 7-1 pattern for a manageable codebase](https://openclassrooms.com/fr/courses/5625786-produce-maintainable-css-with-sass/5723581-use-the-7-1-pattern-for-a-manageable-codebase)


```
sass/
|
|– base/
|   |– _reset.scss       # Reset/normalize
|   |– _typography.scss  # Typography rules
|   ...                  # Etc…
|
|– components/
|   |– _buttons.scss     # Buttons
|   |– _carousel.scss    # Carousel
|   |– _cover.scss       # Cover
|   |– _dropdown.scss    # Dropdown
|   ...                  # Etc…
|
|– layout/
|   |– _navigation.scss  # Navigation
|   |– _grid.scss        # Grid system
|   |– _header.scss      # Header
|   |– _footer.scss      # Footer
|   |– _sidebar.scss     # Sidebar
|   |– _forms.scss       # Forms
|   ...                  # Etc…
|
|– pages/
|   |– _home.scss        # Home specific styles
|   |– _contact.scss     # Contact specific styles
|   ...                  # Etc…
|
|– themes/
|   |– light-theme/
|       |– _light.scss   # Theme light
|   |– dark-theme/
|       |– _dark.scss    # Theme dark
|   ...                  # Etc…
|
|– utils/
|   |– _variables.scss   # Sass Variables
|   |– _functions.scss   # Sass Functions
|   |– _mixins.scss      # Sass Mixins
|   |– _helpers.scss     # Class & placeholders helpers
|
|– vendors/
|   |– _bootstrap.scss   # Bootstrap
|   |– _jquery-ui.scss   # jQuery UI
|   ...                  # Etc…
|
|
`– index.scss            # Primary Sass file
```

# Import order in index.scss

1. utils
   1. variables
   2. functions
   3. mixins
   4. helpers
2. vendors
3. base
4. components
5. layout
6. pages
7. themes
