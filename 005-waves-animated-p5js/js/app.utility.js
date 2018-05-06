"use strict";

var app = window.app || {};

app.utility = {
    
    sortableDateTimeString: function(date){
        
        if(date === undefined || date === null){
            date = new Date();
        }
        
        var MM = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1).toString();
        var dd = (date.getDate() < 10 ? "0" : "") + date.getDate().toString();
        var hh = (date.getHours() < 10 ? "0" : "") + date.getHours().toString();
        var mm = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes().toString();
        var ss = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds().toString();
        
        return [date.getFullYear(), MM, dd, ".", hh, mm, ss].join("");
    },
}