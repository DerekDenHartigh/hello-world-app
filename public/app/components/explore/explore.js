"use strict";

function ExploreController(helloWorldService) {
   

}


angular
.module('HelloWorldApp')  
.component('explore', {
    template: `
    <div class="headerdiv">
    <div class="globe"><img class="imgGlobe" src="helloworld copy.png"></div>
    </div>
<div class ="hellocircle">Hello World</div>

<div id="mainColumns" class="flex2">
    <translate class="flex"></translate>
    <display-data class="flex"></display-data>
</div> 
        `,
    controller: ExploreController
});