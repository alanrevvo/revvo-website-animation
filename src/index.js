var viz = require('./viz');
var blower = require('./util/blower');
var $ = require('jquery');

function display(domElement, width, height) {
  const transitionHighlights = {
    collect: "collect",
    analyze: "analyze",
    clean: "analyze",
    display: "display"
  };
  
  function fadeOut(trigger) {
    // Fade out the last explanation, and unhighlight the appropriate control
    $('#' + trigger + '-explanation').fadeOut(100);
    $('#' + trigger + '-control').removeClass("viz-control-active");
  }

  function fadeIn(trigger) {
    // Fade in the new explanation, and highlight the appropriate control
    $('#' + trigger + '-explanation').animate('opacity',150).fadeIn(500);
    $('#' + trigger + '-control').addClass("viz-control-active");
  }				

  $(function() {	
	const triggerStates = {
		'collect': viz.examples.multipleTires(),
		'analyze': viz.examples.multipleTiresToCloud(),
		'display': viz.examples.graphs()
	}
	
	for (var trigger in triggerStates) {
		if (!triggerStates.hasOwnProperty(trigger)) {
			continue;
		}
		var state = triggerStates[trigger];
		state.preInit = ((trigger) => {
			return () => fadeIn(trigger);
		})(trigger);
		state.postDestroy = ((trigger) => {
			return () => fadeOut(trigger);
		})(trigger);
	}
	
	// Register the image if desired
	const image = new Image();
	image.src = "images/revvo_bug_black_75.jpg";
	image.onload = function() {
		const animation = viz.animate({
			domElement: domElement,
			width: width,
			height: height,
			states: [
				viz.examples.scatter(),
				triggerStates['collect'],
				triggerStates['analyze'],
				triggerStates['display'],
				viz.examples.staticText("Revvo"),
				viz.examples.image(image)
			],
			repeat: true,
			initCallback: function(goToState) {
				// Register visualization controls
				$('.viz-control').bind('click', function(){
					var id = $(this).attr('id').split('-')[0];
					var state = triggerStates[id];
					goToState(state);
				});
			},
			blowEnabled: true
		});
		animation.start();
	};
  }); // dom ready
}

function message(domElement, width, height, messageText) {
  $(function() {
    animation = viz.animate({
      domElement: domElement,
      width: width,
      height: height,
      states: [viz.examples.scrollingText(messageText)],
      repeat: true,
      blowEnabled: true,
    });
    
    animation.start();
  });
}

module.exports = {
  display: display,
  message: message
};
