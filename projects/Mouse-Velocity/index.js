$(document).ready(runProgram); 

function runProgram(){

    /* ---------------------------------------------------------------------- */
    /*                                  setup                                 */
    /* ---------------------------------------------------------------------- */

    let doc = {
        FRAME_RATE: 5,
    }
    const FRAMES_PER_SECOND_INTERVAL = 1000 / doc.FRAME_RATE;

    let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);

    /* ---------------------------------------------------------------------- */
    /*                               core logic                               */
    /* ---------------------------------------------------------------------- */

    function newFrame(){
        mouseDetection();
    }

    /* ---------------------------------------------------------------------- */
    /*                               extra logic                              */
    /* ---------------------------------------------------------------------- */

    function mouseDetection(){
        var lastmousex=-1; 
        var lastmousey=-1;
        var mousetravel = 0;

        $('html').mousemove(function(e) {
            var mousex = e.pageX;
            var mousey = e.pageY;

            if (lastmousex > -1)
                mousetravel += Math.max( Math.abs(mousex-lastmousex), Math.abs(mousey-lastmousey) ) / 2;
            
            lastmousex = mousex;
            lastmousey = mousey;
            
            $("#position").css('background-color', `rgba(${mousetravel}, ${mousetravel}, ${mousetravel}, ${255 - mousetravel})`);
           
            return mousetravel;
        });
       
        /*
        var mouseX;
        var mouseY;
        
        $(document).mousemove(function(event) {
            
            $("#position").text(event.pageX + ":X" + " " + event.pageY + ":Y");

            mouseX = event.pageX;
            mouseY = event.pageY;
        })

        return [mouseX, mouseY];
        */
    }

















    function endProgram() {
        // stop the interval timer
        clearInterval(interval);
        // turn off event handlers
        $(document).off();
    }
}