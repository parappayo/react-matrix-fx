# react-matrix-fx

Renders some Matrix-like scrolling effects in a canvas element.

## Usage

From your React app root dir, install this module using npm:

`npm install git+https://github.com/parappayo/react-matrix-fx.git`

In your main React app file (eg. `src/App.js`) import the component and render it:

```
import MatrixFx from '@parappayo/react-matrix-fx';

// ...

function App() {
  return (
    <div className="App">
      <MatrixFx />
    </div>
  )
};
```

If you do not already have a React app project and would like to create one with a minimum of effort, look for `create-react-app` which can be installed with npm.

## Dev Setup

This project uses a typical npm package setup:

* `npm install` to fetch dependency packages
* `npm run build` will populate `lib/` with build output
* `src/` contains the source code

Babel is used as a transpiler.

There are no tests, so by the Michael Feathers definition, this project is legacy code.

## References

* [The Matrix](https://www.imdb.com/title/tt0133093/)
* [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)
* [Babel](https://babeljs.io/)
