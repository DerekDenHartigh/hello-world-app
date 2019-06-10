"use strict";

function EventsController(helloWorldService) {
    const ctrl = this;
    ctrl.service = helloWorldService;
    
    }

angular
.module('HelloWorldApp')  
.component('events', {
    templateUrl: '/app/components/events/eventsTemplate.html',
    controller: EventsController
});