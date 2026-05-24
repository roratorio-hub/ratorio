import { myInnerHtml } from '../../common/js/util.js';

window.addEventListener('DOMContentLoaded', function() {

    for(var j=1;j<=4;j++){
        for(var i=0;i<=9;i++){
            for(var k=0;k<=9;k++){
                zokusei[i*10+j][k] = zokusei[i*10+j][k] + 100;
                if(zokusei[i*10+j][k] > 100)
                    zokusei[i*10+j][k] = "<Font color='#0000FF'><B>" + zokusei[i*10+j][k] +"</B></Font>";
                if(zokusei[i*10+j][k] < 100)
                    zokusei[i*10+j][k] = "<Font color='#FF0000'>" + zokusei[i*10+j][k] +"</Font>";
            }
        }
    }

    var k=0;
    for(var j=1;j<=4;j++){
        var CBIstr = "<B>防御属性Lv</B>"+ j +"<TABLE border=1>";
        var nameA = ["無","水","地","火","風","毒","聖","闇","念","死"];
        CBIstr += "<TR bgcolor='#AAAAFF'>";
        CBIstr += "<TD><BR></TD>";
        for(var m=0;m<=9;m++)
            CBIstr += "<TD><Font size=2>" + nameA[m] +"</Font></TD>";
        CBIstr += "</TR>"
        for(var i=0;i <= 9;i++){
            if(k % 2 == 0)
                CBIstr += "<TR bgcolor='#DDDDFF'>";
            else
                CBIstr += "<TR>";
            CBIstr += "<TD><Font size=2>" + nameA[i] +"</Font></TD>";
            for(m=0;m<=9;m++)
                CBIstr += "<TD><Font size=2>" + zokusei[m * 10 + j][i] + "</Font></TD>";
            CBIstr += "</TR>"
            k++;
        }
        CBIstr += "</TABLE>";
        myInnerHtml("a"+j,CBIstr,0);
        k=0;
    }

}); // DOMContentLoaded
