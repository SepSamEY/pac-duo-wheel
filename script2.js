// JavaScript Document
const wheel2 = document.getElementById("right-wheel");
const spinBtn2 = document.getElementById("spin-btn");
const finalValue2 = document.getElementById("final-value2");
//Object that stores values of minimum and maximum angle for a value
const rotationValues2 = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 150, value: 6 },
  { minDegree: 151, maxDegree: 210, value: 5 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
  { minDegree: 331, maxDegree: 360, value: 2 },
];
//Size of each piece
const data2 = [16, 16, 16, 16, 16, 16];
//background color for each piece
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];
//Create chart
let myChart2 = new Chart(wheel2, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [1, 2, 3, 4, 5, 6],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data2,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator2 = (angleValue) => {
  for (let i of rotationValues2) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
		if (i.value == 1) document.getElementById("image6").style.display = "block";
		else if (i.value == 2)document.getElementById("image7").style.display = "block";
		else if (i.value == 3)document.getElementById("image8").style.display = "block";
		else if (i.value == 4)document.getElementById("image9").style.display = "block";
		else if (i.value == 5)document.getElementById("image10").style.display = "block";
		else if (i.value == 6)document.getElementById("imageR2").style.display = "block";
		spinBtn2.disabled = false;
		break;
    }
  }
};

//Spinner count
let count2 = 0;
//100 rotations for animation and last rotation for result
let resultValue2 = 101;
//Start spinning
spinBtn2.addEventListener("click", () => {
  spinBtn2.disabled = true;
  //Empty final value
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 34) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart2.options.rotation = myChart2.options.rotation + resultValue2;
    //Update chart with new value;
    myChart2.update();
    //If rotation>360 reset it back to 0
    if (myChart2.options.rotation >= 360) {
      count2 += 1;
      resultValue2 -= 5;
      myChart2.options.rotation = 0;
    } else if (count2 > 15 && myChart2.options.rotation == randomDegree) {
      valueGenerator2(randomDegree);
      clearInterval(rotationInterval);
      count2 = 0;
      resultValue2 = 101;
    }
  }, 10);
});