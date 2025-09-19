// The minimum prediction confidence (0 = not sure, 1 = very sure)
const threshold = 0.75;
let model;
let modelLoading = true; // A flag to track if the model is still loading

// Step 1: Load the model when the page starts
console.log("Starting to load model...");
toxicity.load(threshold)
  .then(loadedModel => {
    model = loadedModel;
    modelLoading = false; // Model is now loaded
    console.log('✅ AI Model Loaded and Ready!');
    // Update the UI to show it's ready
    document.getElementById('result').innerText = "Model is ready! Type something.";
  })
  .catch(error => {
    // This will catch any errors during loading
    console.error("❌ Error loading model:", error);
    document.getElementById('result').innerText = "Failed to load model. Check console.";
    modelLoading = false;
  });

// Step 2: This function is called when the "Analyze" button is clicked
async function analyzeSentiment() {
  // Get the text from the input box
  const text = document.getElementById('userInput').value;
  const resultElement = document.getElementById('result');

  // Check if the model is still loading
  if (modelLoading) {
    resultElement.innerText = "⏳ Model is still loading, please wait...";
    return;
  }
  if (!text) {
    resultElement.innerText = "Please type something first!";
    return;
  }

  console.log("Analyzing text: ", text);
  resultElement.innerText = "🤔 Thinking...";

  try {
    // Step 3: Make a prediction!
    console.time("ClassificationTime"); // Start a timer
    const predictions = await model.classify(text);
    console.timeEnd("ClassificationTime"); // End the timer and log how long it took
    console.log("Predictions: ", predictions);

    // Step 4: Interpret the results
    const insultPrediction = predictions.find(p => p.label === 'insult');
    const complimentPrediction = predictions.find(p => p.label === 'compliment');

    // Check if predictions were found for these labels
    if (!insultPrediction || !complimentPrediction) {
      resultElement.innerHTML = "😶 Could not analyze sentiment.";
      return;
    }

    const isInsult = insultPrediction.results[0].match;
    const isCompliment = complimentPrediction.results[0].match;

    if (isCompliment) {
      resultElement.innerHTML = "✅ <strong>Positive!</strong> That sounds like a compliment!";
    } else if (isInsult) {
      resultElement.innerHTML = "❌ <strong>Negative!</strong> That sounds a bit insulting.";
    } else {
      resultElement.innerHTML = "😐 <strong>Neutral.</strong> I can't tell if that's positive or negative.";
    }
  } catch (error) {
    // This will catch any errors during classification
    console.error("❌ Error during classification:", error);
    resultElement.innerText = "An error occurred. Check the console.";
  }
}