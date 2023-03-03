const loadTools = async () => {
    const URL = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(URL);
    const data = await res.json();
    displayTools(data.data.tools)
    
}

const displayTools = (tools) => {
    toggleSpinner(true)
    const toolsContainer = document.getElementById('tools-container')
    // if(tools.length> 6){
    //     tools = tools.slice(0, 6)
    // }

    tools.forEach(tool => {
        // console.log(tool)
        toolsContainer.innerHTML += `
        <div class="col">
        <div class="card h-100 p-2 shadow border-0">
            <img src="${tool.image}" class="card-img-top img-fluid img-thumbnail h-50" alt="">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol class="list-group p-3">${tool.features.map(list => `<li>${list}</li>`).join('')}</ol>
                <hr>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">${tool.name}</h5>
                        <div class="d-flex gap-2  align-items-center">
                            <i class="fa-solid fa-calendar-days"></i>
                            <p class="card-text">${tool.published_in}</p>
                        </div>
                    </div>
                    <div onclick ="loadToolsDetails('${tool.id}')" style="width: 50px;" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-circle-arrow-right"></i></div>
                </div>
            </div>
        </div>
    </div>
        `
    });

    toggleSpinner(false)
}


const toggleSpinner = isLoading => {
    const spinnerSec = document.getElementById('spinner');
    if (isLoading) {
        spinnerSec.classList.add('d-none')
    }
}


const loadToolsDetails = async (id) => {
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(URL);
    const data = await res.json();
    displayToolsDetails(data.data)
}


const displayToolsDetails = (tool) => {
    console.log(tool)
    const featuresValues = Object.values(tool.features)
    let featuresArray = []
    for(const featuresValue of featuresValues){
        featuresArray.push(featuresValue.feature_name)
    }
    const oli = '% Accuracy';
    const {description, pricing, image_link, input_output_examples, accuracy, integrations} = tool
    const toolsModalBody = document.getElementById('tools-motal-body');
    toolsModalBody.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col">
        <div class="card h-100 bg-dark bg-gradient bg-opacity-10">
            <div class="card-body p-3">
                <h5 class="card-title">${description? description : 'HEllo bro'}</h5>
                <div class="d-flex justify-content-center align-items-center gap-2 fw-semibold text-center">
                    <div class="bg-light rounded text-success"><span>${pricing? pricing[0].price : 'Free of Cost'} <br> ${pricing? pricing[0].plan : 'Basic'}</span></div>
                    <div class="bg-light rounded text-warning"><span>${pricing? pricing[1].price : 'Free of Cost'} <br> ${pricing? pricing[1].plan : 'Pro'}</span></div>
                    <div class="bg-light rounded text-danger"><span>${pricing? pricing[2].price : 'Free of Cost'} <br> ${pricing? pricing[2].plan : 'Enterprise'}</span></div>
                </div>

                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="card-title">Features</h5>
                        <ul>${featuresArray.map(list => `<li>${list}</li>`).join('')}</ul>

                    </div>
                    <div>
                        <h5 class="card-title">Integrations</h5>
                        <ul>${integrations? integrations.map(list => `<li>${list}</li>`).join('') : 'No data Found'}</ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card h-100 text-center">
            <div class="text-end"><span class="badge text-bg-danger w-30 p-2">${accuracy.score? accuracy.score * 100+oli  : ''}</span>
            <img src="${image_link[0]}" class="card-img-top" alt="..."></div>
            <div class="card-body">
                <h5 class="card-title">${input_output_examples? input_output_examples[0].input : 'Can you give any example?'}</h5>
                <p class="card-text">${input_output_examples? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
            </div>
        </div>
    </div>
</div>
    `
}

loadTools()