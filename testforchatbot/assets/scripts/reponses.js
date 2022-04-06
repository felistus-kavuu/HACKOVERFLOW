function getBotResponse(input) {
    
    // Simple responses
    if (input == "hello" || input =="Hello"||input=="hi"||input=="Hi") {
        return "Hello there!";
    } else if (input == "goodbye" ) {
        return "Talk to you later!";
    }

    // questions related to climate change
    if(input == "What is Climate Change?" || input=="what is climate change?" || input == "what is climate change"||input=="What is Climate Change"){
        return "Climate Change";
    }

    // question related to solution
    if(input=="How do I help?"||input=="How do I help" || input=="how do I help" || input=="how do i help"){
        return "You can help by using our app that reduces the carbon particles that aggravates climate change."
    }
        else{
            return "Please ask climate related question or app-related questions!"
        }
}