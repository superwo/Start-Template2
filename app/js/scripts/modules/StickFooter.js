import $ from 'jquery';

class StickFooter {
  constructor() {
    // cache elements from page
    this.wind = $(window);
    this.main_content = $('.maincontent');

    this.events();
  }

  events() {
    this.wind.on('load', this.hf.bind(this));
    this.wind.on('resize', this.hf.bind(this));
  }

  // custom functions
  hf() {
    var h_header = $('.mainheader').height();
    var h_footer = $('.mainfooter').height();
    this.main_content.css({
      'paddingTop': h_header,
      'paddingBottom': h_footer
    });
  }
}

export default StickFooter;
