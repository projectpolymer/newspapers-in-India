var width = 1200;
var height = 3950;
var svg_dns = d3.select("#density_viz").append("svg").attr('height', height).attr('width', width).attr('class', 'svg_dns');

var pop_circ = [];
var sample_population = 10000;
var min_pop, max_pop;

//reading data from csvs
d3.csv("data_density/state_v_language_17_18.csv", function(circ_data)
{
    d3.csv("data_density/statewise_population.csv", function(pop_data)
    {
        d3.csv("data_density/state_v_type.csv", function(state_type)
        {
            data_collection(circ_data,pop_data, state_type);
            population_data(pop_data);
            var parent_group_dns = svg_dns.append('g').attr('class', 'parent_group_dns');
            var radius = 120; //original 150
            var states = 0;
            plotting(parent_group_dns, radius, states, min_pop, max_pop);
            //legend(parent_group_dns, radius, states, min_pop, max_pop);

            d3.select("#download").on("click", function() {
                d3.select(this)
                .attr("href", 'data:application/octet-stream;base64,' + btoa(d3.select("#density_viz").html()))
                .attr("download", "viz.svg") 
            })



        })
    })
})


//data massaging
function data_collection(circ_data,pop_data, state_type){
    for(var i =0;i<circ_data.length;i++)
    {
        for(var j = 0;j<pop_data.length;j++)
        {
            if(pop_data[j]['state'] == circ_data[i]['States'])
            {

                normalized_circ = parseInt(circ_data[i]['Total'])/parseInt(pop_data[j]['population_19'])*sample_population;
    
                pop_circ.push({'state': pop_data[j]['state'],
                'circulation': parseInt(circ_data[i]['Total']), 
                'population': parseInt(pop_data[j]['population_19']),
                'normalized_circ': Math.round(normalized_circ),
                'dailies': Math.round(parseInt(state_type[j]['Daily'])*Math.round(normalized_circ)/parseInt(circ_data[i]['Total'])),
                'fortnightly': Math.round(parseInt(state_type[j]['Fortnightly'])*Math.round(normalized_circ)/parseInt(circ_data[i]['Total'])),
                'monthly': Math.round(parseInt(state_type[j]['Monthly'])*Math.round(normalized_circ)/parseInt(circ_data[i]['Total'])),
                'others': Math.round(parseInt(state_type[j]['Others'])*Math.round(normalized_circ)/parseInt(circ_data[i]['Total'])),
                'quarterly': Math.round(parseInt(state_type[j]['Quarterly'])*Math.round(normalized_circ)/parseInt(circ_data[i]['Total'])),
                'weekly': Math.round(parseInt(state_type[j]['Weekly'])*Math.round(normalized_circ)/parseInt(circ_data[i]['Total'])),
                })
            }
            else
            {
                //console.log("state in poulation is "+pop_data[i]['state'])
                //console.log("state in circ is "+circ_data[i]['States'])
            }
        }
        
    }
}


