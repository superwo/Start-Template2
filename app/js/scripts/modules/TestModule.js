import $ from 'jquery';

class TestModule {
  constructor() {
    // cache elements from page
    this.titles = $('h1');

    this.events();
  }

  events() {
    this.titles.on('click', this.logSomething);
  }

  // custom functions
  logSomething() {
    console.log("You clicked me!");
  }
}

export default TestModule;
