let button = document.getElementById('sim');

button.addEventListener('click', () => {
   let capital = parseInt(document.getElementById('capital').value);
   let tries = parseInt(document.getElementById('tries').value);
   let bet = parseInt(document.getElementById('bet').value); 
   let people = parseInt(document.getElementById('persons').value)

   if(isNaN(capital) || isNaN(tries) || isNaN(bet) || isNaN(people))
      alert('Enter values into the fields first!');
   else
      console.log(martingaleCom(capital, tries, bet, people));
      renderChart(martingaleCom(capital, tries, bet, people));
});

function martingaleCom(capital, tries, bet, people) {
   let valueArray = [];
   for(let i = 0; i < people; i++) {
      let tempCapital = capital;
      let tempArray = [
         {
            x: 0,
            y: tempCapital
         },
      ];
      let bet_val = bet;
   
      for(let j = 0; j < tries; j++) {
         if (Math.random() <= 0.5135) {
            tempCapital = tempCapital - bet_val;
            bet_val = bet_val * 2;
            if (bet_val * 2 > 300) {
               bet_val = bet;
            }
         } else {
            tempCapital = tempCapital + bet_val;
            bet_val = bet;
         }
   
         tempArray.push({
            x: j + 1,
            y: tempCapital
         });
      }

      valueArray.push({
         name: `Better ${i + 1}`,
         points: tempArray
      });
   }
   

   return valueArray;
}

function renderChart(series) {
	JSC.Chart('chartDiv', {
		title_label_text: 'Martingale Simulation',
		annotations: [{
			// label_text: 'Source: National Center for Health Statistics',
			// position: 'bottom left'
      }],
      /*X Axis Time Zoom limit*/
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
      // yAxis: {
      //    scale: {
      //       range: [0, 2000000000]
      //    }
      // }
	});
}