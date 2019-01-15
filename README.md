# britecore-engineering-application

## My Approach
This is the very first project I've ever worked with Vue. I tried to keep it as
simple as possible. The architecture is as Vue-CLI generates by itself.

### `App` Component:

1. Adds the icons from `font-awesome` to be used by the `DataTable` component;
2. Loads the Payments JSON and passes it to the `DataTable` component;
3. Finds which labels to insert in the table through the first item of the payments list, thanks to
`Object.keys()` method;
4. Has some default CSS.


### `DataTable` Component:

1. Gets the props from its parent component;
2. Has all CSS definitions for the table itself;
3. Contains all necessary functionalities to make the Data Table work.

### Reusability

The `DataTable` component is reusable. Through mapping the Object keys of a data entry
is possible to get the table header labels automatically.

### Functionalities
* The description field is editable as requested;
* It is possible to search across the table by the Name property;
* All columns are sortable;
* Two filters have been implemented: year (from 2017 to 2019) and amount (several ranges);
* The user may combine filters. By searching for a specific name entry, selecting a Date filter and 
specifing an amount, the results are displayed considering all selected filters;
* Responsive (as a table may be);
* UX: I tried to keep the Design Patterns used by BriteCore.

### Deployment
The project is available online through Heroku: https://britecore-engineering-luciano.herokuapp.com/
I have decided to use Heroku Git method of deployment.

## Follow-up Questions

__How long did you spend on the test? Would you do anything differently if you had more time?__

I spent approximately 1 week on this test. I actually started doing it by the end of December 2018,
but a medical accident stopped me from finishing it early.

I would have definitely improved the usability of the DataTable. On desktop it is really good,
but it could be better on mobile. Also it would be nice to implement some more tests. Since this is my first time with Vue,
I am sure that my code could look better too. 

__In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?__

The way I designed my component it is already somewhat reusable. If I had more time,
it would be nice to develop a helper interface so users could use this DataTable with any data they want.

__What is one CSS property that you recently learned about that helped you solve a problem?__

Well, I am a big fan of CSS. One property I really like is `clip-path`. It allows the developer to "cut" some regions of an element.
Too bad it isn't compatible with most browsers. Other than that, `text-indent` is really nice too.

   
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

