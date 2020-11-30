var width = 1800;
var height = 1600;

var font_size = '13px';
var font_color = "black";
var line_width = 0.5;
var line_color = "#ABB2B9";
var circle_color = "black"

var states = ["Uttar Pradesh", 'Madhya Pradesh', 'Maharashtra', 'Gujarat', 'Delhi', 'Andhra Pradesh', 
        'Rajasthan', 'Kerala', 'Uttarakhand', 'Tamil Nadu', 'Odisha', 'Karnataka', 'Telangana'];



var svg = d3.select("#my_dataviz")
            .append("svg")
            .attr('height', height)
            .attr('width', width);

var parent_group = svg.append('g')
                      .attr('height', height)
                      .attr('width', width)
                      .attr('class', 'parent_group');



var text_group = parent_group.append('g').attr('class', 'text-group');
var line_group = parent_group.append('g').attr('class', 'line-group');
var circle_group = parent_group.append('g').attr('class', 'circle-group');


var circ_scale = d3.scaleLog().domain([10, 60000000]).range([0, 100]);

const btns = document.querySelectorAll('button');
var activity = "1516";

var top_states = [];
var states_dict = {};
var keys_arr = []


d3.csv("data_languages/state_v_language_17_18.csv", function(data_17_18){
    d3.csv("data_languages/state_v_language_15_16.csv", function(data_15_16){
        d3.csv("data_languages/state_v_language_13_14.csv", function(data_13_14){
            d3.csv("data_languages/state_v_language_14_15.csv", function(data_14_15){
                d3.csv("data_languages/state_v_language_16_17.csv", function(data_16_17){


        btns.forEach(btn => {
            btn.addEventListener("click", e => {
                //get activity
                activity = e.target.dataset.activity;
                
        
                // remove and add active class
                btns.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                if(activity == '1516'){
                    var top_states = [];
                    var states_dict = {};
                    var keys_arr = []
                    data_massage(top_states, states_dict, data_15_16);
                    
                    d3.selectAll('.language_text').remove();
                    d3.selectAll('.v_lines').remove();
                    d3.selectAll('.state_text').remove();
                    d3.selectAll('.h_lines').remove();
                    d3.selectAll('.circs').remove();

                    making_lines_texts(top_states);
        
                    keys_arr = Object.keys(top_states[0]);
                    var index = keys_arr.indexOf('States');
                    keys_arr.splice(index, 1);
                    var index = keys_arr.indexOf('Total');
                    keys_arr.splice(index, 1);
        
                    making_circles(top_states, keys_arr);

                    const tip = d3.tip()
                   .attr('class', 'tip card')
                   .html((d) => {
                  //console.log(d)
                        return `<p>circulation : ${d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>`
                        })
                    parent_group.call(tip)

                    parent_group.selectAll('circle')
                        .on('mouseover', (d,i,n) => {
                            //console.log(n[i])
                            //console.log(n[i].getAttribute("opacity"))
                            var mystr = String(n[i].getAttribute("id"))
                            tip.show(mystr, n[i]);
                            handleMouseOver(d,i,n)
                        })
                        .on('mouseout', (d,i,n) => {
                            tip.hide();
                            handleMouseOut(d,i,n)
                        });

                    
        
                }
                else if(activity == '1718'){
                    var top_states = [];
                    var states_dict = {};
                    var keys_arr = []
                    data_massage(top_states, states_dict, data_17_18);

                    d3.selectAll('.language_text').remove();
                    d3.selectAll('.v_lines').remove();
                    d3.selectAll('.state_text').remove();
                    d3.selectAll('.h_lines').remove();
                    d3.selectAll('.circs').remove();
                    making_lines_texts(top_states);
        
                    keys_arr = Object.keys(top_states[0]);
                    var index = keys_arr.indexOf('States');
                    keys_arr.splice(index, 1);
                    var index = keys_arr.indexOf('Total');
                    keys_arr.splice(index, 1);
        
                    making_circles(top_states, keys_arr);

                    const tip = d3.tip()
                   .attr('class', 'tip card')
                   .html((d) => {
                  //console.log(d)
                        return `<p>circulation : ${d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>`
                        })
                    parent_group.call(tip)

                    parent_group.selectAll('circle')
                        .on('mouseover', (d,i,n) => {
                            //console.log(n[i])
                            //console.log(n[i].getAttribute("opacity"))
                            var mystr = String(n[i].getAttribute("id"))
                            tip.show(mystr, n[i]);
                            handleMouseOver(d,i,n)
                        })
                        .on('mouseout', (d,i,n) => {
                            tip.hide();
                            handleMouseOut(d,i,n)
                        });
                }

                else if(activity == '1314'){
                    var top_states = [];
                    var states_dict = {};
                    var keys_arr = []
                    data_massage(top_states, states_dict, data_13_14);

                    d3.selectAll('.language_text').remove();
                    d3.selectAll('.v_lines').remove();
                    d3.selectAll('.state_text').remove();
                    d3.selectAll('.h_lines').remove();
                    d3.selectAll('.circs').remove();
                    making_lines_texts(top_states);
        
                    keys_arr = Object.keys(top_states[0]);
                    var index = keys_arr.indexOf('States');
                    keys_arr.splice(index, 1);
                    var index = keys_arr.indexOf('Total');
                    keys_arr.splice(index, 1);
        
                    making_circles(top_states, keys_arr);

                    const tip = d3.tip()
                   .attr('class', 'tip card')
                   .html((d) => {
                  //console.log(d)
                        return `<p>circulation : ${d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>`
                        })
                    parent_group.call(tip)

                    parent_group.selectAll('circle')
                        .on('mouseover', (d,i,n) => {
                            //console.log(n[i])
                            //console.log(n[i].getAttribute("opacity"))
                            var mystr = String(n[i].getAttribute("id"))
                            tip.show(mystr, n[i]);
                            handleMouseOver(d,i,n)
                        })
                        .on('mouseout', (d,i,n) => {
                            tip.hide();
                            handleMouseOut(d,i,n)
                        });
                }

                else if(activity == '1415'){
                    var top_states = [];
                    var states_dict = {};
                    var keys_arr = []
                    data_massage(top_states, states_dict, data_14_15);

                    d3.selectAll('.language_text').remove();
                    d3.selectAll('.v_lines').remove();
                    d3.selectAll('.state_text').remove();
                    d3.selectAll('.h_lines').remove();
                    d3.selectAll('.circs').remove();
                    making_lines_texts(top_states);
        
                    keys_arr = Object.keys(top_states[0]);
                    var index = keys_arr.indexOf('States');
                    keys_arr.splice(index, 1);
                    var index = keys_arr.indexOf('Total');
                    keys_arr.splice(index, 1);
        
                    making_circles(top_states, keys_arr);

                    const tip = d3.tip()
                   .attr('class', 'tip card')
                   .html((d) => {
                  //console.log(d)
                        return `<p>circulation : ${d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>`
                        })
                    parent_group.call(tip)

                    parent_group.selectAll('circle')
                        .on('mouseover', (d,i,n) => {
                            //console.log(n[i])
                            //console.log(n[i].getAttribute("opacity"))
                            var mystr = String(n[i].getAttribute("id"))
                            tip.show(mystr, n[i]);
                            handleMouseOver(d,i,n)
                        })
                        .on('mouseout', (d,i,n) => {
                            tip.hide();
                            handleMouseOut(d,i,n)
                        });
                }

                else if(activity == '1617'){
                    var top_states = [];
                    var states_dict = {};
                    var keys_arr = []
                    data_massage(top_states, states_dict, data_16_17);

                    d3.selectAll('.language_text').remove();
                    d3.selectAll('.v_lines').remove();
                    d3.selectAll('.state_text').remove();
                    d3.selectAll('.h_lines').remove();
                    d3.selectAll('.circs').remove();
                    making_lines_texts(top_states);
        
                    keys_arr = Object.keys(top_states[0]);
                    var index = keys_arr.indexOf('States');
                    keys_arr.splice(index, 1);
                    var index = keys_arr.indexOf('Total');
                    keys_arr.splice(index, 1);
        
                    making_circles(top_states, keys_arr);

                    const tip = d3.tip()
                   .attr('class', 'tip card')
                   .html((d) => {
                  //console.log(d)
                        return `<p>circulation : ${d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>`
                        })
                    parent_group.call(tip)

                    parent_group.selectAll('circle')
                        .on('mouseover', (d,i,n) => {
                            //console.log(n[i])
                            //console.log(n[i].getAttribute("opacity"))
                            var mystr = String(n[i].getAttribute("id"))
                            tip.show(mystr, n[i]);
                            handleMouseOver(d,i,n)
                        })
                        .on('mouseout', (d,i,n) => {
                            tip.hide();
                            handleMouseOut(d,i,n)
                        });
                }



            })
        })


        data_massage(top_states, states_dict, data_15_16);
        making_lines_texts(top_states);

        keys_arr = Object.keys(top_states[0]);
        var index = keys_arr.indexOf('States');
        keys_arr.splice(index, 1);
        var index = keys_arr.indexOf('Total');
        keys_arr.splice(index, 1);

        making_circles(top_states, keys_arr);

        //d3.selectAll('.language_text').remove();

        svg.selectAll('.parent_group').attr('transform', 'translate(160,-120)');

        const tip = d3.tip()
                   .attr('class', 'tip card')
                   .html((d) => {
                  //console.log(d)
                  return `<p>circulation : ${d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>`
              })
        parent_group.call(tip)

        parent_group.selectAll('circle')
            .on('mouseover', (d,i,n) => {
                //console.log(n[i])
                //console.log(n[i].getAttribute("opacity"))
                var mystr = String(n[i].getAttribute("id"))
                tip.show(mystr, n[i]);
                handleMouseOver(d,i,n)
            })
            .on('mouseout', (d,i,n) => {
                tip.hide();
                handleMouseOut(d,i,n)
            });

        
    })
    })
    })
    })
})