//plotting density diagrams
function plotting(parent_group_dns, radius, states, min_pop, max_pop){
    var lin_scale = d3.scaleLinear().domain([state_pop[min_pop], state_pop[max_pop]]).range([10,200]);
    console.log(state_pop[min_pop]);
    console.log(state_pop[max_pop]);
    console.log(state_pop);
    console.log(pop_circ);

    const pie = d3.pie()
                  .sort(null)
                  .value(d => lin_scale(d.population));

    const arcPath = d3.arc()
                      .outerRadius(radius + 12)
                      .innerRadius(radius + 4);


    var categories = ['dailies', 'fortnightly','monthly','others','quarterly','weekly'];
    for(var i =150;i<=3650;i=i+350)
    {
        for(var j =150;j<=850; j=j+350)
        {
            var cx = j;
            var cy = i;
            var count = pop_circ[states]['normalized_circ'];
            var dailies = pop_circ[states]['dailies'];
            var fortnightly = pop_circ[states]['fortnightly'];
            var monthly = pop_circ[states]['monthly'];
            var others = pop_circ[states]['others'];
            var quarterly = pop_circ[states]['quarterly'];
            var weekly = pop_circ[states]['weekly'];

            /* parent_group_dns.append('circle')
                            .attr('class', 'tot_pop_circles')
                            .attr('cx', radius * Math.cos(2.25*Math.PI) + cx)
                            .attr('cy', radius * Math.sin(2.25*Math.PI) + cy)
                            .attr('r', lin_scale(pop_circ[states]['population']))
                            .attr('fill', '#EC7063')
                            .attr('opacity', 0.7)
                            .attr('stroke', '#CB4335')
                            .attr('stroke-width', '2px'); */

            var angles = pie([
                                pop_circ[states],
                                {'offset': 'placeholder', 'population': 250000000 - pop_circ[states]['population']}
                            ]);


            var classname = pop_circ[states]['state'].split(" ").join("");
            classname = classname.replace('&', '');

            parent_group_dns.append('path')
                            .attr('class', classname)
                            .attr('d', arcPath(angles[0]))
                            .attr('fill', '#EC7063')
                            .attr('opacity', 0.7)
                            .attr('stroke', '#CB4335')
                            .attr('stroke-width', '2px');

            parent_group_dns.select('.'+classname).attr('transform', `translate(${cx},${cy})`);


            parent_group_dns.append('circle')
                            .attr('class', 'norm_pop_circles')
                            .attr('cx', cx)
                            .attr('cy', cy)
                            .attr('r', radius)
                            .attr('fill', '#151C22');
                            

            parent_group_dns.append('text')
                            .attr('x', cx)
                            .attr('y', cy+155) //original 175
                            .text(function(){
                                var comma_count = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                return pop_circ[states]['state'] + ", " + comma_count;
                            })
                            .attr('class', 'state_names')
                            .style("font-size", '18px')
                            .attr('text-anchor', 'middle')
                            .attr('fill', '#00000');

            while(count)
            {
                var randAngle = Math.random()*Math.PI*2;
                var randRadius = Math.sqrt( ~~(Math.random()*(radius-1)*(radius-1)));
                var randX = cx + randRadius * Math.cos(randAngle);
                var randY = cy + randRadius * Math.sin(randAngle);

                parent_group_dns.append('rect')
                                .attr('x', randX)
                                .attr('y', randY)
                                .attr('class', function(){
                                    var mystr = pop_circ[states]['state'].split(" ").join("");
                                    mystr = mystr.replace('&', '');
                                    mystr = mystr + '_' + count;
                                    return mystr;
                                })
                                .attr('width', 1) //original 1.5 
                                .attr('height', 1) //original 1.5
                                .attr('fill', 'white');
        
                count--;

            }
            states++;

        }
    }
}


function population_data(pop_data){
    state_pop = {}
    for(var i =0;i<pop_data.length;i++){
        state_pop[pop_data[i]['state']] = parseInt(pop_data[i]['population_19'])

    }

    
    max_pop = Object.keys(state_pop).reduce((a,b) => state_pop[a] > state_pop[b] ? a:b);
    min_pop = Object.keys(state_pop).reduce((a,b) => state_pop[a] < state_pop[b] ? a:b);

}


function legend(parent_group_dns, radius, states, min_pop, max_pop){

    var svg_lgnd = d3.select("#legend_viz").append("svg").attr('height', 500).attr('width', 500).attr('class', 'svg_lgnd');
    var parent_group_lgnd = svg_lgnd.append('g').attr('class', 'parent_group_lgnd');

    const pie = d3.pie()
                  .sort(null)
                  .value(d => lin_scale(d.population));

    const arcPath = d3.arc()
                      .outerRadius(radius + 12)
                      .innerRadius(radius + 4);

    var lin_scale = d3.scaleLinear().domain([state_pop[min_pop], state_pop[max_pop]]).range([10,200]);

    var angles = pie([
                        {'offset': 'placeholder', 'population': 25000000},
                        {'offset': 'placeholder', 'population': 25000000},
                        {'offset': 'placeholder', 'population': 25000000},
                        {'offset': 'placeholder', 'population': 25000000},
                        {'offset': 'placeholder', 'population': 25000000},
                        {'offset': 'placeholder', 'population': 25000000},
                        {'offset': 'placeholder', 'population': 25000000},
                        {'offset': 'placeholder', 'population': 25000000},
                        {'offset': 'placeholder', 'population': 25000000},
                        {'offset': 'placeholder', 'population': 25000000}
                    ]);

    

    for(var i = 0; i<10;i++){
        parent_group_lgnd.append('path')
                    .attr('class', 'legend')
                    .attr('d', arcPath(angles[i]))
                    .attr('fill', '#EC7063')
                    .attr('opacity', 0.7)
                    .attr('stroke', '#CB4335')
                    .attr('stroke-width', '2px')
                    .attr('transform', `translate(250,250)`);

    }

    parent_group_lgnd.append('circle')
                            .attr('class', 'norm_pop_circles')
                            .attr('cx', 250)
                            .attr('cy', 250)
                            .attr('r', radius)
                            .attr('fill', '#151C22');

}