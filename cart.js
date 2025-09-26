const fruits = ['apple' , 'grapes' , 'mango' , 'orange'];


//select the output div

const outputDiv = document.getElementById('output');

//use forEach to loop through items
fruits.forEach(function(fruit, index){
	const ol = document.createElement('ol');
	ol.textContent = `${index + 1}. ${fruit}`;
	outputDiv.appendChild(ol);
});
