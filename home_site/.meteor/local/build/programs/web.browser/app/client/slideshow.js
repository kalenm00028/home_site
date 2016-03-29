(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/slideshow.js                                                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var makeBSS = function (el, options) {                                 // 1
	var $slideshows = document.querySelectorAll(el),                      // 2
	    // a collection of all of the slideshow                           //
	$slideshow = {},                                                      // 3
	    Slideshow = {                                                     //
		init: function (el, options) {                                       // 5
			this.counter = 0; // to keep track of current slide                 // 6
			this.el = el; // current slideshow container                        // 7
			this.$items = el.querySelectorAll('figure'); // a collection of all of the slides, caching for performance
			this.numItems = this.$items.length; // total number of slides       // 9
			options = options || {}; // if options object not passed in, then set to empty object
			options.auto = options.auto || false; // if options.auto object not passed in, then set to false
			this.opts = {                                                       // 12
				auto: typeof options.auto === "undefined" ? false : options.auto,  // 13
				speed: typeof options.auto.speed === "undefined" ? 1500 : options.auto.speed,
				pauseOnHover: typeof options.auto.pauseOnHover === "undefined" ? false : options.auto.pauseOnHover,
				fullScreen: typeof options.fullScreen === "undefined" ? false : options.fullScreen,
				swipe: typeof options.swipe === "undefined" ? false : options.swipe
			};                                                                  //
                                                                       //
			this.$items[0].classList.add('bss-show'); // add show class to first figure
			this.injectControls(el);                                            // 21
			this.addEventListeners(el);                                         // 22
			if (this.opts.auto) {                                               // 23
				this.autoCycle(this.el, this.opts.speed, this.opts.pauseOnHover);  // 24
			}                                                                   //
		},                                                                   //
		showCurrent: function (i) {                                          // 27
			// increment or decrement this.counter depending on whether i === 1 or i === -1
			if (i > 0) {                                                        // 29
				this.counter = this.counter + 1 === this.numItems ? 0 : this.counter + 1;
			} else {                                                            //
				this.counter = this.counter - 1 < 0 ? this.numItems - 1 : this.counter - 1;
			}                                                                   //
                                                                       //
			// remove .show from whichever element currently has it             //
			// http://stackoverflow.com/a/16053538/2006057                      //
			[].forEach.call(this.$items, function (el) {                        // 37
				el.classList.remove('bss-show');                                   // 38
			});                                                                 //
                                                                       //
			// add .show to the one item that's supposed to have it             //
			this.$items[this.counter].classList.add('bss-show');                // 42
		},                                                                   //
		injectControls: function (el) {                                      // 44
			// build and inject prev/next controls                              //
			// first create all the new elements                                //
			var spanPrev = document.createElement("span"),                      // 47
			    spanNext = document.createElement("span"),                      //
			    docFrag = document.createDocumentFragment();                    //
                                                                       //
			// add classes                                                      //
			spanPrev.classList.add('bss-prev');                                 // 52
			spanNext.classList.add('bss-next');                                 // 53
                                                                       //
			// add contents                                                     //
			spanPrev.innerHTML = '&laquo;';                                     // 56
			spanNext.innerHTML = '&raquo;';                                     // 57
                                                                       //
			// append elements to fragment, then append fragment to DOM         //
			docFrag.appendChild(spanPrev);                                      // 60
			docFrag.appendChild(spanNext);                                      // 61
			el.appendChild(docFrag);                                            // 62
		},                                                                   //
		addEventListeners: function (el) {                                   // 64
			var that = this;                                                    // 65
			el.querySelector('.bss-next').addEventListener('click', function () {
				that.showCurrent(1); // increment & show                           // 67
			}, false);                                                          //
                                                                       //
			el.querySelector('.bss-prev').addEventListener('click', function () {
				that.showCurrent(-1); // decrement & show                          // 71
			}, false);                                                          //
                                                                       //
			el.onkeydown = function (e) {                                       // 74
				e = e || window.event;                                             // 75
				if (e.keyCode === 37) {                                            // 76
					that.showCurrent(-1); // decrement & show                         // 77
				} else if (e.keyCode === 39) {                                     //
						that.showCurrent(1); // increment & show                         // 79
					}                                                                 //
			};                                                                  //
		},                                                                   //
		autoCycle: function (el, speed, pauseOnHover) {                      // 83
			var that = this,                                                    // 84
			    interval = window.setInterval(function () {                     //
				that.showCurrent(1); // increment & show                           // 86
			}, speed);                                                          //
                                                                       //
			if (pauseOnHover) {                                                 // 89
				el.addEventListener('mouseover', function () {                     // 90
					interval = clearInterval(interval);                               // 91
				}, false);                                                         //
				el.addEventListener('mouseout', function () {                      // 93
					interval = window.setInterval(function () {                       // 94
						that.showCurrent(1); // increment & show                         // 95
					}, speed);                                                        //
				}, false);                                                         //
			} // end pauseonhover                                               //
		}                                                                    //
                                                                       //
	}; // end Slideshow object .....                                      //
                                                                       //
	// make instances of Slideshow as needed                              //
	[].forEach.call($slideshows, function (el) {                          // 105
		$slideshow = Object.create(Slideshow);                               // 106
		$slideshow.init(el, options);                                        // 107
	});                                                                   //
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);