function data_massage(top_states, states_dict, data){

    for(var i =0;i<states.length;i++){
        for(var j = 0; j<data.length;j++){
            if(data[j]['States'] == states[i]){
                //console.log(data[j])
                Object.keys(data[j]).forEach(function(el){
                    
                    if(el!='States'){
                        //console.log(el)
                        data[j][el] = parseInt(data[j][el])
                    }
                  })
                top_states.push(data[j])
            }
        }
    }

    //console.log(top_states)

    
    for(var i =0; i<top_states.length;i++){
        states_dict[top_states[i]['States']] = top_states[i]
    }
}


function making_lines_texts(top_states){

    for(var i = 0;i<Object.keys(top_states[0]).length;i++){
        if(Object.keys(top_states[0])[i] != 'States' && Object.keys(top_states[0])[i] != 'Total'){
            text_group.append('text')
                    .attr('class', 'language_text')
                    .attr('x', (i+2)*50)
                    .attr('y', 200)
                    .attr('text-anchor', 'middle')
                    .style("font-size", font_size)
                    .attr('fill', font_color)
                    .text(Object.keys(top_states[0])[i])
                    .attr('transform',`rotate(-20,${(i+2)*50},200)`)

            line_group.append('path')
                      .attr('class', 'v_lines')
                      .attr('fill', 'none')
                      .attr('stroke', line_color)
                      .attr('stroke-width', line_width)
                      .attr('d', function(){
                          var mypath = 'M'+ (i+2)*50 + ',210 V1600'
                          //console.log(mypath)
                          return mypath
                      })

            




            
        }
    }

        
    for(var i = 0; i< top_states.length; i++){
        text_group.append('text')
                    .attr('class', 'state_text')
                    .attr('x', 50)
                    .attr('y', (i*100)+300)
                    .attr('text-anchor', 'middle')
                    .attr('fill', font_color)
                    .style("font-size", font_size)
                    .text(top_states[i]['States'])
                    //.attr('transform',`rotate(-20,50,${(i*100)+300})`)

        line_group.append('path')
                    .attr('class', 'h_lines')
                    .attr('fill', 'none')
                    .attr('stroke', line_color)
                    .attr('stroke-width', line_width)
                    .attr('d', function(){
                        var mypath = 'M100,' + ((i*100)+300) +' h1300'
                        //console.log(mypath)
                        return mypath
                    })
    }

}


