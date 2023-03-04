// Fetch data from API
const loadTools = async (dataLimit) => {
    const URL = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(URL);
    const data = await res.json();
    displayTools(data.data.tools, dataLimit)
}

// Fetch data for Sort by Date Funtion
const sortByDate = async (dataLimit) => {
    const URL = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(URL);
    const data = await res.json();
    const sortData = data.data.tools.sort(function (a, b) {
        return new Date(a.published_in) - new Date(b.published_in)
    });
    displayTools(sortData, dataLimit)
}

// Process Load for Show More Button
const processLoad = (dataLimit = 6) => {
    loadTools(dataLimit)
    sortByDate(dataLimit)
}

// Display AI Universe cards Function
const displayTools = (tools, dataLimit) => {

    toggleSpinner(true)
    const showMoreContainer = document.getElementById('show-more')
    if (dataLimit !== 6 && tools.length > 6) {
        tools = tools.slice(0, 6)
        showMoreContainer.classList.remove('d-none')
    }
    else {
        showMoreContainer.classList.add('d-none')
    }

    const toolsContainer = document.getElementById('tools-container')
    toolsContainer.innerHTML = '';
    tools.forEach(tool => {
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

// Toggle Spinner Function
const toggleSpinner = isLoading => {
    const spinnerSec = document.getElementById('spinner');
    if (isLoading) {
        spinnerSec.classList.add('d-none')
    }
}

// Get Show More button by Id
document.getElementById('show-more-btn').addEventListener('click', function () {
    processLoad()
})

// Fetch Tools Details for Modal
const loadToolsDetails = async (id) => {
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(URL);
    const data = await res.json();
    displayToolsDetails(data.data)
}

// Display Modal Function
const displayToolsDetails = (tool) => {

    const featuresValues = Object.values(tool.features)
    let featuresArray = []
    for (const featuresValue of featuresValues) {
        featuresArray.push(featuresValue.feature_name)
    }

    const accuracyFixer = '% Accuracy';
    const { description, pricing, image_link, input_output_examples, accuracy, integrations } = tool;
    const toolsModalBody = document.getElementById('tools-motal-body');
    toolsModalBody.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col">
        <div class="card bg-info border-0 shadow-lg bg-opacity-25 h-100">
            <div class="card-body p-3">
                <h5 class="card-title">${description ? description : 'HEllo bro'}</h5>
                <div class="d-flex justify-content-around gap-2 fw-semibold text-center my-5">
                    <div class="bg-light rounded p-lg-2"><span class="text-success">${pricing ? pricing[0].price : 'Free of Cost'} <br> ${pricing ? pricing[0].plan : 'Basic'}</span></div>
                    <div class="bg-light rounded p-lg-2"><span class="text-warning">${pricing ? pricing[1].price : 'Free of Cost'} <br> ${pricing ? pricing[1].plan : 'Pro'}</span></div>
                    <div class="bg-light rounded p-lg-2"><span class="text-danger">${pricing ? pricing[2].price : 'Free of Cost'} <br> ${pricing ? pricing[2].plan : 'Enterprise'}</span></div>
                </div>

                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="card-title">Features</h5>
                        <ul>${featuresArray.map(list => `<li>${list}</li>`).join('')}</ul>
                    </div>
                    <div>
                        <h5 class="card-title">Integrations</h5>
                        <ul>${integrations ? integrations.map(list => `<li>${list}</li>`).join('') : 'No data Found'}</ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card text-center shadow-lg border-0 ">
            <div><span class="badge text-bg-danger w-30 p-2 position-absolute end-0">${accuracy.score ? accuracy.score * 100 + accuracyFixer : ''}</span>
            <img src="${image_link[0]}" class="card-img-top" alt=""></div>
            <div class="card-body my-5">
                <h5 class="card-title">${input_output_examples ? input_output_examples[0].input : 'Can you give any example?'}</h5>
                <p class="card-text">${input_output_examples ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
            </div>
        </div>
    </div>
</div>
    `
};