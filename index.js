function randomLetters() {
    return d3.shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
      .slice(0, Math.floor(6 + Math.random() * 20))
      .sort();
  }

function automaton_data(ruleno) {
    var map = rule_map(ruleno);
    var data = []
    var init = Array(Math.ceil(screen.width/6)).fill('0');
    init[Math.ceil(screen.width/12)]='1';
    data.push(init);
    // data.push(Array.from({length: 10}, () => Math.floor(Math.random() * 2)).map(String));
    for (var i=0; i<Math.ceil(screen.height/6); i++){
        var inputs = data.slice(-1)[0];
        var outputs = []
        for (const x of inputs.keys()){
            var ink = inputs.slice(x-1,x+2).join("");
            out = '0';
            if (map[ink]){
                out = map[ink];
            }
            outputs.push(out);
        }
        data.push(outputs);    
    }
    return data;
}

function gridData(data_old) {
    var data = new Array();
    var xpos = 0; 
    var ypos = 0;

    for (var row of data_old.keys()) {
        data.push( new Array() );

        for (var column of data_old[0].keys()) {
            data[row].push({
                x: xpos,
                y: ypos,
                value : data_old[row][column]                
            })
            xpos += 1;
        }
        xpos = 0;
        ypos += 1; 
    }
    return data;
}

var cellular_automaton = function(){
    var ruleno = Math.floor(Math.random() * 256);
    console.log('Selected Rule No:', ruleno);
    
    var data = automaton_data(ruleno);

    data_grid = gridData(data);
    
    var grid = d3.select('#atomaton')
        .append("svg")
        .attr("width","100%")
        .attr("height","100%")
    

    cellSize = 6;
    buffer = 0  
    var row = grid.selectAll(".row")
        .data(data_grid)
        .enter().append("g")
        .attr("class", "row")

    var column = row.selectAll(".square")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("class","square")
        .attr("x", function(d) { return d.x * cellSize - buffer ; })
        .attr("y", function(d) { return d.y * cellSize -buffer  ; })
        .attr("width", function(d) { return cellSize; })
        .attr("height", function(d) { return cellSize; })
        .style("fill", function(d) {  if (d.value == 1){return '"#fff"' }else { return "rgb(253 253 253)"}})
        .style("stroke", "#222");
    
    
    
}

var rule_map = function(ruleno) {
    var outputs = dec2bin(ruleno, '00000000').split("").reverse();
    var map = {};
    for (const x of Array(8).keys()){
        map[dec2bin(x, '000')] = outputs[x];
    }
    return map;
}

function dec2bin(dec, substring){
    dec = dec.toString(2);
    dec = substring.substr(dec.length) + dec;
    return dec;
}

cellular_automaton();