function making_circles(top_states, keys_arr){

    for(var i =0; i<top_states.length;i++){
        for(var j =0;j< keys_arr.length;j++){
            
            //console.log(top_states[i][keys_arr[j]])

            circle_group.append('circle')
                        .attr('class', 'circs')
                        .attr('fill', circle_color)
                        //.attr('stroke', "black")
                        //.attr('stroke-width', 1)
                        .attr('opacity', 0.5)
                        .attr('cx', ((j+2)*50)+50)
                        //.attr('cy', 200 + (i+1)*100)
                        .attr('cy', 300 + (i*100))
                        .attr('r', function(){
                            var rad;
                            if(top_states[i][keys_arr[j]]>0){
                        
                                rad = circ_scale(top_states[i][keys_arr[j]])
                            
                            }
                            else{
                        
                                rad = 0
                            }
                            return rad
                        })
                        .attr('id', top_states[i][keys_arr[j]] )
        }


    }

}

const handleMouseOver = (d,i,n) => {
    //console.log(n[i])
    d3.select(n[i])
        .transition().duration(300)
        .attr('stroke', "#F4D03F")
        .attr('stroke-width', 5)
}


const handleMouseOut = (d,i,n) => {
    d3.select(n[i])
    .transition().duration(300)
    .attr('stroke', "none")
    .attr('stroke-width', "none")
}