var ctx1 = document.getElementById("myChart1");
var ctx2 = document.getElementById("myChart2");
var ctx3 = document.getElementById("chartpie");
var ctx4 = document.getElementById("linechart");


var males = ctx1.dataset.malenum;
var females = ctx1.dataset.femalenum;

var lu = ctx2.dataset.lu;
var nonlu = ctx2.dataset.nonlu;

var waiting = ctx3.dataset.waiting;
var validated = ctx3.dataset.validated;

var result= ctx4.dataset.data;

var data = JSON.parse(result);


new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: [ "female", "male" ],

        datasets: [{
            label:["Gender"],
            data:[ females ,  males  ],
            backgroundColor: [
            '#e67e22',
            '#16a085'
            ],
            borderColor: [
                '#e67e22',
                '#16a085'
            ],
        }],
        
        
     },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    
});

new Chart(ctx2, {
    type: 'doughnut',
    data:  {
        labels: [ "lu", "non-lu" ],
        datasets: [{
 
            data:[ lu, nonlu  ],
            backgroundColor: [
                '#2980b9',
                '#8e44ad',
            ],
            borderColor: [
                '#2980b9',
                '#8e44ad',
            ],
           
        }]},
    
})

new Chart(ctx3, {
    type: 'pie',
    data: {
        labels: [ "Paid Orders Not Shipped", "Paid Orders Shipped" ],
        datasets: [{
 
            data:[ waiting, validated  ],
            backgroundColor: [
                '#273c75',
                '#27ae60',
            ],
            borderColor: [
                '#273c75',
                '#27ae60',
            ],
        }]},
 
});
var allMonth= []
var CA=[]
var years=[]
for(let i= 0; i<data.length; i++){
    var date = new Date((data[i]._id.year),(data[i]._id.month-1), 1);
    var month= date.toLocaleString('default', {month:'long'})
    years.push(data[i]._id.year)
    allMonth.push(month)
    CA.push(data[i]._id.CA)
}
new Chart(ctx4, {
    type: 'line',
    data: {
        labels: allMonth,
        datasets: [{
            
           label:`Chiffre d'affaire`,
            data:CA,
            backgroundColor: [
                '#273c75',
                
            ],
           
        }]},

     options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                
                
            }
        }
        
   
});