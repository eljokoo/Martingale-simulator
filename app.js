let button = document.getElementById('sim');

// Define action on pressing simulate
button.addEventListener('click', () => {
   // Read simulation values
   let capital = parseInt(document.getElementById('capital').value);
   let tries = parseInt(document.getElementById('tries').value);
   let bet = parseInt(document.getElementById('bet').value); 
   let people = parseInt(document.getElementById('persons').value)

   // Check if values are empty
   if(isNaN(capital) || isNaN(tries) || isNaN(bet) || isNaN(people))
      alert('Enter values into the fields first!');
   else
      // If not, proceed with rendering the chart with given values
      renderChart(martingaleCom(capital, tries, bet, people));
});

// Function to compute the Martingale Simulation for all attempts
function martingaleCom(capital, tries, bet, people) {
   let valueArray = [];
   
   for(let i = 0; i < people; i++) {
      let tempCapital = capital;
      
      // Array to store the points at a certain attempt - start at attempt
      // 0 with initial capital
      let tempArray = [
         {
            x: 0,
            y: tempCapital
         },
      ];
      let bet_val = bet;
   
      // Go through each attempt and calculate tempArray
      for(let j = 0; j < tries; j++) {
         // Check if bet is successful (18/37) chance
         if (Math.random() <= 0.5135) {
            // If bet is unsuccessful, subtract bet value and set new one
            tempCapital = tempCapital - bet_val;
            
            if (bet_val * 2 > 500) {
               // 500 is the casino bet limit, reset to initial bet
               bet_val = bet;
            } else {
               // Double bet if under limit
               bet_val = bet_val * 2;
            }
         } else {
            // If bet is successful, add value to capital and reset to initial bet
            tempCapital = tempCapital + bet_val;
            bet_val = bet;
         }
   
         // Add attempt to tempArray
         tempArray.push({
            x: j + 1,
            y: tempCapital
         });
      }

      // Create results entry for better in simulation array
      valueArray.push({
         name: `Better ${i + 1}`,
         points: tempArray
      });
   }
   
   // Return simulation values array
   return valueArray;
}

// Function to render the chart based on simulation array
function renderChart(series) {
	JSC.Chart('chartDiv', {
		title_label_text: 'Martingale Simulation',
		annotations: [{

      }],
      xAxis: { 
         formatString: 'n1', 
         scale_zoomLimit: 1 
      }, 
      annotations: [ 
         { 
            position: 'inside top', 
            margin: 5, 
            label_text: 
               'Click-Drag the chart area to zoom.'
         } 
      ], 
      debug: true,
      legend_visible: false,
      axisToZoom: 'xy', 
      yAxis_scale_zoomLimit: 1000, 
		xAxis_crosshair_enabled: true,
		defaultSeries_firstPoint_label_text: '<b>%seriesName</b>',
		defaultPoint_tooltip: '%seriesName <b>%yValue</b>$',
      series: series,
      yAxis: [ 
         { id: 'mainY', formatString: 'c' }, 
         { 
           id: 'secondY', 
           scale_syncWith: 'mainY', 
           orientation: 'opposite', 
           line_color: '#e2e2e2', 
           defaultTick: { 
             enabled: false, 
             gridLine_visible: false
           } 
         } 
       ], 
       xAxis: { 
         crosshair_enabled: true
       }, 
       defaultSeries: { 
         type: 'line', 
         defaultPoint_marker_visible: false, 
         lastPoint: { 
           label_text: '<b>%seriesName</b>', 
           yAxisTick: { 
             axisId: 'secondY', 
             label_text: '%yValue'
           } 
         } 
       }, 
	});
}